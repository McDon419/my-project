import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from '@assets/generated_images/Fashion_hero_banner_f51efd39.png';

interface HeroSectionProps {
  onShopNow?: () => void;
  onViewCollection?: () => void;
}

export default function HeroSection({ onShopNow, onViewCollection }: HeroSectionProps) {
  const handleShopNow = () => {
    console.log('Shop now clicked');
    onShopNow?.();
  };

  const handleViewCollection = () => {
    console.log('View collection clicked');
    onViewCollection?.();
  };

  return (
    <section className="relative h-[600px] overflow-hidden" data-testid="section-hero">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Fashion Collection"
          className="w-full h-full object-cover"
          data-testid="img-hero-background"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-lg space-y-6 text-white">
          {/* Badge */}
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium tracking-wide uppercase" data-testid="text-hero-badge">
              New Collection
            </span>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight" data-testid="text-hero-title">
              Fashion
              <br />
              <span className="text-primary">Reimagined</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed" data-testid="text-hero-description">
              Discover our curated collection of timeless pieces that blend contemporary style with classic elegance.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              onClick={handleShopNow}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              data-testid="button-hero-shop-now"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleViewCollection}
              className="border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border"
              data-testid="button-hero-view-collection"
            >
              View Collection
            </Button>
          </div>

          {/* Features */}
          <div className="flex items-center space-x-8 pt-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span data-testid="text-hero-feature-1">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span data-testid="text-hero-feature-2">Easy Returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span data-testid="text-hero-feature-3">Premium Quality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}