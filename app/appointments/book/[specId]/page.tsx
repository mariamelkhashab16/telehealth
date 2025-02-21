"use client"; // Required for hooks

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SpecializationPage() {
  const { specId } = useParams(); 
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!specId) return; // Prevent fetching with undefined ID

    const fetchDoctors = async () => {
      try {
        const res = await fetch(`/api/appointments/specialization/${specId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch doctors");
        }

        setDoctors(data.doctors);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [specId]);

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Doctors for Specialization {specId}</h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && doctors.length === 0 && (
        <p className="text-gray-500">No doctors available.</p>
      )}

      <div className="grid grid-cols-2 gap-4">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="p-4 border rounded-lg shadow">
            <h2 className="text-lg font-semibold">{doctor.user?.username}</h2>
            <p className="text-gray-600">{doctor.user?.phonenumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
