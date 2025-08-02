import HeroSection from "@/components/hero-section"
import FeaturedProducts from "@/components/featured-products"
import ProductAdvantages from "@/components/product-advantages"
import ShippingCalculator from "@/components/shipping-calculator"
import Testimonials from "@/components/testimonials"
import ResellerBenefits from "@/components/reseller-benefits"
import ResellerForm from "@/components/reseller-form"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection id="home" /> {/* Added id="home" */}
      <FeaturedProducts />
      <ProductAdvantages />
      <ShippingCalculator />
      <Testimonials />
      <ResellerBenefits />
      <ResellerForm />
      <Footer />
    </main>
  )
}
