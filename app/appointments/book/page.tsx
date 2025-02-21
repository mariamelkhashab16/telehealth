"use client"
import { useSystemData } from "@/app/context/systemDataContext";
import SpecializationCard from "@/app/components/specCard";

export default function BookAppointments() {
    const specializations = useSystemData()?.specializations.specializations || [];
  
    return (
      <div className="container">
        <h1 className="text-2xl font-bold mb-4">Choose a Specialization</h1>
  
        {specializations.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {specializations.map(({ id, name, name_ar }) => (
              <SpecializationCard key={id} id={id} name={name} nameAr={name_ar} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No specializations available.</p>
        )}
      </div>
    );
  }
  