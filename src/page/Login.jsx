import { useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
} from '../firebase/firebase.js';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle login via email/password
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Logged in with Google!');
      navigate('/');
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="p-8 bg-white rounded-md shadow-md w-96"
      >
        <h2 className="mb-4 text-2xl font-bold text-center">Login</h2>
        {error && (
          <p className="mb-2 text-sm text-center text-red-500">{error}</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white bg-blue-500 rounded-md"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 mt-2 text-white bg-red-500 rounded-md"
          disabled={loading}
        >
          {loading ? 'Logging in with Google...' : 'Login with Google'}
        </button>
        <p className="mt-4 text-sm text-center text-gray-600">
          Not a member?
          <Link to="/register" className="text-blue-500 hover:underline">
            {' '}
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
