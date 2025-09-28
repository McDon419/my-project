import Header from '../Header'

export default function HeaderExample() {
  return (
    <Header
      cartItemCount={3}
      onSearch={(query) => console.log('Search triggered:', query)}
      onMenuClick={() => console.log('Menu clicked')}
    />
  )
}