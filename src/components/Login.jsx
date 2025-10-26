import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Login = ({ onSwitchToSignup }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.username.trim()) {
      setError('Username is required');
      setLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    try {
      const result = await login(formData.username, formData.password);
      if (!result.success) {
        setError(result.error || 'Login failed');
      }
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
            alt="login"
            className="object-cover w-full h-full"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="md:w-1/2 w-full flex flex-col justify-center p-10">
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center justify-center mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-orange-500 mr-2"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M488 192H24c-13.25 0-24 10.75-24 24v80c0 13.25 10.75 24 24 24h464c13.25 0 24-10.75 24-24v-80c0-13.25-10.75-24-24-24zM64 296c-13.25 0-24-10.75-24-24s10.75-24 24-24 24 10.75 24 24-10.75 24-24 24z" />
              </svg>
              <h1 className="text-5xl font-bold text-gray-900">Draw Project</h1>
            </div>
            <p className="text-gray-600 text-sm">Sign into your account</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username or Email
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
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
          </form>

          {/* LINKS */}
          <div className="text-center mt-6">
            <a href="#!" className="text-sm text-gray-500 hover:underline">
              Forgot password?
            </a>
            <p className="text-sm text-gray-700 mt-4">
              Don’t have an account?{' '}
              <button
                onClick={onSwitchToSignup}
                className="text-link text-indigo-600 underline bg-transparent border-0 p-0 m-0"
                type="button"
              >
                Register here
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

export default Login;
