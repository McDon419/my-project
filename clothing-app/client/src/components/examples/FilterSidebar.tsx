import FilterSidebar from '../FilterSidebar'

export default function FilterSidebarExample() {
  return (
    <FilterSidebar
      isOpen={true}
      onClose={() => console.log('Filter sidebar closed')}
      onFiltersChange={(filters) => console.log('Filters changed:', filters)}
    />
  )
}