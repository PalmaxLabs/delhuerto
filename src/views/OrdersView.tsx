import { ArrowLeft, ShoppingBasket } from 'lucide-react'

type Props = {
  orders: any[]
  onBackToMarket: () => void
}

export function OrdersView({ orders, onBackToMarket }: Props) {
  return (
    <main className="flex-grow max-w-4xl mx-auto w-full px-4 py-8 space-y-8">
      <button onClick={onBackToMarket} className="text-stone-500 hover:text-stone-800 flex items-center gap-2 font-bold mb-4">
        <ArrowLeft size={20} /> Volver al catálogo
      </button>
      <div>
        <h2 className="text-4xl font-serif font-bold text-stone-800">Mis Pedidos</h2>
        <p className="text-stone-500 mt-2">Historial de las cosechas que has comprado directamente.</p>
      </div>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="sketch-card text-center py-24 bg-white">
            <ShoppingBasket size={64} className="mx-auto text-stone-200 mb-6" />
            <h3 className="text-2xl font-bold text-stone-800 mb-2">Aún no tienes pedidos</h3>
            <p className="text-stone-500 max-w-sm mx-auto mb-8">Empieza a apoyar al campo local comprando directo al productor.</p>
            <button onClick={onBackToMarket} className="sketch-button">
              Explorar el catálogo
            </button>
          </div>
        ) : (
          orders.map((order, idx) => (
            <div key={idx} className="sketch-card bg-white p-6 md:p-8 relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b-2 border-dashed border-stone-200">
                <div>
                  <p className="text-sm font-bold text-stone-400">Pedido #{order.id}</p>
                  <p className="font-bold text-stone-800">
                    {new Date(order.created_at).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest border border-amber-200">
                    {order.status === 'pending' ? 'En Preparación' : order.status}
                  </span>
                  <span className="text-2xl font-bold text-brand-leaf">${order.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-stone-800">Artículos Comprados:</h4>
                {order.items?.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center text-stone-600 bg-stone-50 p-4 rounded-xl border border-stone-200">
                    <span className="font-medium">
                      {item.quantity}x {item.name}
                    </span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  )
}

