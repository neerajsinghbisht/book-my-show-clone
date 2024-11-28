// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); // Used for redirecting

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('https://localhost:51063/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
               
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            if (data.token) {
                // Store the token in localStorage or context
                localStorage.setItem('token', data.token);
                navigate('/dashboard'); // Redirect to the Dashboard page
            } else {
                setMessage('Invalid credentials, please try again.');
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <input
                        type="text" // Username input type
                        name="username" // Username field
                        placeholder="Username" // Username placeholder
                        value={formData.username} // Bind to username
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    </div>
                    <div className="mb-6">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                  

                </form>


                {message && (
                    <div
                        className={`mt-4 text-center p-3 rounded-md ${
                            message.includes('Invalid') ? 'bg-red-200 text-red-700' : 'bg-green-200 text-green-700'
                        }`}
                    >
                        {message}
                    </div>
                    
                )}
                 <button
                    onClick={() => navigate('/register')}
                    className="w-full mt-4 py-3 bg-gray-200 text-blue-600 rounded-md hover:bg-gray-300"
                >
                    New User? Register Here
                </button>
                
            </div>
        </div>
    );
};

export default Login;
