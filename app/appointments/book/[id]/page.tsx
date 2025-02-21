"use client"; // Required for useParams

import { useParams } from "next/navigation";

export default function SpecializationPage() {
  const { id } = useParams(); 

  return (
    <div className="container">
      <h1 className="text-2xl font-bold">Doctors for Specialization {id}</h1>
      {/* Fetch doctors based on specialization ID */}
    </div>
  );
}
