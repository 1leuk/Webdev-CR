import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Section - Brand Name */}
        <div>
          <h2 className="text-2xl font-bold">ApexGear</h2>
          <div className="flex space-x-4 mt-3">
            <Link href="#">
              <Image src="/assets/facebook.svg" alt="Facebook" width={24} height={24} />
            </Link>
            <Link href="#">
              <Image src="/assets/linkedin.svg" alt="LinkedIn" width={24} height={24} />
            </Link>
            <Link href="#">
              <Image src="/assets/instagram.svg" alt="Instagram" width={24} height={24} />
            </Link>
            <Link href="#">
              <Image src="/assets/twitter.svg" alt="Twitter" width={24} height={24} />
            </Link>
          </div>
        </div>

        {/* Right Section - Contact Info */}
        <div className="md:col-span-2 flex justify-end">
          <div className="text-right">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-sm">📞 +62 123 345 7890</p>
            <p className="text-sm">📍 Bandung, Indonesia</p>
            <p className="text-sm">📧 contact@apexgear.com</p>
            <p className="text-sm">🕒 Mon - Fri: 9 AM - 6 PM</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
