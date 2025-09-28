import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CategoryBannerProps {
  title: string;
  description: string;
  image: string;
  onShopCategory?: () => void;
}

export default function CategoryBanner({ title, description, image, onShopCategory }: CategoryBannerProps) {
  const handleShopCategory = () => {
    console.log('Shop category clicked:', title);
    onShopCategory?.();
  };

  return (
    <div className="relative h-64 rounded-lg overflow-hidden group hover-elevate" data-testid={`banner-category-${title}`}>
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        data-testid={`img-category-${title}`}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
        <div className="space-y-2">
          <h3 className="text-xl font-serif font-semibold" data-testid={`text-category-title-${title}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-200 line-clamp-2" data-testid={`text-category-description-${title}`}>
            {description}
          </p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleShopCategory}
          className="w-fit mt-4 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
          data-testid={`button-shop-category-${title}`}
        >
          Shop Now
          <ArrowRight className="ml-2 h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}