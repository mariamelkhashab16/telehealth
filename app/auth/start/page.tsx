"use client";

import Link from "next/link";

export default function AuthPage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Welcome! Who are you?</h1>
            <div className="space-y-4">
                <Link
                    href="/auth/patient"
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg block text-center"
                >
                    I'm a Patient
                </Link>
                <Link
                    href="/auth/login"
                    className="px-6 py-3 bg-green-500 text-white rounded-lg block text-center"
                >
                    I'm a Doctor
                </Link>
            </div>
        </main>
    );
}
