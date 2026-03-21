import { MapPin, Package, Search } from 'lucide-react'
import { Product, User } from '../types'
import { ProductCard } from '../components/ProductCard'

type Props = {
  orderSuccess: boolean
  searchTerm: string
  categoryFilter: string
  categories: string[]
  filteredProducts: Product[]
  producerCache: Record<string, User>
  onSearchTermChange: (v: string) => void
  onCategoryChange: (v: string) => void
  onAddToCart: (p: Product) => void
  onViewProducer: (id: string | number) => void
  onClickProduct: (p: Product) => void
}

export function MarketView({
  orderSuccess,
  searchTerm,
  categoryFilter,
  categories,
  filteredProducts,
  producerCache,
  onSearchTermChange,
  onCategoryChange,
  onAddToCart,
  onViewProducer,
  onClickProduct
}: Props) {
  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 space-y-8">
      {orderSuccess && (
        <div className="bg-green-100 border-2 border-green-800 p-4 rounded-xl text-green-800 font-bold text-center">
          ¡Pedido realizado con éxito!
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4 space-y-6">
          <div className="sketch-card space-y-4">
            <h3 className="font-bold text-lg">Filtros</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => onSearchTermChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-stone-800 rounded-lg outline-none text-sm"
              />
            </div>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold transition-colors ${categoryFilter === cat ? 'bg-brand-sage text-stone-800 border-2 border-stone-800' : 'hover:bg-stone-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="sketch-card space-y-4">
            <h3 className="font-bold text-lg">Productores Cerca</h3>
            <div className="h-48 bg-stone-100 sketch-border relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 grid grid-cols-4 grid-rows-4">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="border border-stone-300"></div>
                ))}
              </div>
              <MapPin className="absolute top-1/4 left-1/3 text-red-500" size={20} />
              <MapPin className="absolute top-1/2 left-2/3 text-orange-500" size={20} />
            </div>
          </div>
        </div>

        <div className="md:w-3/4 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-serif font-bold">Catálogo</h2>
            <span className="text-stone-500 text-sm font-bold">{filteredProducts.length} productos encontrados</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                producerImage={producerCache[product.producer_id.toString()]?.image_url}
                onAddToCart={onAddToCart}
                onViewProducer={(id) => onViewProducer(id)}
                onClickProduct={(p) => onClickProduct(p)}
              />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 sketch-card bg-stone-50">
              <Package size={48} className="mx-auto text-stone-300 mb-4" />
              <p className="text-stone-500 font-bold">No encontramos lo que buscas.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

