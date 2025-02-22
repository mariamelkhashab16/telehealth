"use client"; 

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSystemData } from "@/app/context/systemDataContext";
import DoctorCard from "@/app/components/doctorCard";
import Link from "next/link";

export default function SpecializationPage() {
  const { specId } = useParams();
  // const systemData = useSystemData() || { specializations: [] }; 




  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [specName, setSpecName] = useState("");
  const systemData = useSystemData();

  if (!specId) return;

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`/api/appointments/specialization/${specId}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to fetch doctors");

      setDoctors(data.data.doctors || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!systemData) return;
    const foundSpec = systemData.specializations.specializations.find(
      (spec) => spec.id === parseInt(specId, 10)
    );
  
    setSpecName(foundSpec?.name || "Unknown");
  }, [systemData]); 

  useEffect(() => {

    fetchDoctors();
  }, [specId]);

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Doctors for Specialization: {specName}</h1>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {doctors.length > 0 ? (
  <div className="grid grid-cols-2 gap-4">
      {doctors.map((doctor) => (
        <Link key={doctor.id} href={`/appointments/doctor/${doctor.id}`}>
          <DoctorCard doctor={doctor} />
        </Link>
      ))}
    </div>
  ) : (
    !loading && <p className="text-gray-500">No doctors available in this specialization</p>
  )}
    </div>
  );
}
