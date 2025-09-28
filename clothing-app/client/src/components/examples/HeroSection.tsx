import HeroSection from '../HeroSection'

export default function HeroSectionExample() {
  return (
    <HeroSection
      onShopNow={() => console.log('Shop now clicked')}
      onViewCollection={() => console.log('View collection clicked')}
    />
  )
}