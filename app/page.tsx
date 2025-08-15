import HeroSection from "@/components/hero-section"
import FeaturedProducts from "@/components/featured-products"
import ProductAdvantages from "@/components/product-advantages"
import ResellerBenefits from "@/components/reseller-benefits"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"
import ScrollToTop from "@/components/scroll-to-top"

export default function Home() {
  return (
    <div className="min-h-screen smooth-scroll-container">
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="produk">
          <FeaturedProducts />
        </section>
        <section id="advantages">
          <ProductAdvantages />
        </section>
        <section id="reseller-benefits">
          <ResellerBenefits />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
