import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Signup = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('Please fill out all fields');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const result = await signup(formData.username, formData.email, formData.password);
      if (!result.success) setError(result.error || 'Signup failed');
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#333399] px-4">
      <div className="bg-white flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-lg max-w-4xl w-full">
        
        {/* LEFT IMAGE */}
        <div className="md:w-1/2 w-full">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
            alt="signup"
            className="object-cover w-full h-full"
          />
        </div>

       
        <div className="md:w-1/2 w-full flex flex-col justify-center px-10 py-12">
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-orange-500 mr-2"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M224 256A128 128 0 1 0 96 128a128 128 0 0 0 128 128zM313.6 288H286c-22.2 10-46.6 16-72 16s-49.8-6-72-16h-27.6C51.1 288 0 339.1 0 403.2V432a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-28.8C448 339.1 396.9 288 313.6 288z" />
              </svg>
              <h1 className="text-5xl font-bold text-gray-900 tracking-tight">Create Account</h1>
            </div>
            <p className="text-gray-600 text-sm text-center">
              Register your new account
            </p>
          </div>

          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {error && <p className="text-red-500 text-center text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 disabled:opacity-60"
            >
              {loading ? 'Creating account...' : 'SIGN UP'}
            </button>
          </form>

          {/* FOOTER */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-700">
              Already have an account?
              <button
                onClick={onSwitchToLogin}
                className="text-link text-indigo-600 underline bg-transparent border-0 p-0 m-0"
              >
                Login here
              </button>
            </p>
            <div className="text-xs text-gray-400 mt-4">
              <a href="#!" className="hover:underline mr-1">Terms of use.</a>
              <a href="#!" className="hover:underline">Privacy policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
