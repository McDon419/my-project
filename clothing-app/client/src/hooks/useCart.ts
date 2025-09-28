import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface AddToCartParams {
  productId: string;
  quantity?: number;
  size?: string;
  color?: string;
}

export function useCart() {
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

  // Add item to cart
  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity = 1, size, color }: AddToCartParams) => {
      const response = await apiRequest("/api/cart", "POST", {
        productId,
        quantity,
        size,
        color,
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
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

  // Calculate totals
  const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum: number, item: any) => {
    if (!item.product) return sum;
    return sum + (parseFloat(item.product.price) * item.quantity);
  }, 0);

  return {
    cartItems,
    isLoading,
    totalItems,
    totalPrice,
    addToCart: addToCartMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
    removeItem: removeItemMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingQuantity: updateQuantityMutation.isPending,
    isRemovingItem: removeItemMutation.isPending,
  };
}