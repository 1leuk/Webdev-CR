"use client";

export default function TeamPage() {
  const teamMembers = [
    { name: "Sayyid Faqih", role: "Founder & CEO" },
    { name: "Aurelia Aisya Rachma", role: "Lead Developer" },
    { name: "Alice Johnson", role: "UI/UX Designer" },
    { name: "Bob Brown", role: "Marketing Manager" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6">Meet Our Team</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl">
        Our team is dedicated to delivering the best experience possible. Get to know the people behind our success.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold">{member.name}</h2>
            <p className="text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
