import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { ProductVariantSelector } from "./ProductVariantSelector";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  category: string;
  brand: string;
  inStock: number;
  sizes: string[];
  colors: string[];
  onAddToWishlist?: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  brand,
  inStock,
  sizes,
  colors,
  onAddToWishlist,
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showVariantSelector, setShowVariantSelector] = useState(false);
  const { addToCart, isAddingToCart } = useCart();

  const hasVariants = (sizes?.length > 0) || (colors?.length > 0);

  const handleAddToCart = (size?: string, color?: string) => {
    addToCart({ productId: id, quantity: 1, size, color });
    setShowVariantSelector(false);
  };

  const handleQuickAdd = () => {
    if (hasVariants) {
      setShowVariantSelector(true);
    } else {
      handleAddToCart();
    }
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    console.log('Wishlist toggled for product:', id);
    onAddToWishlist?.(id);
  };

  return (
    <Card
      className="group hover-elevate overflow-hidden border-0 shadow-sm transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${id}`}
    >
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-testid={`img-product-${id}`}
          />
          
          {/* Wishlist button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 transition-all ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={handleToggleWishlist}
            data-testid={`button-wishlist-${id}`}
          >
            <Heart
              className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`}
            />
          </Button>

          {/* Category badge */}
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 bg-white/90 text-gray-700"
            data-testid={`badge-category-${id}`}
          >
            {category}
          </Badge>

          {/* Stock status */}
          {inStock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" data-testid={`badge-out-of-stock-${id}`}>
                Out of Stock
              </Badge>
            </div>
          )}

          {/* Quick add button - shown on hover */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 ${
              isHovered && inStock > 0 ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <Button
              className="w-full bg-white text-black hover:bg-gray-100"
              onClick={handleQuickAdd}
              disabled={inStock === 0 || isAddingToCart}
              data-testid={`button-add-to-cart-${id}`}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              {isAddingToCart ? "Adding..." : hasVariants ? "Select Options" : "Add to Cart"}
            </Button>
          </div>

          {/* Variant Selector Overlay */}
          {showVariantSelector && (
            <ProductVariantSelector
              sizes={sizes}
              colors={colors}
              inStock={inStock}
              onAddToCart={handleAddToCart}
              isLoading={isAddingToCart}
              onClose={() => setShowVariantSelector(false)}
            />
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground" data-testid={`text-brand-${id}`}>
              {brand}
            </span>
          </div>
          
          <h3
            className="font-medium text-sm leading-tight line-clamp-2"
            data-testid={`text-name-${id}`}
          >
            {name}
          </h3>
          
          <div className="flex items-center space-x-2">
            <span className="font-semibold" data-testid={`text-price-${id}`}>
              ${price}
            </span>
            {originalPrice && (
              <span
                className="text-sm text-muted-foreground line-through"
                data-testid={`text-original-price-${id}`}
              >
                ${originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}