"use client";
import Link from "next/link";
import { useSystemData } from "@/app/context/systemDataContext";

export default function PatientAuthPage() {
    const systemRoles = useSystemData()?.roles.roles;



    return (
        <div> 
          {systemRoles && (
            <main className="container">
              <h1 className="text-2xl font-bold mb-6">Already have an account?</h1>
    
              <Link
                href={{
                  pathname: "/auth/login",
                  query: { role: systemRoles.find((role) => role.name === "patient")?.id },
                }}
                className="btn btn-primary"
              >
                Login
              </Link>
    
              <Link href="/auth/patient/signup" className="btn btn-secondary">
                Sign Up
              </Link>
            </main>
          )}
        </div> 
      );
    }