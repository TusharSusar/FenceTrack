import React, { useState, useEffect } from 'react';
import { MapPin, Eye, EyeOff, Lock, User, ArrowRight, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import AnimatedBackground from './UI/AnimatedBackground';
import Toast from './UI/ToastNotification';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

// Main Login Component
const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username or email is required';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Demo logic - accept any credentials for demo
      if (formData.username && formData.password) {
        setToast({ message: 'Login successful! Redirecting to dashboard...', type: 'success' });
        
        // Simulate redirect after successful login
        setTimeout(() => {
          // In a real app, you would redirect to dashboard here
          console.log('Redirecting to dashboard...');
          navigate('/dashboard')
        }, 1500);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      setToast({ message: 'Invalid username or password. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      {/* Main Login Container */}
      <div className="relative z-10 w-full max-w-lg px-6">
        {/* Login Card */}
        <div className="h-[90vh] bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 transform transition-all duration-300 hover:shadow-3xl">
          
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4 transform transition-transform duration-300 hover:scale-110">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">FenceTrack</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 ${
                    errors.username 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-200 hover:border-gray-300 focus:bg-white'
                  }`}
                  placeholder="Enter your username or email"
                  autoComplete="username"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.username}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 ${
                    errors.password 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-200 hover:border-gray-300 focus:bg-white'
                  }`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 transition-colors duration-200"
                />
                <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                  Remember me
                </span>
              </label>
              
              {/* Forgot Password Link */}
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 hover:underline"
                onClick={() => setToast({ message: 'Password reset link sent to your email!', type: 'success' })}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {/* Sign Up Link - Prominently placed */}
            <div className="text-center mb-4 xl:mb-0">
              {/* <p className="text-gray-600 mb-3">
                Don't have an account?
              </p> */}
              <button 
                onClick={() => setToast({ message: 'Sign up feature coming soon!', type: 'success' })}
                className="w-full border-2 border-blue-600 text-blue-600 py-3 rounded-xl font-bold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-102 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Create New Account</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 hidden xl:flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500 bg-white">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Social Login Options */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 cursor-pointer">
              <div className="w-5 h-5 mr-3"><FcGoogle size={22}/></div>
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>
            
            <button className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 cursor-pointer">
              <div className="w-5 h-5 mr-3"><FaFacebook size={20} color='#1877F2'/></div>
              <span className="text-gray-700 font-medium">Continue with Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          {/* <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Need help? Contact our{' '}
              <button className="text-blue-600 font-semibold hover:text-blue-800 transition-colors duration-200 hover:underline">
                support team
              </button>
            </p>
          </div> */}

          {/* Security Badge */}
          {/* <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
            <Shield className="w-4 h-4 mr-1 text-green-500" />
            <span>Secured with 256-bit SSL encryption</span>
          </div> */}
        </div>

        {/* Additional Info Cards */}
        {/* <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center transform transition-all duration-300 hover:bg-white/90 hover:scale-105">
            <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm text-gray-700 font-medium">99.9% Uptime</p>
            <p className="text-xs text-gray-500">Always available</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 text-center transform transition-all duration-300 hover:bg-white/90 hover:scale-105">
            <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm text-gray-700 font-medium">Secure Login</p>
            <p className="text-xs text-gray-500">Military-grade security</p>
          </div>
        </div> */}
      </div>

      {/* Demo Credentials Helper */}
      <div className="fixed bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-xs">
        <p className="text-xs text-gray-600 mb-2">
          <strong>Demo Credentials:</strong>
        </p>
        <p className="text-xs text-gray-500">
          Username: demo@safetrack.com<br />
          Password: demo123
        </p>
      </div>
    </div>
  );
};

export default LoginPage;