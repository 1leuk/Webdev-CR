"use client";

import { useRouter } from "next/navigation";

export default function ShopPage() {
  const router = useRouter();

  // Dummy product data (replace with real API data)
  const products = [
    { id: 1, name: "Wireless Headphones", price: "$99.99", image: "/headphones.jpg" },
    { id: 2, name: "Smartphone Pro Max", price: "$1,299.99", image: "/smartphone.jpg" },
    { id: 3, name: "Gaming Laptop", price: "$2,499.99", image: "/laptop.jpg" },
    { id: 4, name: "Smartwatch 5", price: "$299.99", image: "/smartwatch.jpg" },
    { id: 5, name: "Bluetooth Speaker", price: "$149.99", image: "/speaker.jpg" },
    { id: 6, name: "Mechanical Keyboard", price: "$129.99", image: "/keyboard.jpg" },
  ];

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-6 text-center mt-20">Shop Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
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
  );
}
