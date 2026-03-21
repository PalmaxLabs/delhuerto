import { motion } from 'motion/react'
import { MapPin } from 'lucide-react'
import { Product, User } from '../types'

type Props = {
  user: User | null
  product: Product
  producer?: User
  onAddToCart: (p: Product) => void
  onOpenCart: () => void
  onViewProducer: (id: string | number) => void
}

export function ProductView({ user, product, producer, onAddToCart, onOpenCart, onViewProducer }: Props) {
  return (
    <section className="max-w-7xl mx-auto w-full px-4 py-16 md:py-24 grid md:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full aspect-square md:aspect-[4/5] bg-stone-50 border-2 border-stone-800 rounded-3xl overflow-hidden shadow-sm relative group"
      >
        <img
          src={product.image_url || `https://picsum.photos/seed/${product.id}/800/800`}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-white sketch-border px-4 py-1 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-leaf animate-pulse"></span>
          <span className="text-sm font-bold uppercase tracking-widest text-brand-leaf">Disponible</span>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
        <div className="space-y-4">
          <span className="text-sm font-bold text-stone-400 uppercase tracking-widest">{product.category}</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-stone-800 leading-tight">{product.name}</h1>
          <p className="text-3xl font-medium text-stone-700">
            ${product.price.toFixed(2)} <span className="text-xl text-stone-500">/ {product.unit}</span>
          </p>
        </div>

        <p className="text-xl text-stone-600 leading-relaxed font-serif">
          {product.description || 'Este producto recién cosechado no cuenta con descripción detallada aún. Disfruta su frescura natural.'}
        </p>

        {!user || user.role !== 'producer' ? (
          <div className="pt-4 border-t border-stone-200 border-dashed">
            <button
              onClick={() => {
                onAddToCart(product)
                onOpenCart()
              }}
              className="sketch-button w-full md:w-auto px-12 py-4 bg-brand-leaf hover:bg-brand-leaf text-white flex justify-center gap-3 items-center border-[#3A5333]"
            >
              Añadir al carrito
            </button>
          </div>
        ) : (
          <div className="pt-4 border-t border-stone-200 border-dashed text-stone-400 font-bold">[Modo Productor - Compra deshabilitada]</div>
        )}

        <div className="pt-8">
          <div
            className="sketch-card !p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 group hover:-translate-y-1 transition-transform cursor-pointer bg-white"
            onClick={() => onViewProducer(product.producer_id)}
          >
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-stone-800 bg-brand-sage/20 shrink-0 shadow-sm">
              <img
                src={producer?.image_url || `https://api.dicebear.com/7.x/notionists/svg?seed=${product.producer_id}`}
                alt="Productor"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow space-y-2">
              <h3 className="font-serif font-bold text-2xl text-stone-800 leading-none">Conoce a quién lo cultiva</h3>
              <div>
                <span className="font-bold text-stone-800 block text-lg">{producer?.name || product.producer_name || 'Productor Local'}</span>
                <span className="text-sm text-stone-500 flex items-center gap-1">
                  <MapPin size={14} /> {producer?.location || product.producer_location || 'Ubicación local'}
                </span>
              </div>
              <span className="text-brand-leaf font-bold text-sm underline inline-block pt-1">Ver perfil completo.</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

