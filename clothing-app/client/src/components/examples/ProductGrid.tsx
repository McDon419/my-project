import ProductGrid from '../ProductGrid'
import fashionImage from '@assets/generated_images/Fashion_clothing_collection_8f5af1aa.png'
import mensFashion from '@assets/generated_images/Men\'s_fashion_accessories_7ab13823.png'

// todo: remove mock functionality
const mockProducts = [
  {
    id: "1",
    name: "Elegant Silk Blouse",
    price: "89.99",
    originalPrice: "119.99",
    image: fashionImage,
    category: "Tops",
    brand: "ASOS",
    inStock: true,
  },
  {
    id: "2",
    name: "Classic Denim Jacket",
    price: "79.99",
    image: mensFashion,
    category: "Outerwear",
    brand: "Zara",
    inStock: true,
  },
  {
    id: "3",
    name: "Summer Floral Dress",
    price: "59.99",
    originalPrice: "89.99",
    image: fashionImage,
    category: "Dresses",
    brand: "H&M",
    inStock: false,
  },
  {
    id: "4",
    name: "Casual Cotton T-Shirt",
    price: "24.99",
    image: mensFashion,
    category: "Tops",
    brand: "Uniqlo",
    inStock: true,
  },
]

export default function ProductGridExample() {
  return (
    <ProductGrid
      products={mockProducts}
      onSortChange={(sort) => console.log('Sort changed:', sort)}
      onViewModeChange={(mode) => console.log('View mode changed:', mode)}
      onLoadMore={() => console.log('Load more triggered')}
      hasMore={true}
    />
  )
}