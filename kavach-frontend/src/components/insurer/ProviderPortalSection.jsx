import React from 'react';
import { Link } from 'react-router-dom';

function ProviderPortalSection() {
    return (
        <section id="provider" className="w-full bg-white py-8 px-6 rounded-lg shadow-md my-8">
            <div className="max-w-screen-xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-[#0B3D91] mb-2">Insurance Provider Portal</h2>
                <p className="text-lg text-gray-700 mb-4">A dedicated portal for our insurance partners.</p>
                <p className="text-md text-gray-600 mb-6">Want to partner with us? Reach out to become an insurance partner today.</p>
                <Link
                    to="/provider-login"
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform duration-200 ease-in-out font-semibold"
                >
                    Provider Login
                </Link>
            </div>
        </section>
    );
}

export default ProviderPortalSection;

