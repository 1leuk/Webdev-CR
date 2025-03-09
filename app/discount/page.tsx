"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { FiCopy, FiExternalLink } from "react-icons/fi";
import useCartStore from "@/store/cartStore";

// Define the coupon type structure
interface Coupon {
  code: string;
  discountRate: number;
  description: string;
  expiryDate: string | null;
  minPurchase: number | null;
  category: string;
}

export default function DiscountsPage() {
  const router = useRouter();
  const { items } = useCartStore((state) => state);
  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Available coupons
  const [coupons] = useState<Coupon[]>([
    {
      code: "SAVE10",
      discountRate: 0.1,
      description: "Get 10% off your entire order with no minimum purchase",
      expiryDate: "2025-06-30",
      minPurchase: null,
      category: "general",
    },
    {
      code: "SAVE20",
      discountRate: 0.2,
      description: "Get 20% off when you spend $100 or more",
      expiryDate: "2025-05-15",
      minPurchase: 100,
      category: "general",
    },
    {
      code: "WELCOME",
      discountRate: 0.15,
      description: "New customer? Get 15% off your first order",
      expiryDate: null,
      minPurchase: null,
      category: "new customers",
    },
    {
      code: "FREESHIP",
      discountRate: 0.05,
      description: "5% discount on all orders, no minimum required",
      expiryDate: "2025-04-01",
      minPurchase: null,
      category: "shipping",
    },
    {
      code: "SPRING25",
      discountRate: 0.25,
      description: "Spring sale! 25% off when you spend $150 or more",
      expiryDate: "2025-05-31",
      minPurchase: 150,
      category: "seasonal",
    },
  ]);

  // Track copied coupon code for showing feedback
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Copy coupon code to clipboard
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000); // Reset after 2 seconds
  };

  // Check if coupon is applicable to current cart
  const isCouponApplicable = (minPurchase: number | null) => {
    if (!minPurchase) return true;
    return cartTotal >= minPurchase;
  };

  // Group coupons by category
  const groupedCoupons = coupons.reduce((acc, coupon) => {
    if (!acc[coupon.category]) {
      acc[coupon.category] = [];
    }
    acc[coupon.category].push(coupon);
    return acc;
  }, {} as Record<string, Coupon[]>);

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex items-center mb-8">
          <Button
            onClick={() => router.push("/home")}
            className="mr-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            ← Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Available Discounts
            </h1>
            <p className="text-gray-600 mt-1">
              Use these coupon codes at checkout to save on your purchase
            </p>
          </div>
        </div>

        {/* Coupon Categories */}
        {Object.keys(groupedCoupons).map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {formatCategoryName(category)} Discounts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedCoupons[category].map((coupon) => {
                const isApplicable = isCouponApplicable(coupon.minPurchase);

                return (
                  <div
                    key={coupon.code}
                    className={`bg-white rounded-lg shadow-md overflow-hidden ${
                      !isApplicable ? "opacity-70" : ""
                    }`}
                  >
                    {/* Coupon Header with discount percentage */}
                    <div className="bg-yellow-500 p-3 flex justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-900">
                        {(coupon.discountRate * 100).toFixed(0)}% OFF
                      </h3>
                      {coupon.expiryDate && (
                        <div className="text-sm text-gray-800">
                          Expires:{" "}
                          {new Date(coupon.expiryDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {/* Coupon Details */}
                    <div className="p-4">
                      <p className="text-gray-700 mb-3">{coupon.description}</p>

                      {coupon.minPurchase && (
                        <div
                          className={`text-sm mb-3 ${
                            isApplicable ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {isApplicable
                            ? `✓ Your cart qualifies (min. $${coupon.minPurchase})`
                            : `Requires minimum purchase of $${coupon.minPurchase}`}
                        </div>
                      )}

                      {/* Code Copy Section */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex-1 bg-gray-100 rounded px-3 py-2 text-gray-800 font-mono">
                          {coupon.code}
                        </div>
                        <Button
                          onClick={() => copyToClipboard(coupon.code)}
                          className="ml-2 bg-blue-600 hover:bg-blue-700 flex items-center"
                          size="sm"
                        >
                          <FiCopy className="mr-1" />
                          {copiedCode === coupon.code ? "Copied!" : "Copy"}
                        </Button>
                      </div>

                      {/* Apply to Cart Button */}
                      <div className="mt-3">
                        <Button
                          onClick={() => {
                            copyToClipboard(coupon.code);
                            router.push("/cart");
                          }}
                          className="w-full flex items-center justify-center"
                          disabled={!isApplicable}
                        >
                          <FiExternalLink className="mr-2" />
                          Apply to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Empty State */}
        {Object.keys(groupedCoupons).length === 0 && (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <div className="text-6xl mb-4">🎟️</div>
            <h2 className="text-2xl mb-4">No discounts available right now</h2>
            <p className="text-gray-500 mb-6">
              Check back soon for special offers and promotions!
            </p>
            <Button
              onClick={() => router.push("/home/shop")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
