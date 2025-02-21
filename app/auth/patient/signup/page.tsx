"use client";
import { useState } from "react";

export default function PatientSignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    phonenumber: "",
    weight: "",
    height: "",
    gender: "",
    dateOfBirth: "",
    medicalHistory: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handle input change for all fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);


    const patientData = {
      username: formData.username,
      password: formData.password,
      phonenumber: formData.phonenumber,
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      medicalHistory: formData.medicalHistory,
    };

console.log(JSON.stringify(patientData))
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(patientData),
      });

      const response = await res.json();
      setLoading(false);

      if (res.ok) {
        window.location.href = "/auth/login"; 
      } else {
        setError(response.error || "An unknown error occurred.");
      }
    } catch (error) {
      setLoading(false);
      setError("Network error, please try again.");
    }
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-bold">Patient Sign-Up</h2>

      <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleInputChange}
          required
          className="w-60 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
          className="w-60 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="phonenumber"
          placeholder="Phone Number"
          value={formData.phonenumber}
          onChange={handleInputChange}
          required
          className="w-60 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <input
          type="number"
          name="weight"
          placeholder="Weight"
          value={formData.weight}
          onChange={handleInputChange}
          className="w-60 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <input
          type="number"
          name="height"
          placeholder="Height"
          value={formData.height}
          onChange={handleInputChange}
          className="w-60 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          required
          className="w-60 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          required
          className="w-60 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <textarea
          name="medicalHistory"
          placeholder="Medical History"
          value={formData.medicalHistory}
          onChange={handleInputChange}
          className="w-60 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        ></textarea>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      {loading && <div className="loader">Loading...</div>}
      {error && <div className="error-popup">{error}</div>}
    </div>
  );
}
