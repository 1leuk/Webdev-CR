"use client";

import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="bg-[#1b1d21] text-white min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 px-6 mt-20">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/assets/banner.jpg"
            alt="Gaming Banner"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative max-w-6xl mx-auto text-left">
          <h2 className="text-4xl font-bold">Fashion Forward, Always On Trend</h2>
          <p className="text-lg text-gray-400 mt-2">Special Discount - 20% Off</p>
          <button className="mt-6 px-6 py-3 bg-yellow-500 text-black rounded-lg font-semibold hover:bg-yellow-600">
            Shop Now
          </button>
        </div>
      </section>

      {/* Service Highlights */}
      <section className="max-w-6xl mx-auto my-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        {[
          { title: "Free Shipping Worldwide", desc: "Enjoy free worldwide shipping. Shop now, we’ll handle the rest." },
          { title: "24/7 Customer Service", desc: "Our customer service team is here for you 24/7, always ready to assist." },
          { title: "Money Back Guarantee", desc: "Shop with confidence! Money-back guarantee if you're not satisfied." },
        ].map((service, index) => (
          <div key={index} className="p-4 bg-[#2a2d33] shadow-md rounded-lg">
            <h3 className="font-bold text-lg">{service.title}</h3>
            <p className="text-gray-400 text-sm">{service.desc}</p>
          </div>
        ))}
      </section>

      {/* Category Promotions (UNCHANGED) */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
        {[
          { title: "Fjallraven - Foldsack", img: "/assets/tas.jpg", link: "/assets" },
          { title: "Mens Casual Premium Slim Fit T-Shirts", img: "/assets/baju.jpg", link: "/assets" },
          { title: "Mens Cotton Jacket", img: "/assets/baju2.jpg", link: "/assets" },
          { title: "Mens Casual Slim Fit", img: "/assets/baju3.jpg", link: "/assets" },
          { title: "John Hardy Women's Legends Naga", img: "/assets/gelang1.jpg", link: "/assets" },
        ].map((promo, index) => (
          <Link key={index} href={promo.link} className="relative group">
            <Image 
              src={promo.img} 
              alt={promo.title} 
              width={300} 
              height={200} 
              className="w-full h-48 object-cover rounded-lg" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition">
              {promo.title}
            </div>
          </Link>
        ))}
      </section>

      {/* Top Products Section */}
      <section className="max-w-6xl mx-auto my-12">
        <h2 className="text-2xl font-bold text-center">Top Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {[
            { name: "Solid Gold Petite Micropave", price: "$168.00", img: "/assets/cincin1.jpg" },
            { name: "White Gold Plated Princess", price: "$9.99", img: "/assets/cincin2.jpg" },
            { name: "Pierced Owl Rose Gold Plated Stainless Steel Double", price: "$10.99", img: "/assets/anting.jpg" },
            { name: "Fjallraven - Foldsack No. 1 Backpack", price: "$109.95", img: "/assets/tas.jpg" },
          ].map((product, index) => (
            <div key={index} className="bg-[#2a2d33] p-4 shadow-md rounded-lg text-center">
              <Image 
                src={product.img} 
                alt={product.name} 
                width={200} 
                height={200} 
                className="w-full h-40 object-cover rounded-md" 
              />
              <h3 className="text-lg font-bold mt-2">{product.name}</h3>
              <p className="text-yellow-400 font-semibold">{product.price} USD</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
