"use client";

import { FiCheckCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e] text-gray-300 px-4">
      <div className="max-w-2xl w-full bg-[#1a1f2e] p-8 rounded-lg shadow-lg text-center">
        <FiCheckCircle className="text-green-400 text-6xl mx-auto mb-4 animate-pulse" />
        <h1 className="text-3xl font-bold text-gray-100">Order Confirmed!</h1>
        <p className="text-gray-400 mt-2">Thank you for your purchase. Your order has been successfully placed.</p>

        <div className="bg-[#2d3445] p-4 rounded-md mt-6">
          <p className="text-gray-400 text-sm">Order Number:</p>
          <p className="text-gray-200 font-mono text-lg">#123456789</p>
        </div>

        {/* Order Summary */}
        <div className="mt-6 text-left">
          <h2 className="text-lg font-semibold text-gray-200">Order Summary</h2>
          <div className="mt-4 space-y-3">
            {/* Example item */}
            <div className="flex items-center justify-between bg-[#0a0f1e] p-3 rounded-md">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gray-700 rounded-md"></div>
                <div>
                  <p className="text-gray-200 font-medium">Product Name</p>
                  <p className="text-gray-400 text-sm">Qty: 1</p>
                </div>
              </div>
              <p className="text-gray-200 font-medium">$99.99</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col space-y-3">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-md font-medium"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => router.push("/orders")}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 py-2 rounded-md"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}
