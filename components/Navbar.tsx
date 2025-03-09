"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import useCartStore from "@/store/cartStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { items } = useCartStore((state) => state);
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // If scrolled more than 50px, set background
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 text-white transition-all ${
        isScrolled ? "bg-gray-900 bg-opacity-90 shadow-lg" : "bg-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          Fashion.com
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {[
            { name: "Home", path: "/home" },
            { name: "Shop", path: "/home/shop" },
            { name: "Team", path: "/team" },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`hover:text-yellow-400 transition ${
                pathname === item.path ? "text-yellow-400" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative flex items-center hover:text-yellow-400 transition group"
            aria-label="Shopping Cart"
          >
            <div className="relative p-2 rounded-full bg-yellow-500 bg-opacity-0 group-hover:bg-opacity-20 transition-all">
              <FiShoppingCart className="text-2xl" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-gray-900 rounded-full text-xs font-bold flex items-center justify-center min-w-5 h-5 px-1">
                  {cartItemCount}
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button and Cart Icon */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Cart Icon for Mobile */}
          <Link
            href="/cart"
            className="relative flex items-center hover:text-yellow-400 transition"
            aria-label="Shopping Cart"
          >
            <div className="relative p-1">
              <FiShoppingCart className="text-2xl" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-gray-900 rounded-full text-xs font-bold flex items-center justify-center min-w-5 h-5 px-1">
                  {cartItemCount}
                </span>
              )}
            </div>
          </Link>
          
          {/* Menu Toggle */}
          <button className="text-2xl text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-2 bg-gray-800 p-4 rounded-b-lg">
          {[
            { name: "Home", path: "/home" },
            { name: "Shop", path: "/home/shop" },
            { name: "Team", path: "/team" },
          ].map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="hover:text-yellow-400 transition text-white"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}