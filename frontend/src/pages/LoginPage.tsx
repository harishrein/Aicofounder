import { useState } from 'react';

interface LoginPageProps {
  onLogin: (userData: any, tokens: any) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock authentication - in real implementation, this would call your API
      const mockUserData = {
        id: 'user_123',
        email: formData.email,
        first_name: formData.first_name || 'Demo',
        last_name: formData.last_name || 'User',
        role: 'founder',
        email_verified: true,
        subscription_tier: 'basic',
      };

      const mockTokens = {
        access_token: 'mock_access_token',
        refresh_token: 'mock_refresh_token',
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      onLogin(mockUserData, mockTokens);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
            AI
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            AI Co-Founder
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your autonomous business partner
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-8">
          <div className="flex mb-6 border-b border-gray-200">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-center font-medium text-sm ${
                isLogin
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-center font-medium text-sm ${
                !isLogin
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    required={!isLogin}
                    value={formData.first_name}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    required={!isLogin}
                    value={formData.last_name}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Doe"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm text-gray-600">
                Demo credentials: Any email/password combination works
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}