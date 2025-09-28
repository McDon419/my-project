import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { X, ShoppingBag } from "lucide-react";

interface ProductVariantSelectorProps {
  sizes: string[];
  colors: string[];
  inStock: number;
  onAddToCart: (size?: string, color?: string) => void;
  isLoading?: boolean;
  onClose: () => void;
}

export function ProductVariantSelector({
  sizes,
  colors,
  inStock,
  onAddToCart,
  isLoading = false,
  onClose,
}: ProductVariantSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleAddToCart = () => {
    onAddToCart(selectedSize || undefined, selectedColor || undefined);
  };

  const canAddToCart = inStock > 0 && ((sizes?.length || 0) === 0 || selectedSize) && ((colors?.length || 0) === 0 || selectedColor);

  return (
    <Card className="absolute inset-0 z-10 bg-background/95 backdrop-blur-sm">
      <CardContent className="p-4 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-sm">Select Options</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onClose}
            data-testid="button-close-variant-selector"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 space-y-4">
          {/* Size Selection */}
          {(sizes?.length || 0) > 0 && (
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Size *
              </label>
              <div className="flex flex-wrap gap-2">
                {(sizes || []).map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    className="h-8 min-w-[2rem] text-xs"
                    onClick={() => setSelectedSize(size)}
                    data-testid={`button-size-${size}`}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {(colors?.length || 0) > 0 && (
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">
                Color *
              </label>
              <div className="flex flex-wrap gap-2">
                {(colors || []).map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => setSelectedColor(color)}
                    data-testid={`button-color-${color}`}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Stock Status */}
          <div className="pt-2">
            {inStock > 0 ? (
              <Badge variant="outline" className="text-xs">
                {inStock} in stock
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-xs">
                Out of stock
              </Badge>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full mt-4"
          onClick={handleAddToCart}
          disabled={!canAddToCart || isLoading}
          data-testid="button-add-to-cart-with-variants"
        >
          <ShoppingBag className="h-4 w-4 mr-2" />
          {isLoading ? "Adding..." : "Add to Cart"}
        </Button>

        {/* Help Text */}
        {!canAddToCart && inStock > 0 && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {!selectedSize && (sizes?.length || 0) > 0 && "Please select a size"}
            {!selectedColor && (colors?.length || 0) > 0 && !selectedSize && " and "}
            {!selectedColor && (colors?.length || 0) > 0 && "Please select a color"}
          </p>
        )}
      </CardContent>
    </Card>
  );
}