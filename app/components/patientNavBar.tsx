"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PatientNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md py-3 px-6">
      <div className="flex justify-center space-x-6">

      <Link href="/auth/patient/home">
          <button className="btn btn-primary">
            Home
          </button>
        </Link>

        <Link href="/appointments">
          <button className="btn btn-primary">
            Appointments
          </button>
        </Link>


        {/* <button className="btn btn-secondary" onClick={() => alert("Logging out...")}>
          Logout
        </button> */}
      </div>
    </nav>
  );
}
