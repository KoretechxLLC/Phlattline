"use client";

import { useRouter } from 'next/navigation';

export default function AuthErrorPage() {
    const router = useRouter(); // For navigation

    const handleBackToHome = () => {
        router.push("/Login"); // Navigate to the home page
    };

    return (
        <div className="flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat bg-[url('/assets/williamBg3.png')]">
            <div className="text-center bg-slate-800 p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-semibold text-white mb-4">
                    Your Account is Not Approved
                </h1>
                <p className="text-gray-100 mb-6">
                    Please wait for approval before you can sign in.
                </p>
                <button
                    onClick={handleBackToHome}
                    className="bg-[#B9881C] text-white px-6 py-2 rounded-md transition duration-300"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}
