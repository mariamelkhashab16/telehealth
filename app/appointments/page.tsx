"use client";

import Link from "next/link";

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white space-y-6">
      <h1 className="text-2xl font-bold">Appointments</h1>
      <div className="flex space-x-4">
        <Link href="/appointments/book" className="btn btn-primary">
          Book New
        </Link>
        <Link href="/appointments/list" className="btn btn-secondary">
          View My Appointments
        </Link>
      </div>
    </div>
  );
}
