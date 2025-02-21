"use client"
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); 
 
  const role = useSearchParams().get("role"); 

  console.log("role",role)
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); 
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });
  
      const response = await res.json();
      setLoading(false);
      
      console.log(response.data)
      if (res.ok) { 
        
        localStorage.setItem("token",response.data.token)
        localStorage.setItem("role",response.data.role)

        console.log(`/auth/${response.data.role}/home`)
        window.location.href = `/auth/${response.data.role}/home`;
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
      <h2 className="text-2xl font-bold">Login</h2>

      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-60 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-60 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      {loading && <div className="loader">Loading...</div>}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
