"use client";

import { useRouter } from "next/navigation";
export default function HomePage() {
  const router = useRouter();

  // Dummy product data (Replace with real data from API)
  const featuredProducts = [
    { id: 1, name: "Wireless Headphones", price: "$99.99", image: "/headphones.jpg" },
    { id: 2, name: "Smartphone Pro Max", price: "$1,299.99", image: "/smartphone.jpg" },
    { id: 3, name: "Gaming Laptop", price: "$2,499.99", image: "/laptop.jpg" },
    { id: 4, name: "Smartwatch 5", price: "$299.99", image: "/smartwatch.jpg" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[400px] flex items-center justify-center text-center text-white" 
           style={{ backgroundImage: "url('/hero-banner.jpg')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-5xl font-bold">Shop the Best Deals!</h1>
          <p className="text-lg mt-2">Unbeatable prices on the latest tech, fashion, and more.</p>
          <button
            className="mt-4 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition"
            onClick={() => router.push("/home/shop")}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4 rounded-md" />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full"
                onClick={() => router.push(`/product/${product.id}`)}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
