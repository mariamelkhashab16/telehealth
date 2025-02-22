export default function DoctorCard({ doctor }: { doctor: any }) {
    return (
      <div className="p-4 border rounded-lg shadow">
        <h2 className="text-lg font-semibold">{doctor.user?.username}</h2>
        <p className="text-gray-600">{doctor.user?.phonenumber}</p>
        <p className="text-gray-600">{doctor.bio}</p>

      </div>
    );
  }
  