import Banner from '@/components/home/Banner';
import StatsBar from '@/components/home/StatsBar';
import FeaturedPets from '@/components/home/FeaturedPets';
import WhyAdopt from '@/components/home/WhyAdopt';
import SuccessStories from '@/components/home/SuccessStories';
import PetCareTips from '@/components/home/PetcareTips';

export default function Home() {
  return (
    <div className="relative pt-28 bg-gradient-to-b from-[rgba(159,232,112,0.06)] via-transparent to-transparent min-h-screen">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0" />
      
      {/* Mask to fade out the grid pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-app)] to-[var(--bg-app)] pointer-events-none z-0 opacity-95" />
      
      <div className="relative z-10">
        <Banner />
        <StatsBar />
        <FeaturedPets />
        <WhyAdopt />
        <PetCareTips />
        <SuccessStories />
      </div>
    </div>
  );
}
