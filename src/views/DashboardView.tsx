import { BarChart2, LogOut, Package, Pencil, Plus, Trash2, Upload, User as UserIcon, X, MapPin, Store } from 'lucide-react'
import { Product, User } from '../types'

type Props = {
  user: User
  products: Product[]
  logoImg: string
  dashboardView: 'products' | 'profile' | 'resume'
  onDashboardViewChange: (v: 'products' | 'profile' | 'resume') => void
  editProfileName: string
  editProfileLocation: string
  editProfileDesc: string
  onEditProfileNameChange: (v: string) => void
  onEditProfileLocationChange: (v: string) => void
  onEditProfileDescChange: (v: string) => void
  onUpdateProfile: (e: React.FormEvent) => void
  onLogout: () => void
  showNewProductForm: boolean
  onToggleNewProductForm: () => void
  editingProduct: Product | null
  onCancelEditing: () => void
  onStartEditing: (p: Product) => void
  onDeleteProduct: (id: string | number) => void
  onSubmitProduct: (e: React.FormEvent) => void
  categories: string[]
  npName: string
  npCategory: string
  npPrice: string
  npStock: string
  npUnit: string
  npImage: string
  npDesc: string
  isSearchingImage: boolean
  isUploadingImage: boolean
  onNpNameChange: (v: string) => void
  onNpCategoryChange: (v: string) => void
  onNpPriceChange: (v: string) => void
  onNpStockChange: (v: string) => void
  onNpUnitChange: (v: string) => void
  onNpImageChange: (v: string) => void
  onNpDescChange: (v: string) => void
  onFetchProductInfo: () => void
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function DashboardView({
  user,
  products,
  logoImg,
  dashboardView,
  onDashboardViewChange,
  editProfileName,
  editProfileLocation,
  editProfileDesc,
  onEditProfileNameChange,
  onEditProfileLocationChange,
  onEditProfileDescChange,
  onUpdateProfile,
  onLogout,
  showNewProductForm,
  onToggleNewProductForm,
  editingProduct,
  onCancelEditing,
  onStartEditing,
  onDeleteProduct,
  onSubmitProduct,
  categories,
  npName,
  npCategory,
  npPrice,
  npStock,
  npUnit,
  npImage,
  npDesc,
  isSearchingImage,
  isUploadingImage,
  onNpNameChange,
  onNpCategoryChange,
  onNpPriceChange,
  onNpStockChange,
  onNpUnitChange,
  onNpImageChange,
  onNpDescChange,
  onFetchProductInfo,
  onImageUpload
}: Props) {
  const producerProducts = products.filter((p) => p.producer_id === user.id)
  const totalStock = producerProducts.reduce((sum, p) => sum + p.stock, 0)

  return (
    <div className="bg-brand-cream min-h-screen pb-24 md:pb-0">
      <div className="md:hidden flex items-center justify-between p-4 bg-brand-cream sticky top-0 z-40 border-b-2 border-stone-800">
        <img src={logoImg} alt="DelHuerto" className="h-8 object-contain" />
        <h1 className="font-bold text-stone-800 text-lg font-serif">Mi Huerto</h1>
        <div className="w-10 h-10 rounded-full border-2 border-stone-800 bg-white overflow-hidden shrink-0 sketch-border">
          <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.email}`} alt={user.name} className="w-full h-full object-cover" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 md:py-12 flex flex-col md:flex-row gap-8">
        <aside className="hidden md:block w-full md:w-1/4 space-y-6">
          <div className="sketch-card bg-brand-sage/10 p-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white sketch-border shrink-0">
              <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.email}`} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-xl leading-tight">{user.name}</h3>
              <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">{user.location || 'Local'}</span>
            </div>
          </div>

          <nav className="sketch-card p-4 space-y-2">
            <button
              onClick={() => onDashboardViewChange('products')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${dashboardView === 'products' ? 'bg-brand-sage border-2 border-stone-800 text-stone-800' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-800'}`}
            >
              <Package size={20} /> Mis Productos
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-50 hover:text-stone-800 rounded-xl font-bold transition-colors">
              <Store size={20} /> Pedidos
              <span className="ml-auto bg-stone-200 text-stone-600 px-2 py-0.5 rounded-full text-xs">Próximamente</span>
            </button>
            <button
              onClick={() => onDashboardViewChange('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-colors ${dashboardView === 'profile' ? 'bg-brand-sage border-2 border-stone-800 text-stone-800' : 'text-stone-600 hover:bg-stone-50 hover:text-stone-800'}`}
            >
              <MapPin size={20} /> Editar Perfil
            </button>
          </nav>

          <div className="pt-4 border-t-2 border-dashed border-stone-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 border-2 border-transparent hover:border-red-500 rounded-xl font-bold transition-colors"
            >
              <LogOut size={20} /> Cerrar Sesión
            </button>
          </div>
        </aside>

        <section className="w-full md:w-3/4 space-y-8">
          {dashboardView === 'profile' && (
            <form onSubmit={onUpdateProfile} className="sketch-card bg-white p-8 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold font-serif text-stone-800">Perfil de la Huerta</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Nombre del Negocio o Granja</label>
                  <input
                    required
                    value={editProfileName}
                    onChange={(e) => onEditProfileNameChange(e.target.value)}
                    type="text"
                    className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 focus:border-stone-800 outline-none"
                    placeholder="Huerta La Esperanza"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Ubicación</label>
                  <input
                    required
                    value={editProfileLocation}
                    onChange={(e) => onEditProfileLocationChange(e.target.value)}
                    type="text"
                    className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 focus:border-stone-800 outline-none"
                    placeholder="Bogotá, Localidad de Usme"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Historia o Descripción</label>
                  <textarea
                    required
                    value={editProfileDesc}
                    onChange={(e) => onEditProfileDescChange(e.target.value)}
                    className="w-full h-32 px-4 py-3 bg-stone-50 border-2 border-stone-200 focus:border-stone-800 outline-none resize-none"
                    placeholder="Llevamos 3 generaciones cultivando sin químicos..."
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="sketch-button w-full py-4 !text-lg bg-stone-900 text-white border-2 border-stone-800 hover:bg-stone-800">
                Guardar Cambios
              </button>
              <div className="pt-8 block md:hidden">
                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full py-4 text-red-500 hover:bg-red-50 border-2 border-red-500 rounded-xl font-bold transition-colors sketch-border flex items-center justify-center gap-2"
                >
                  <LogOut size={20} /> Cerrar Sesión
                </button>
              </div>
            </form>
          )}

          {dashboardView === 'products' && (
            <>
              <div className="hidden md:flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white sketch-card p-8">
                <div>
                  <h2 className="text-3xl font-serif font-bold">Gestión de Inventario</h2>
                  <p className="text-stone-500 mt-1">Administra tus alimentos frescos a la venta.</p>
                </div>
                <button onClick={onToggleNewProductForm} className="sketch-button flex items-center gap-2 px-6">
                  <Plus size={20} /> {showNewProductForm ? 'Cerrar' : 'Nuevo Producto'}
                </button>
              </div>

              <div className="md:hidden py-2 mb-2">
                <button
                  onClick={onToggleNewProductForm}
                  className="w-full bg-[#4C7C3E] text-white py-4 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-2 sketch-border border-2 border-stone-800 shadow-[2px_4px_0_rgba(41,37,36,1)]"
                >
                  <Plus size={24} /> Añadir Producto
                </button>
              </div>

              {(showNewProductForm || editingProduct) && (
                <form onSubmit={onSubmitProduct} className="sketch-card bg-white p-8 space-y-6 relative">
                  <div className="absolute top-2 right-2 md:hidden">
                    <button type="button" onClick={onCancelEditing} className="p-2 text-stone-400 hover:text-stone-800">
                      <X size={24} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold font-serif text-stone-800">{editingProduct ? 'Editar Producto' : 'Detalles del Producto'}</h3>
                    {editingProduct && (
                      <button type="button" onClick={onCancelEditing} className="text-stone-500 hover:text-stone-800 font-bold text-sm underline">
                        Cancelar Edición
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Nombre del Alimento</label>
                      <div className="flex gap-2">
                        <input
                          required
                          value={npName}
                          onChange={(e) => onNpNameChange(e.target.value)}
                          type="text"
                          className="flex-grow px-4 py-3 bg-stone-50 border-2 border-stone-200 focus:border-stone-800 outline-none w-full"
                          placeholder="Ej. Tomates Cherry"
                        />
                        <button
                          type="button"
                          onClick={onFetchProductInfo}
                          disabled={isSearchingImage || !npName}
                          className="px-4 py-3 bg-brand-leaf text-white border-2 border-stone-800 font-bold hover:bg-green-700 transition-colors disabled:opacity-50 whitespace-nowrap outline-none flex items-center gap-2 sketch-button !py-2"
                        >
                          {isSearchingImage ? 'Buscando...' : 'Info Auto.'}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Categoría</label>
                      <select
                        value={npCategory}
                        onChange={(e) => onNpCategoryChange(e.target.value)}
                        className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 focus:border-stone-800 outline-none"
                      >
                        {categories.filter((c) => c !== 'Todos').map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Precio</label>
                      <input
                        required
                        value={npPrice}
                        onChange={(e) => onNpPriceChange(e.target.value)}
                        type="number"
                        step="0.01"
                        className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 focus:border-stone-800 outline-none"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="w-2/3 space-y-2">
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Stock Disponible</label>
                        <input
                          required
                          value={npStock}
                          onChange={(e) => onNpStockChange(e.target.value)}
                          type="number"
                          className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 focus:border-stone-800 outline-none"
                          placeholder="10"
                        />
                      </div>
                      <div className="w-1/3 space-y-2">
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Unidad</label>
                        <select
                          value={npUnit}
                          onChange={(e) => onNpUnitChange(e.target.value)}
                          className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 focus:border-stone-800 outline-none"
                        >
                          <option value="kg">kg</option>
                          <option value="unidades">uds</option>
                          <option value="latas">latas</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Imagen (Sube una foto o busca Info Auto.)</label>
                    <div className="flex gap-4 items-center">
                      <div className="w-16 h-16 rounded-xl overflow-hidden sketch-border shrink-0 bg-stone-100 relative">
                        {isUploadingImage ? (
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-stone-400 font-bold bg-white text-center leading-none p-1">
                            CARGANDO...
                          </span>
                        ) : npImage ? (
                          <img src={npImage} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] text-stone-400 font-bold">VACÍO</span>
                        )}
                      </div>
                      <div className="flex-grow space-y-2">
                        <input
                          value={npImage}
                          onChange={(e) => onNpImageChange(e.target.value)}
                          type="text"
                          className="w-full px-4 py-3 bg-stone-50 border-2 border-stone-200 focus:border-stone-800 outline-none text-sm"
                          placeholder="URL de imagen"
                        />
                        <label className="sketch-button flex items-center justify-center gap-2 cursor-pointer !py-2 !text-sm w-full bg-stone-100 hover:bg-stone-200">
                          <Upload size={16} /> Subir desde tu equipo
                          <input type="file" accept="image/*" className="hidden" onChange={onImageUpload} />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Descripción</label>
                    <textarea
                      required
                      value={npDesc}
                      onChange={(e) => onNpDescChange(e.target.value)}
                      className="w-full h-32 px-4 py-3 bg-stone-50 border-2 border-stone-200 focus:border-stone-800 outline-none resize-none"
                      placeholder="Describe cómo cultivaste o preparaste este producto..."
                    ></textarea>
                  </div>

                  <button type="submit" className="sketch-button w-full py-4 !text-lg bg-[#4C7C3E] text-white border-2 border-stone-800 hover:bg-[#3d6332]">
                    {editingProduct ? 'Actualizar Producto' : 'Guardar y Publicar'}
                  </button>
                </form>
              )}

              {producerProducts.length > 0 && (
                <div className="space-y-4 pt-4 md:pt-4">
                  <h3 className="hidden md:block text-xl font-bold font-serif text-stone-800 mb-6">Tus Productos (Catálogo Actual)</h3>
                  <div className="flex flex-col gap-3">
                    {producerProducts.map((p) => (
                      <div
                        key={p.id}
                        className={`sketch-card flex items-stretch bg-stone-50 border-2 border-stone-800 rounded-xl relative overflow-hidden ${p.isActive === false ? 'opacity-60 grayscale' : ''}`}
                      >
                        <div className="w-[100px] md:w-32 bg-stone-200 border-r-2 border-stone-800 shrink-0">
                          <img src={p.image_url || `https://picsum.photos/seed/${p.id}/200/200`} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-3 md:p-4 flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-stone-800 text-sm md:text-xl leading-tight md:mb-1">
                              {p.name} - ${p.price.toFixed(2)}/{p.unit}
                            </h4>
                            <p className="text-stone-600 text-[11px] md:text-sm mt-1">
                              Stock: {p.stock} {p.unit}
                            </p>
                          </div>
                          <div className="self-end flex items-center gap-3 mt-2 md:mt-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                onStartEditing(p)
                              }}
                              title="Editar producto"
                              className="text-green-700 hover:text-green-800 transition-colors"
                            >
                              <Pencil size={18} fill="currentColor" strokeWidth={1} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                onDeleteProduct(p.id)
                              }}
                              title="Eliminar definitivamente"
                              className="text-red-600 hover:text-red-700 transition-colors"
                            >
                              <Trash2 size={18} fill="currentColor" strokeWidth={1} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {dashboardView !== 'products' && dashboardView !== 'profile' && (
            <>
              <div className="md:hidden pt-4 pb-6">
                <h2 className="text-3xl font-serif font-bold text-stone-800">Resumen y Estadísticas</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="sketch-card bg-amber-50 p-6 flex flex-col border-dashed">
                  <span className="text-stone-500 font-bold uppercase tracking-widest text-xs mb-2">Total Productos</span>
                  <span className="text-4xl font-serif font-bold text-stone-800">{producerProducts.length}</span>
                </div>
                <div className="sketch-card bg-green-50 p-6 flex flex-col border-dashed border-green-800">
                  <span className="text-green-800 font-bold uppercase tracking-widest text-xs mb-2">Unidades Totales</span>
                  <span className="text-4xl font-serif font-bold text-green-900">{totalStock}</span>
                </div>
              </div>
            </>
          )}
        </section>
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-stone-800 flex justify-around p-3 z-50 !rounded-t-[32px] sketch-border shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => onDashboardViewChange('resume')}
          className={`flex flex-col items-center gap-1 w-1/3 transition-colors ${dashboardView === 'resume' ? 'text-[#4C7C3E]' : 'text-stone-500'}`}
        >
          <BarChart2 size={24} />
          <span className="text-[10px] font-bold">Resumen</span>
        </button>
        <button
          onClick={() => onDashboardViewChange('products')}
          className={`flex flex-col items-center gap-1 w-1/3 transition-colors ${dashboardView === 'products' ? 'text-[#4C7C3E]' : 'text-stone-500'}`}
        >
          <Package size={24} />
          <span className="text-[10px] font-bold">Inventario</span>
        </button>
        <button
          onClick={() => onDashboardViewChange('profile')}
          className={`flex flex-col items-center gap-1 w-1/3 transition-colors ${dashboardView === 'profile' ? 'text-[#4C7C3E]' : 'text-stone-500'}`}
        >
          <UserIcon size={24} />
          <span className="text-[10px] font-bold">Perfil</span>
        </button>
      </div>
    </div>
  )
}

