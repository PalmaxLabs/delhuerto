import { ArrowLeft, MapPin, Package, Store } from 'lucide-react'
import { Product, User } from '../types'
import { ProductCard } from '../components/ProductCard'

type Props = {
  producerId: string | number
  producerInfo: Partial<User> & { producer_name?: string; producer_location?: string; description?: string; image_url?: string; name?: string; location?: string }
  products: Product[]
  onBackToMarket: () => void
  onAddToCart: (p: Product) => void
}

export function ProducerProfileView({ producerId, producerInfo, products, onBackToMarket, onAddToCart }: Props) {
  return (
    <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 space-y-12">
      <button onClick={onBackToMarket} className="text-stone-500 hover:text-stone-800 flex items-center gap-2 font-bold mb-4 cursor-pointer">
        <ArrowLeft size={20} /> Volver al catálogo
      </button>

      <div className="sketch-card bg-brand-sage/10 relative overflow-hidden p-8 md:p-16 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white sketch-border overflow-hidden bg-white shrink-0">
          <img
            src={producerInfo.image_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${producerId}`}
            alt="Productor"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4 text-center md:text-left z-10 w-full">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-800">
              {producerInfo.name || producerInfo.producer_name || 'Productor'}
            </h1>
            <p className="text-brand-leaf font-bold mt-1 flex items-center justify-center md:justify-start gap-1">
              <MapPin size={16} /> {producerInfo.location || producerInfo.producer_location || 'Ubicación local'}
            </p>
          </div>
          <p className="text-stone-600 max-w-2xl text-lg relative bg-white/60 p-4 rounded-xl items-center border border-stone-800/10">
            <span className="font-serif italic text-2xl text-stone-400 absolute -top-2 left-2">"</span>
            {producerInfo.description ||
              'Cultivamos con amor y respeto por la tierra. Nuestros productos son 100% orgánicos, asegurando el mejor sabor y nutrición para tu familia, directamente del campo a tu hogar.'}
          </p>
        </div>
        <Store className="absolute -bottom-10 -right-10 text-brand-leaf opacity-5" size={300} />
      </div>

      <div className="space-y-8">
        <h2 className="section-title">Nuestra Cosecha</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
        {products.length === 0 && (
          <div className="text-center py-20 bg-stone-50 rounded-2xl sketch-border">
            <Package size={48} className="mx-auto text-stone-300 mb-4" />
            <p className="text-stone-500 font-bold">Este productor no tiene productos disponibles.</p>
          </div>
        )}
      </div>
    </main>
  )
}

