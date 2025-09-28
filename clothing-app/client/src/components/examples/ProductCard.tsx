import ProductCard from '../ProductCard'
import fashionImage from '@assets/generated_images/Fashion_clothing_collection_8f5af1aa.png'

export default function ProductCardExample() {
  return (
    <div className="w-64">
      <ProductCard
        id="1"
        name="Elegant Silk Blouse with Refined Details"
        price="89.99"
        originalPrice="119.99"
        image={fashionImage}
        category="Tops"
        brand="ASOS"
        inStock={true}
        onAddToCart={(id) => console.log('Add to cart:', id)}
        onAddToWishlist={(id) => console.log('Add to wishlist:', id)}
      />
    </div>
  )
}