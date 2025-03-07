"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
      <p className="text-lg text-gray-600 mb-6">
        We are excited to have you here. Explore and learn more about our team and mission.
      </p>
      <div className="flex space-x-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => router.push("/team")}
        >
          Know the Team
        </button>
        <button
          className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          onClick={() => router.push("/home")}
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}
