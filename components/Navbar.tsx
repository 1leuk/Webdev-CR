"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
          BORMA open src
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
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
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
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
