import { motion } from 'motion/react'
import { CheckCircle2, ChevronRight, MapPin, Search, ShoppingBasket, ShoppingCart, User as UserIcon } from 'lucide-react'
import { Product, User } from '../types'
import { ProductCard } from '../components/ProductCard'
import { Footer } from '../components/Footer'

type Props = {
  user: User | null
  products: Product[]
  producerCache: Record<string, User>
  gifImg: string
  farmerImg: string
  familyImg: string
  setView: (v: any) => void
  onGoMarket: () => void
  onGoRegister: () => void
  onUpgradeRole: () => void
  onGoDashboard: () => void
  onSelectProduct: (p: Product) => void
  onSelectProducer: (id: string | number) => void
  onAddToCart: (p: Product) => void
  onOpenCart: () => void
}

export function LandingView({
  user,
  products,
  producerCache,
  gifImg,
  farmerImg,
  familyImg,
  setView,
  onGoMarket,
  onGoRegister,
  onUpgradeRole,
  onGoDashboard,
  onSelectProduct,
  onSelectProducer,
  onAddToCart,
  onOpenCart
}: Props) {
  const featured = products.filter((p) => p.isActive !== false).slice(0, 4)

  return (
    <div className="flex flex-col">
      <section className="max-w-7xl mx-auto w-full px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center relative overflow-hidden md:overflow-visible">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 z-10">
          <h1 className="text-6xl md:text-7xl font-serif font-bold text-stone-800 leading-tight">
            Alimentos <span className="text-brand-leaf italic">reales</span> de manos locales.
          </h1>
          <p className="text-xl text-stone-600 max-w-lg leading-relaxed">
            Conectamos a pequeños productores con personas que buscan frescura, calidad y un impacto positivo en su comunidad.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={onGoMarket} className="sketch-button relative overflow-hidden group">
              <span className="relative z-10">Empezar a comprar</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </button>
            <button
              onClick={() => {
                if (user) {
                  if (user.role === 'producer') onGoDashboard()
                  else onUpgradeRole()
                } else {
                  onGoRegister()
                }
              }}
              className="sketch-button-outline relative overflow-hidden group"
            >
              <span className="relative z-10">{user?.role === 'producer' ? 'Mi Panel' : 'Soy productor'}</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
            </button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10">
          <div className="absolute -top-20 -right-20 w-[120%] h-[140%] bg-stone-200/50 -rotate-3 rounded-3xl -z-10 hidden md:block"></div>
          <div className="relative bg-white p-4 sketch-border shadow-2xl rotate-1">
            <div className="aspect-video bg-stone-100 overflow-hidden border-2 border-stone-800 rounded-sm">
              <img
                src={gifImg}
                alt="DelHuerto Animación"
                className="w-full h-full object-cover"
                loading="eager"
                fetchPriority="high"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -inset-2 border-4 border-stone-800 rounded-lg pointer-events-none opacity-20"></div>
          </div>
          <div className="absolute -bottom-10 -right-6 sketch-card rotate-3 bg-white p-4 hidden md:block shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-leaf rounded-full flex items-center justify-center text-white">
                <CheckCircle2 size={20} />
              </div>
              <span className="font-bold text-stone-800">100% Orgánico</span>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-4 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="section-title">Cosecha del día</h2>
            <p className="text-stone-500">Productos frescos que acaban de llegar de la huerta.</p>
          </div>
          <button onClick={onGoMarket} className="text-brand-leaf font-bold flex items-center gap-2 hover:underline">
            Ver todo el mercado <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              producerImage={producerCache[product.producer_id.toString()]?.image_url}
              onAddToCart={(p) => {
                onAddToCart(p)
                onOpenCart()
              }}
              onViewProducer={(id) => onSelectProducer(id)}
              onClickProduct={(p) => onSelectProduct(p)}
            />
          ))}
        </div>
      </section>

      <section className="bg-brand-sage/15 py-24 rounded-[60px] md:rounded-[100px] my-12 mx-4 shadow-[inset_0_12px_48px_rgba(0,0,0,0.08)] border-2 border-stone-800/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="section-title">Nuestra Misión</h2>
          <p className="text-stone-500 mb-12 max-w-2xl mx-auto">
            Trabajamos bajo los Objetivos de Desarrollo Sostenible para transformar la forma en que consumimos.
          </p>
          <div className="flex flex-wrap gap-12 justify-center">
            <motion.div whileHover={{ y: -10 }} className="ods-circle cursor-pointer">
              <ShoppingBasket size={40} className="text-amber-600 mb-2" />
              Soberanía Alimentaria
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="ods-circle cursor-pointer">
              <CheckCircle2 size={40} className="text-green-600 mb-2" />
              Sostenibilidad Ambiental
            </motion.div>
            <motion.div whileHover={{ y: -10 }} className="ods-circle cursor-pointer">
              <UserIcon size={40} className="text-blue-600 mb-2" />
              Reducción de Desigualdades
            </motion.div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-4 py-32 relative overflow-hidden">
        <div className="text-center mb-20">
          <h2 className="section-title">¿Cómo funciona?</h2>
          <p className="text-stone-500 max-w-xl mx-auto">
            Tres simples pasos para transformar tu alimentación y apoyar al campo local.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dashed border-stone-300 -z-10 hidden md:block"></div>
          {[
            {
              step: '01',
              title: 'Explora',
              desc: 'Descubre productos frescos cultivados cerca de ti por productores locales.',
              icon: <Search size={32} className="text-brand-leaf" />
            },
            {
              step: '02',
              title: 'Pide',
              desc: 'Añade lo que necesites a tu carrito y confirma tu pedido directamente.',
              icon: <ShoppingCart size={32} className="text-brand-leaf" />
            },
            {
              step: '03',
              title: 'Recibe',
              desc: 'Coordina la entrega y paga directamente al productor al recibir tus productos.',
              icon: <MapPin size={32} className="text-brand-leaf" />
            }
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="sketch-card relative pt-16 bg-white cursor-pointer">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-brand-sage sketch-border flex items-center justify-center text-3xl font-bold shadow-lg">
                {item.step}
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-stone-50 rounded-full border-2 border-stone-800/10">{item.icon}</div>
                <h3 className="text-2xl font-bold text-stone-800">{item.title}</h3>
                <p className="text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto w-full px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Productores Locales', value: '+120' },
            { label: 'Alimentos Frescos', value: '+3K' },
            { label: 'Familias Felices', value: '+500' },
            { label: 'Emisiones Reducidas', value: '30%' }
          ].map((stat, i) => (
            <div key={i} className="sketch-card bg-brand-cream border-dashed text-center py-8 cursor-default">
              <h3 className="text-4xl text-stone-800 font-serif font-black mb-1">{stat.value}</h3>
              <p className="text-stone-500 font-bold uppercase tracking-widest text-[10px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-sage/10 py-32 rounded-t-[60px] md:rounded-t-[100px] border-t-2 border-stone-800/10 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="section-title">Lo que dicen en la comunidad</h2>
            <p className="text-stone-600 max-w-xl mx-auto text-lg mt-4">
              Nuestra plataforma no sólo reparte vegetales, reparte confianza y calidad de vida. Conoce las historias de nuestra gente.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Elena R.',
                role: 'Consumidora Consciente',
                img: 10,
                quote:
                  'Desde que uso DelHuerto, mi familia come mejor y sé exactamente de dónde viene cada fruta. El sabor de los tomates de Doña Luz es inigualable, un verdadero regreso a lo natural.'
              },
              {
                name: 'Carlos M.',
                role: 'Chef Local',
                img: 14,
                quote:
                  'Como dueño de un pequeño restaurante, buscar ingredientes frescos dictaba mi horario. Ahora recibo lo mejor directo de la tierra. Recomiendo increíblemente la plataforma.'
              },
              {
                name: 'Familia C.',
                role: 'Productores de Papa',
                img: 30,
                quote:
                  'Llevamos tres generaciones cultivando. Antes nos compraban muy barato los revendedores. DelHuerto conectó nuestro trabajo con familias que lo aprecian pagando el valor justo.'
              }
            ].map((t, i) => (
              <div
                key={i}
                className={`sketch-card bg-white p-8 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 ${i === 1 ? 'md:-translate-y-6' : ''}`}
              >
                <div className="space-y-4">
                  <span className="text-4xl text-brand-leaf font-serif opacity-30">"</span>
                  <p className="text-stone-700 italic font-medium leading-relaxed">{t.quote}</p>
                </div>
                <div className="mt-8 pt-6 border-t-2 border-dashed border-stone-200 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-stone-800 sketch-border bg-stone-100">
                    <img src={`https://picsum.photos/seed/${t.img}/100/100`} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-800 block leading-tight">{t.name}</span>
                    <span className="text-xs text-stone-500 font-bold uppercase tracking-widest">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-stone-900 border-t-4 border-stone-800 text-white pb-32 pt-24 rounded-t-[60px] md:rounded-t-[100px] -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block bg-brand-leaf/20 text-brand-leaf px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase outline outline-1 outline-brand-leaf/30">
              Únete Hoy Mismo
            </div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
              Siembra tu futuro, <br />
              <span className="italic font-light">cosecha el cambio.</span>
            </h2>
            <p className="text-lg text-stone-400 max-w-md">
              Llega a más clientes, gestiona tus pedidos fácilmente o empieza a alimentarte mejor hoy. Nuestra red te está esperando.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={onGoMarket}
                className="sketch-button bg-brand-leaf border-brand-leaf text-stone-900 hover:bg-white transition-colors cursor-pointer"
              >
                Ver el Mercado
              </button>
              <button
                onClick={onGoRegister}
                className="sketch-button-outline !text-white !border-white hover:!bg-white hover:!text-stone-900 transition-colors cursor-pointer"
              >
                Ver Catálogo
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 relative">
            <div className="sketch-card overflow-hidden bg-brand-sage shrink-0 border-white rotate-2 p-2 cursor-pointer">
              <img src={farmerImg} className="w-full aspect-[4/5] object-cover rounded-sm" alt="Granjero" />
            </div>
            <div className="sketch-card overflow-hidden bg-white shrink-0 -rotate-2 p-2 mt-8 border-stone-800 cursor-pointer">
              <img src={familyImg} className="w-full aspect-[4/5] object-cover rounded-sm" alt="Familia" />
            </div>
          </div>
        </div>
      </section>

      <Footer setView={setView} />
    </div>
  )
}

