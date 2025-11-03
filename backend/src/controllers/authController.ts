import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/models/User';
import { createError } from '@/middleware/errorHandler';
import { logger } from '@/utils/logger';

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

interface AuthResponse {
  success: boolean;
  data: {
    user: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      role: string;
      email_verified: boolean;
      subscription_tier: string;
    };
    tokens: {
      access_token: string;
      refresh_token: string;
    };
  };
}

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

// Generate JWT tokens
function generateTokens(userId: string) {
  const access_token = jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  const refresh_token = jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES_IN }
  );

  return { access_token, refresh_token };
}

// Hash password
async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Verify password
async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Register new user
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, first_name, last_name }: RegisterRequest = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw createError('User with this email already exists', 409);
    }

    // Hash password
    const password_hash = await hashPassword(password);

    // Create user
    const user = await User.create({
      email,
      password_hash,
      first_name,
      last_name,
      email_verified: false,
      role: 'founder',
      subscription_tier: 'basic',
    });

    // Generate tokens
    const tokens = generateTokens(user.id);

    logger.info('User registered successfully', { userId: user.id, email });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          email_verified: user.email_verified,
          subscription_tier: user.subscription_tier,
        },
        tokens,
      },
    } as AuthResponse);
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Registration error:', error);
      throw error;
    }
    throw createError('Registration failed', 500);
  }
}

// Login user
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password }: LoginRequest = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user || !user.password_hash) {
      throw createError('Invalid email or password', 401);
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password_hash);
    if (!isPasswordValid) {
      throw createError('Invalid email or password', 401);
    }

    // Generate tokens
    const tokens = generateTokens(user.id);

    logger.info('User logged in successfully', { userId: user.id, email });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          email_verified: user.email_verified,
          subscription_tier: user.subscription_tier,
        },
        tokens,
      },
    } as AuthResponse);
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Login error:', error);
      throw error;
    }
    throw createError('Login failed', 500);
  }
}

// Refresh access token
export async function refresh(req: Request, res: Response): Promise<void> {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      throw createError('Refresh token is required', 400);
    }

    // Verify refresh token
    const decoded = jwt.verify(refresh_token, JWT_SECRET) as { userId: string };
    const userId = decoded.userId;

    // Find user
    const user = await User.findByPk(userId);
    if (!user) {
      throw createError('User not found', 404);
    }

    // Generate new tokens
    const tokens = generateTokens(user.id);

    res.json({
      success: true,
      data: { tokens },
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw createError('Invalid refresh token', 401);
    }
    throw error;
  }
}

// Get current user info
export async function getCurrentUser(req: Request, res: Response): Promise<void> {
  try {
    // userId should be attached by auth middleware
    const userId = (req as any).userId;

    if (!userId) {
      throw createError('User not authenticated', 401);
    }

    const user = await User.findByPk(userId);
    if (!user) {
      throw createError('User not found', 404);
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        email_verified: user.email_verified,
        subscription_tier: user.subscription_tier,
        preferences: user.preferences,
      },
    });
  } catch (error) {
    throw error;
  }
}

// Logout user
export async function logout(req: Request, res: Response): Promise<void> {
  try {
    // In a production environment, you would add the token to a blacklist
    // For now, we just return success since JWT is stateless
    res.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    throw error;
  }
}

// Forgot password
export async function forgotPassword(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Don't reveal that user doesn't exist
      res.json({
        success: true,
        message: 'If an account with this email exists, a password reset link has been sent.',
      });
      return;
    }

    // In a production environment, you would:
    // 1. Generate a password reset token
    // 2. Send email with reset link
    // 3. Store token with expiration

    logger.info('Password reset requested', { userId: user.id, email });

    res.json({
      success: true,
      message: 'If an account with this email exists, a password reset link has been sent.',
    });
  } catch (error) {
    throw error;
  }
}