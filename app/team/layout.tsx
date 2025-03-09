import Navbar from "@/components/Navbar";
import Footer from "@/components/footer"; // 🔥 Import Footer

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer /> {/* 🔥 Footer ada di semua halaman */}
    </div>
  );
}
