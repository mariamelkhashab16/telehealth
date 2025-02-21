"use client";
import Link from "next/link";

export default function PatientAuthPage() {
    return (
        <main className="container">
            <h1 className="text-2xl font-bold mb-6">Already have an account?</h1>
            <Link href="/auth/login" className="btn btn-primary">
                Login
            </Link>
            <Link href="/auth/patient/signup" className="btn btn-secondary">
                Sign Up
            </Link>
        </main>
    );
}
