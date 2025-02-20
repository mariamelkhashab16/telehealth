"use client";
import Link from "next/link";

export default function HomePage() {
    return (
        <main className="container">
            <h1 className="text-3xl font-bold mb-6">Welcome to Dru Telehealth</h1>
            <Link href="/auth" className="btn btn-primary">
                Start
            </Link>
        </main>
    );
}
