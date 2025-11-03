import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@/config/database';

interface UserAttributes {
  id: string;
  email: string;
  password_hash?: string;
  first_name: string;
  last_name: string;
  role: string;
  email_verified: boolean;
  two_factor_enabled: boolean;
  two_factor_secret?: string;
  preferences: Record<string, any>;
  subscription_tier: string;
  created_at: Date;
  updated_at: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created_at' | 'updated_at'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password_hash?: string;
  public first_name!: string;
  public last_name!: string;
  public role!: string;
  public email_verified!: boolean;
  public two_factor_enabled!: boolean;
  public two_factor_secret?: string;
  public preferences!: Record<string, any>;
  public subscription_tier!: string;
  public created_at!: Date;
  public updated_at!: Date;

  public get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password_hash: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('founder', 'admin', 'user'),
    defaultValue: 'founder',
  },
  email_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  two_factor_enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  two_factor_secret: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  preferences: {
    type: DataTypes.JSONB,
    defaultValue: {},
  },
  subscription_tier: {
    type: DataTypes.ENUM('basic', 'pro', 'enterprise'),
    defaultValue: 'basic',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  underscored: true,
});

export { User, UserAttributes, UserCreationAttributes };