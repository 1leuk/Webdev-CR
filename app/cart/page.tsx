"use client";
import { useState } from "react"; // Import useState
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import useCartStore from "@/store/cartStore";

export default function Cart() {
  const router = useRouter();
  const { items, removeFromCart, updateQty } = useCartStore((state) => state);
  const [couponCode, setCouponCode] = useState(""); // State for coupon code input
  const [discount, setDiscount] = useState(0); // State for discount amount
  const [appliedCoupon, setAppliedCoupon] = useState(""); // State to track applied coupon
  const [couponError, setCouponError] = useState(""); // State for coupon error messages

  const availableCoupons: { [key: string]: number } = {
    SAVE10: 0.1, // 10% off
    SAVE20: 0.2, // 20% off
    WELCOME: 0.15, // 15% off
    FREESHIP: 0.05, // 5% off
  };

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Apply discount to subtotal
  const discountAmount = subtotal * discount;
  const discountedSubtotal = subtotal - discountAmount;
  const tax = discountedSubtotal * 0.1; // Assuming 10% tax
  const total = discountedSubtotal + tax;

  // Handle coupon code application
  const handleApplyCoupon = () => {
    // Reset error message
    setCouponError("");

    // Check if coupon is valid
    if (couponCode.trim() === "") {
      setCouponError("Please enter a coupon code");
      return;
    }

    const discountRate = availableCoupons[couponCode.toUpperCase()];

    if (discountRate) {
      setDiscount(discountRate);
      setAppliedCoupon(couponCode.toUpperCase());
      setCouponCode(""); // Clear input field
    } else {
      setCouponError("Invalid coupon code");
      setDiscount(0);
      setAppliedCoupon("");
    }
  };

  // Handle coupon removal
  const handleRemoveCoupon = () => {
    setDiscount(0);
    setAppliedCoupon("");
  };

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

                {/* Coupon Code Section */}
                <div className="mb-4 border-b pb-4">
                  <h3 className="text-lg font-medium mb-2">Apply Discount</h3>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-green-50 p-2 rounded border border-green-200">
                      <div>
                        <span className="font-medium text-green-700">
                          {appliedCoupon}
                        </span>
                        <span className="ml-2 text-green-600">
                          ({discount * 100}% off)
                        </span>
                      </div>
                      <Button
                        onClick={handleRemoveCoupon}
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter coupon code"
                          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring focus:ring-blue-200 focus:outline-none"
                        />
                        <Button
                          onClick={handleApplyCoupon}
                          className="rounded-l-none bg-blue-500 hover:bg-blue-600"
                        >
                          Apply
                        </Button>
                      </div>
                      {couponError && (
                        <p className="text-red-500 text-sm mt-1">
                          {couponError}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                {/* Discount line (only shows when discount is applied) */}
                {discount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount ({discount * 100}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

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
