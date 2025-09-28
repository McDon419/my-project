import { Search, Menu, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeToggle from "./ThemeToggle";
import { ShoppingCart } from "./ShoppingCart";
import { useState } from "react";

interface HeaderProps {
  onSearch?: (query: string) => void;
  onMenuClick?: () => void;
}

export default function Header({ onSearch, onMenuClick }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover-elevate"
            onClick={onMenuClick}
            data-testid="button-mobile-menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-serif font-semibold" data-testid="text-logo">
              Fashion Store
            </h1>
          </div>

          {/* Search bar - hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile search button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover-elevate"
              data-testid="button-mobile-search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="hover-elevate"
              data-testid="button-wishlist"
            >
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <ShoppingCart />

            {/* Theme toggle */}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-mobile-search"
              />
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}