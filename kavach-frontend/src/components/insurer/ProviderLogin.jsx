import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProviderLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
        console.log('Login attempt:', { email, password });
        navigate('/insurer-guide');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm mx-4">
                <h2 className="text-2xl font-bold text-[#0B3D91] mb-4 text-center">Provider Login</h2>
                <p className="text-gray-600 text-center mb-6">Access your partner dashboard</p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Bank Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    />
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-200 ease-in-out"
                    >
                        Login
                    </button>
                </form>

                <div className="text-center mt-4">
                    <a href="#" className="text-blue-600 hover:underline text-sm">Forgot Password?</a>
                </div>
                <div className="text-center mt-2 text-gray-600">
                    Want to partner with us? <a href="#" className="text-blue-600 hover:underline">Contact us to join</a>
                </div>
            </div>
        </div>
    );
}

export default ProviderLogin;

