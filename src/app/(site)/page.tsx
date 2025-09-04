import Hero from "../../components/home/Hero";
import Features from "../../components/home/Features";
import PopularCoupons from "../../components/home/PopularCoupons";
import CampusAmbassadorCTA from "../../components/home/CampusAmbassadorCTA";
import Testimonials from "../../components/home/Testimonials";
import PartnerBrands from "../../components/home/PartnerBrands";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <PopularCoupons />
      <CampusAmbassadorCTA />
      <Testimonials />
      <PartnerBrands />
    </main>
  );
}
