import CategoryBanner from '../CategoryBanner'
import fashionImage from '@assets/generated_images/Fashion_clothing_collection_8f5af1aa.png'

export default function CategoryBannerExample() {
  return (
    <div className="w-80">
      <CategoryBanner
        title="Summer Collection"
        description="Light, airy fabrics perfect for warm weather styling"
        image={fashionImage}
        onShopCategory={() => console.log('Shop category clicked')}
      />
    </div>
  )
}