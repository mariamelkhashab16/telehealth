import Link from "next/link";
// import { useSystemData } from "../context/systemDataContext";

export default function AuthPage() {
    // const systemRoles = useSystemData()?.roles

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Dru Telehealth Web App</h1>
            <div className="space-y-4">
                <Link
                    //  href={{
                    //     pathname: "/auth/patient",
                    //     query: { role: systemRoles?.find(role => role.name === 'patient')?.id },
                    //   }}
                    href={"/auth/patient"}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg block text-center"
                >
                    I'm a Patient
                </Link>
                <Link
                    // href={{
                    //     pathname: "/auth/doctor",
                    //     query: { role: systemRoles?.find(role => role.name === 'doctor')?.id },
                    //   }}
                    href={{
                        pathname: "/auth/login",
                        query: { role: 2 }, 
                      }}


                    className="px-6 py-3 bg-green-500 text-white rounded-lg block text-center"
                >
                    I'm a Doctor
                </Link>
            </div>
        </main>
    );
}
