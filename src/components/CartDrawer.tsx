import { motion, AnimatePresence } from 'motion/react'
import { ShoppingCart, Trash2, X } from 'lucide-react'
import { CartItem } from '../types'

type Props = {
  isOpen: boolean
  cart: CartItem[]
  total: number
  onClose: () => void
  onCheckout: () => void
  onUpdateQuantity: (id: string | number, delta: number) => void
  onRemove: (id: string | number) => void
}

export function CartDrawer({ isOpen, cart, total, onClose, onCheckout, onUpdateQuantity, onRemove }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Carrito</h2>
              <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-xs text-stone-500">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-8 h-8 border-2 border-stone-800 rounded flex items-center justify-center font-bold cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-8 h-8 border-2 border-stone-800 rounded flex items-center justify-center font-bold cursor-pointer"
                    >
                      +
                    </button>
                    <button onClick={() => onRemove(item.id)} className="ml-2 text-red-500 cursor-pointer">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {cart.length === 0 && (
                <div className="text-center py-20 text-stone-400">
                  <ShoppingCart size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Tu carrito está vacío</p>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-stone-100">
              <div className="flex justify-between mb-4">
                <span className="font-bold">Total</span>
                <span className="font-bold text-xl">${total.toFixed(2)}</span>
              </div>
              <button
                disabled={cart.length === 0}
                onClick={onCheckout}
                className="w-full sketch-button py-3 text-lg disabled:opacity-50"
              >
                Confirmar Pedido
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
