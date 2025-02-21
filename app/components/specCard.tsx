"use client";

import Link from "next/link";

interface SpecializationCardProps {
  specId: number;
  name: string;
  nameAr: string;
}

export default function SpecializationCard({ specId, name, nameAr }: SpecializationCardProps) {
  return (
    <Link href={`/appointments/book/${specId}`}>
      <div className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-500">{nameAr}</p>
      </div>
    </Link>
  );
}
