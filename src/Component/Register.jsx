import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom'; 

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        // Simple validation for empty fields
        if (!formData.username || !formData.email || !formData.password || !formData.firstName || !formData.lastName) {
            setMessage('All fields are required.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('https://localhost:51063/api/Auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('user already registered');
            }

            // Check if the response is OK
            const data = await response.json();
            if (response.ok) {
                setMessage('User successfully registered!');
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: ''
                });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                // If not OK, show error message from server response
                setMessage(data.message || 'Registration failed, please .');
            }
        } catch (error) {
            // Catch unexpected errors
            setMessage(error.message || 'An error occurred, please  later.');
        } finally {
            setIsLoading(false);
        }
    };
    const redirectToLogin = () => {
        navigate('/login'); // Navigate to the login page (adjust the path as needed)
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
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
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                {message && (
                    <div
                        className={`mt-4 text-center p-3 rounded-md ${
                            message.includes('successfully') ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
                        }`}
                    >
                        {message}
                    </div>
                )}
                 <div className="mt-4 text-center">
                    <button
                        onClick={redirectToLogin}
                        className="text-blue-600 hover:underline"
                    >
                        Already have an account? Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
