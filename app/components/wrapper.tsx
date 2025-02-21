"use client"; // We need to access localStorage (client-side)

import { useEffect, useState } from "react";
import PatientNavbar from "./patientNavBar";
// import DoctorNavBar from "./DoctorNavBar";
export default function NavWrapper() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
     setRole(localStorage.getItem("role")); 
    console.log(role)
  }, [role]);
  

  if (role === "patient") return <PatientNavbar />;
//   if (role === "doctor") return <DoctorNavBar />;
  return null; // No navbar if role is unknown
}
