"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import useCartStore from "@/store/cartStore";
import { Product } from "@/types/types";
import { Toaster } from "react-hot-toast";
import { getProductById } from "@/app/actions/product";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCartStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(params.id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl mb-4">Product not found</div>
        <Button onClick={() => router.push("/home/shop")}>Back to Shop</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-10 px-4">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2 h-96 relative">
            <img
              className="w-full h-full object-contain object-center"
              src={product.image}
              alt={product.title}
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {product.category}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating.rate)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</div>
            <div className="flex space-x-4">
              <Button onClick={handleAddToCart} className="px-6 py-2">
                Add to Cart
              </Button>
              <Button
                onClick={() => router.push("/cart")}
                variant="outline"
                className="px-6 py-2"
              >
                View Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}