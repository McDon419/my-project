import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";
import { useState } from "react";

interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
}

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onFiltersChange?: (filters: FilterState) => void;
}

const categories = ["Tops", "Bottoms", "Dresses", "Outerwear", "Accessories"];
const brands = ["ASOS", "Zara", "H&M", "Nike", "Adidas", "Uniqlo"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Black", "White", "Gray", "Blue", "Red", "Green", "Brown"];

export default function FilterSidebar({ isOpen = true, onClose, onFiltersChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    brands: [],
    priceRange: [0, 500],
    sizes: [],
    colors: [],
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    console.log('Filters updated:', updatedFilters);
    onFiltersChange?.(updatedFilters);
  };

  const toggleArrayFilter = (key: keyof FilterState, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFilters({ [key]: newArray });
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      brands: [],
      priceRange: [0, 500] as [number, number],
      sizes: [],
      colors: [],
    };
    setFilters(clearedFilters);
    console.log('All filters cleared');
    onFiltersChange?.(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return filters.categories.length + filters.brands.length + filters.sizes.length + filters.colors.length;
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 p-4 space-y-4" data-testid="sidebar-filters">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5" />
          <h2 className="text-lg font-semibold" data-testid="text-filters-title">
            Filters
          </h2>
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary" data-testid="badge-active-filters">
              {getActiveFilterCount()}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              data-testid="button-clear-filters"
            >
              Clear All
            </Button>
          )}
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="md:hidden"
              data-testid="button-close-filters"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Price Range */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
            max={500}
            min={0}
            step={10}
            className="w-full"
            data-testid="slider-price-range"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span data-testid="text-price-min">${filters.priceRange[0]}</span>
            <span data-testid="text-price-max">${filters.priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => toggleArrayFilter('categories', category)}
                data-testid={`checkbox-category-${category}`}
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Brands */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Brands</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => toggleArrayFilter('brands', brand)}
                data-testid={`checkbox-brand-${brand}`}
              />
              <label
                htmlFor={`brand-${brand}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {brand}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Sizes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={filters.sizes.includes(size) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleArrayFilter('sizes', size)}
                className="h-8"
                data-testid={`button-size-${size}`}
              >
                {size}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Colors */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            {colors.map((color) => (
              <Button
                key={color}
                variant={filters.colors.includes(color) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleArrayFilter('colors', color)}
                className="h-8 text-xs"
                data-testid={`button-color-${color}`}
              >
                {color}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}