import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag, Plus, Minus, Trash2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    price: string;
    originalPrice?: string;
    images: string[];
    brand: string;
    category: string;
    inStock: number;
  } | null;
}

export function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch cart items using secure cookies
  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ["/api/cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart", {
        credentials: 'include', // Include cookies
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
      return response.json();
    },
  });

  // Update cart item quantity
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      const response = await apiRequest(`/api/cart/${id}`, "PUT", { quantity });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update item quantity",
        variant: "destructive",
      });
    },
  });

  // Remove item from cart
  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiRequest(`/api/cart/${id}`, "DELETE");
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    },
  });

  // Clear entire cart
  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("/api/cart", "DELETE");
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    },
  });

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItemMutation.mutate(id);
    } else {
      updateQuantityMutation.mutate({ id, quantity: newQuantity });
    }
  };

  const handleRemoveItem = (id: string) => {
    removeItemMutation.mutate(id);
  };

  const handleClearCart = () => {
    clearCartMutation.mutate();
  };

  // Calculate totals
  const totalItems = cartItems.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum: number, item: CartItem) => {
    if (!item.product) return sum;
    return sum + (parseFloat(item.product.price) * item.quantity);
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover-elevate" 
          data-testid="button-cart-toggle"
        >
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              data-testid="badge-cart-count"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg" data-testid="sheet-cart">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Shopping Cart
            {cartItems.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearCart}
                data-testid="button-clear-cart"
              >
                Clear all
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <ScrollArea className="flex-1 py-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-muted-foreground">Loading cart...</div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <ShoppingBag className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Your cart is empty</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Add some products to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="flex gap-3" data-testid={`cart-item-${item.id}`}>
                    {item.product && (
                      <>
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-muted">
                          {item.product.images[0] && (
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium truncate" data-testid={`text-product-name-${item.id}`}>
                            {item.product.name}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {item.product.brand}
                          </p>
                          {(item.size || item.color) && (
                            <div className="flex gap-2 mt-1">
                              {item.size && (
                                <Badge variant="outline" className="text-xs" data-testid={`badge-size-${item.id}`}>
                                  Size: {item.size}
                                </Badge>
                              )}
                              {item.color && (
                                <Badge variant="outline" className="text-xs" data-testid={`badge-color-${item.id}`}>
                                  {item.color}
                                </Badge>
                              )}
                            </div>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                data-testid={`button-decrease-${item.id}`}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm w-8 text-center" data-testid={`text-quantity-${item.id}`}>
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                data-testid={`button-increase-${item.id}`}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium" data-testid={`text-price-${item.id}`}>
                                ${(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                onClick={() => handleRemoveItem(item.id)}
                                data-testid={`button-remove-${item.id}`}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {cartItems.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium">Total</span>
                <span className="text-lg font-semibold" data-testid="text-cart-total">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <Button 
                className="w-full" 
                size="lg"
                data-testid="button-checkout"
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}