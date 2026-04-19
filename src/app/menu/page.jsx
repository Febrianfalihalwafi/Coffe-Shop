import MenuSection from "@/components/menusections";

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-[#faf7f3] text-[#3b2e23] pt-24">
      {/* Header - persis dari menu/page.jsx asli */}
      <section className="pt-8 text-center">
        <h1 className="text-5xl md:text-6xl font-light tracking-[0.25em] mb-6">
          MENU KAMI
        </h1>
        <p className="text-[#6f5d48] tracking-wide">Hot • Cold • Non-Coffee</p>
      </section>

      <MenuSection />
    </main>
  );
}
