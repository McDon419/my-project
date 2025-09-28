import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryBanner from "@/components/CategoryBanner";
import ProductGrid from "@/components/ProductGrid";
import FilterSidebar from "@/components/FilterSidebar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import fashionImage from '@assets/generated_images/Fashion_clothing_collection_8f5af1aa.png';
import mensFashion from '@assets/generated_images/Men\'s_fashion_accessories_7ab13823.png';

interface ProductFilters {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  search?: string;
  sortBy?: string;
}

const categories = [
  {
    title: "Summer Collection",
    description: "Light, airy fabrics perfect for warm weather styling",
    image: fashionImage,
  },
  {
    title: "Men's Essentials",
    description: "Timeless pieces for the modern gentleman",
    image: mensFashion,
  },
  {
    title: "Accessories",
    description: "Complete your look with our curated accessories",
    image: fashionImage,
  },
];

export default function Home() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({
    categories: [],
    brands: [],
    priceRange: [0, 1000],
    search: "",
    sortBy: "newest",
  });

  // Fetch products from API
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    
    if (filters.categories.length > 0) {
      filters.categories.forEach(cat => params.append('categories', cat));
    }
    
    if (filters.brands.length > 0) {
      filters.brands.forEach(brand => params.append('brands', brand));
    }
    
    if (filters.priceRange[0] > 0) {
      params.append('priceMin', filters.priceRange[0].toString());
    }
    
    if (filters.priceRange[1] < 1000) {
      params.append('priceMax', filters.priceRange[1].toString());
    }
    
    if (filters.search) {
      params.append('search', filters.search);
    }
    
    if (filters.sortBy) {
      params.append('sortBy', filters.sortBy);
    }
    
    return params.toString();
  };

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['/api/products', filters],
    queryFn: async () => {
      const queryParams = buildQueryParams();
      const response = await fetch(`/api/products${queryParams ? '?' + queryParams : ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
  });

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSortChange = (sort: string) => {
    setFilters(prev => ({ ...prev, sortBy: sort }));
  };

  const handleLoadMore = () => {
    // TODO: Implement pagination
    console.log('Load more products...');
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <Header
        onSearch={handleSearch}
        onMenuClick={() => setShowFilters(!showFilters)}
      />
      
      <main>
        {/* Hero Section */}
        <HeroSection
          onShopNow={() => {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onViewCollection={() => {
            document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Categories Section */}
        <section id="categories" className="py-16 bg-card/50" data-testid="section-categories">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl font-serif font-semibold" data-testid="text-categories-title">
                Shop by Category
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-categories-description">
                Discover our carefully curated collections designed for every style and occasion
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => (
                <CategoryBanner
                  key={index}
                  {...category}
                  onShopCategory={() => {
                    console.log('Shop category:', category.title);
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-8" data-testid="section-products">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full mb-4"
                  data-testid="button-toggle-filters"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </Button>
              </div>

              {/* Sidebar */}
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                <FilterSidebar
                  isOpen={true}
                  onClose={() => setShowFilters(false)}
                  onFiltersChange={handleFiltersChange}
                />
              </div>

              {/* Products Grid */}
              <ProductGrid
                products={products}
                loading={isLoading}
                onSortChange={handleSortChange}
                onLoadMore={handleLoadMore}
                hasMore={false}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}