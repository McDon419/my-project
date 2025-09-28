import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, Grid3X3, List } from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string | null;
  images: string[];
  category: string;
  brand: string;
  inStock: number;
  description: string;
  sizes: string[];
  colors: string[];
  featured: boolean;
  createdAt: string;
}

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onSortChange?: (sort: string) => void;
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

const sortOptions = [
  { value: "name", label: "Name" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
];

export default function ProductGrid({
  products,
  loading = false,
  onSortChange,
  onViewModeChange,
  onLoadMore,
  hasMore = true,
}: ProductGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState("newest");

  const handleSortChange = (value: string) => {
    setSortBy(value);
    console.log('Sort changed to:', value);
    onSortChange?.(value);
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
    console.log('View mode changed to:', mode);
    onViewModeChange?.(mode);
  };

  const handleLoadMore = () => {
    console.log('Load more triggered');
    onLoadMore?.();
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-[3/4] bg-muted rounded-md animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 space-y-6" data-testid="container-product-grid">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="space-y-1">
          <h2 className="text-2xl font-serif font-semibold" data-testid="text-products-title">
            Products
          </h2>
          <p className="text-muted-foreground" data-testid="text-products-count">
            {products.length} items found
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort */}
          <div className="flex items-center space-x-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-48" data-testid="select-sort">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* View mode toggle */}
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleViewModeChange('grid')}
              className="rounded-r-none"
              data-testid="button-view-grid"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => handleViewModeChange('list')}
              className="rounded-l-none"
              data-testid="button-view-list"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <Grid3X3 className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold" data-testid="text-no-products-title">
              No products found
            </h3>
            <p className="text-muted-foreground" data-testid="text-no-products-description">
              Try adjusting your filters or search terms
            </p>
          </div>
        </div>
      ) : (
        <>
          <div
            className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}
            data-testid="grid-products"
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice || undefined}
                image={product.images[0]}
                category={product.category}
                brand={product.brand}
                inStock={product.inStock}
                sizes={product.sizes}
                colors={product.colors}
                onAddToWishlist={(id) => console.log('Add to wishlist:', id)}
              />
            ))}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center pt-8">
              <Button
                variant="outline"
                onClick={handleLoadMore}
                disabled={loading}
                className="min-w-32"
                data-testid="button-load-more"
              >
                {loading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}