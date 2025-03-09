"use client";
import { useRouter } from "next/navigation"; // Import router
import { Button } from "@/components/button";
import useCartStore from "@/store/cartStore";

export default function Cart() {
  const router = useRouter(); // Initialize router
  const { items, removeFromCart, updateQty } = useCartStore((state) => state);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // Assuming 10% tax
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header Section with Back Button on the Left */}
        <div className="flex items-center mb-6">
          {/* 🔙 Back Button (Left Side) */}
          <Button
            onClick={() => router.push("/home")}
            className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            ← Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            Your Cart ({items.reduce((sum, i) => sum + i.quantity, 0)})
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="text-8xl mb-4">🛒</div>
            <h2 className="text-2xl mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button
              onClick={() => router.push("/home/shop")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center bg-white p-4 mb-4 rounded-lg shadow"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded-md mr-4"
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        onClick={() => updateQty("decrement", item.id)}
                        variant="outline"
                        size="sm"
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        onClick={() => updateQty("increment", item.id)}
                        variant="outline"
                        size="sm"
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={() => removeFromCart(item.id)}
                    variant="destructive"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <div className="md:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Order Summary
                </h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button
                  className="w-full mt-6"
                  onClick={() => router.push("/checkout")}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
