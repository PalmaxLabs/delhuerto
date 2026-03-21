import React, { useEffect, useMemo, useState } from 'react'
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, db, googleProvider, storage } from '../lib/firebase'
import { CartItem, Product, User } from '../types'
import { CartDrawer } from '../components/CartDrawer'
import { CustomModal } from '../components/CustomModal'
import { Navbar } from '../components/Navbar'
import { AuthView } from '../views/AuthView'
import { DashboardView } from '../views/DashboardView'
import { LandingView } from '../views/LandingView'
import { MarketView } from '../views/MarketView'
import { OrdersView } from '../views/OrdersView'
import { ProducerProfileView } from '../views/ProducerProfileView'
import { ProductView } from '../views/ProductView'
import gifImg from '../assets/images/delhuerto.gif'
import familyImg from '../assets/images/family.png'
import farmerImg from '../assets/images/farmer.png'
import logoImg from '../assets/images/logo.png'

type View = 'landing' | 'login' | 'register' | 'market' | 'dashboard' | 'producer-profile' | 'orders' | 'product'

export default function AppShell() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoaded, setAuthLoaded] = useState(false)
  const [view, setView] = useState<View>('landing')
  const [selectedProducerId, setSelectedProducerId] = useState<string | number | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('Todos')
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userOrders, setUserOrders] = useState<any[]>([])
  const [dashboardView, setDashboardView] = useState<'products' | 'profile' | 'resume'>('products')
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [producerCache, setProducerCache] = useState<Record<string, User>>({})

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean
    title?: string
    message: string
    type: 'alert' | 'confirm' | 'success' | 'error'
    onConfirm: () => void
    onCancel?: () => void
  }>({
    isOpen: false,
    message: '',
    type: 'alert',
    onConfirm: () => {}
  })

  const showAlert = (message: string, type: 'alert' | 'success' | 'error' = 'alert', title?: string) => {
    return new Promise<void>((resolve) => {
      setModalConfig({
        isOpen: true,
        title: title || (type === 'error' ? 'Error' : type === 'success' ? 'Éxito' : 'Atención'),
        message,
        type,
        onConfirm: () => {
          setModalConfig((prev) => ({ ...prev, isOpen: false }))
          resolve()
        }
      })
    })
  }

  const showConfirm = (message: string, title: string = 'Confirmar') => {
    return new Promise<boolean>((resolve) => {
      setModalConfig({
        isOpen: true,
        title,
        message,
        type: 'confirm',
        onConfirm: () => {
          setModalConfig((prev) => ({ ...prev, isOpen: false }))
          resolve(true)
        },
        onCancel: () => {
          setModalConfig((prev) => ({ ...prev, isOpen: false }))
          resolve(false)
        }
      })
    })
  }

  const [editProfileName, setEditProfileName] = useState('')
  const [editProfileLocation, setEditProfileLocation] = useState('')
  const [editProfileDesc, setEditProfileDesc] = useState('')

  const [showNewProductForm, setShowNewProductForm] = useState(false)
  const [npName, setNpName] = useState('')
  const [npPrice, setNpPrice] = useState('')
  const [npStock, setNpStock] = useState('')
  const [npCategory, setNpCategory] = useState('Verduras')
  const [npUnit, setNpUnit] = useState('kg')
  const [npDesc, setNpDesc] = useState('')
  const [npImage, setNpImage] = useState('')
  const [isSearchingImage, setIsSearchingImage] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const [authEmail, setAuthEmail] = useState('')
  const [authPassword, setAuthPassword] = useState('')
  const [authName, setAuthName] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const path =
      view === 'market' ? '/catalogo'
      : view === 'login' ? '/login'
      : view === 'register' ? '/registro'
      : view === 'dashboard' ? '/panel-productor'
      : view === 'orders' ? '/mis-pedidos'
      : view === 'product' ? (selectedProduct ? `/producto/${selectedProduct.id}` : '/catalogo')
      : view === 'producer-profile' ? (selectedProducerId ? `/productor/${selectedProducerId}` : '/catalogo')
      : '/'

    if (window.location.pathname !== path) {
      window.history.pushState({ view, selectedProducerId, selectedProduct }, '', path)
    }

    window.scrollTo(0, 0)
  }, [view, selectedProduct, selectedProducerId])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state
      if (state) {
        if (state.view) setView(state.view)
        if (state.selectedProducerId) setSelectedProducerId(state.selectedProducerId)
        if (state.selectedProduct) setSelectedProduct(state.selectedProduct)
        return
      }

      const p = window.location.pathname
      if (p === '/catalogo') setView('market')
      else if (p === '/login') setView('login')
      else if (p === '/registro') setView('register')
      else if (p === '/mis-pedidos') setView('orders')
      else if (p.startsWith('/producto/')) setView('product')
      else if (p.startsWith('/productor/')) {
        const id = p.split('/').pop()
        if (id) {
          setSelectedProducerId(id)
          setView('producer-profile')
        }
      } else if (p === '/panel-productor') {
        setView('dashboard')
      } else setView('landing')
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const uniqueProducerIds = Array.from(new Set(products.map((p) => p.producer_id.toString())))
    const idsToFetch = uniqueProducerIds.filter((id) => !producerCache[id])

    if (idsToFetch.length > 0) {
      idsToFetch.forEach(async (id) => {
        try {
          const docSnap = await getDoc(doc(db, 'users', id))
          if (docSnap.exists()) {
            setProducerCache((prev) => ({
              ...prev,
              [id]: { id: docSnap.id, ...docSnap.data() } as User
            }))
          }
        } catch (e) {
          console.error(`Error fetching producer ${id}`, e)
        }
      })
    }
  }, [products, producerCache])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if ((view === 'product' && selectedProduct) || (view === 'producer-profile' && selectedProducerId)) {
      const producerId = (view === 'product' ? selectedProduct?.producer_id : selectedProducerId)?.toString()
      if (producerId && !producerCache[producerId]) {
        const fetchProducer = async () => {
          try {
            const docSnap = await getDoc(doc(db, 'users', producerId))
            if (docSnap.exists()) {
              setProducerCache((prev) => ({
                ...prev,
                [producerId]: { id: docSnap.id, ...docSnap.data() } as User
              }))
            }
          } catch (e) {
            console.error('Error fetching producer for view', e)
          }
        }
        fetchProducer()
      }
    }
  }, [view, selectedProduct, selectedProducerId, producerCache])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (view === 'orders' && user) {
      const fetchOrders = async () => {
        try {
          const q = query(collection(db, 'orders'), where('consumer_id', '==', user.id), orderBy('created_at', 'desc'))
          const querySnapshot = await getDocs(q)
          const ordersData = await Promise.all(
            querySnapshot.docs.map(async (d) => {
              const data = d.data()
              return { id: d.id, ...data }
            })
          )
          setUserOrders(ordersData)
        } catch (e) {
          console.error('Error fetching orders', e)
        }
      }
      fetchOrders()
    }
  }, [view, user])

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'))
      const fbProducts = querySnapshot.docs.map((d) => ({ id: d.id, ...d.data() }) as unknown as Product)
      setProducts(fbProducts)
    } catch (fbErr) {
      console.warn('Could not fetch firebase products', fbErr)
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (userDoc.exists()) {
            const data = userDoc.data()
            setUser({
              id: firebaseUser.uid,
              name: data.name || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
              email: firebaseUser.email || '',
              role: data.role || 'consumer',
              location: data.location || 'Bogotá',
              description: data.description || '',
              image_url: data.image_url || ''
            })
          } else {
            const localRole = localStorage.getItem(`role_${firebaseUser.uid}`) as 'producer' | 'consumer' | null
            setUser({
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
              email: firebaseUser.email || '',
              role: localRole || 'consumer',
              location: 'Bogotá'
            })
          }
        } catch (e) {
          console.error('Error fetching user role', e)
        }
      } else {
        setUser(null)
      }
      setAuthLoaded(true)
      fetchProducts()
    })

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      unsubscribe()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!authLoaded) return
    if (view === 'orders' && (!user || user.role !== 'consumer')) setView('landing')
    if (view === 'dashboard' && (!user || user.role !== 'producer')) setView('market')
    if (view === 'product' && !selectedProduct) setView('market')
    if (view === 'producer-profile' && !selectedProducerId) setView('market')
  }, [authLoaded, user, view, selectedProduct, selectedProducerId])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (user) {
      setEditProfileName(user.name || '')
      setEditProfileLocation(user.location || '')
      setEditProfileDesc(user.description || '')
    }
  }, [user])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const cred = await signInWithEmailAndPassword(auth, authEmail, authPassword)
      try {
        const docSnap = await getDoc(doc(db, 'users', cred.user.uid))
        if (docSnap.exists()) setView(docSnap.data().role === 'producer' ? 'dashboard' : 'market')
        else setView('market')
      } catch {
        const localRole = localStorage.getItem(`role_${cred.user.uid}`)
        setView(localRole === 'producer' ? 'dashboard' : 'market')
      }
    } catch (error: any) {
      showAlert('Error al entrar: ' + error.message, 'error')
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const userRef = doc(db, 'users', result.user.uid)
      try {
        const userDoc = await getDoc(userRef)
        if (!userDoc.exists()) {
          const newUserData = {
            name: result.user.displayName || result.user.email?.split('@')[0] || 'Usuario',
            email: result.user.email || '',
            role: 'consumer',
            location: 'Bogotá'
          }
          await setDoc(userRef, newUserData)
          setView('market')
        } else {
          setView(userDoc.data().role === 'producer' ? 'dashboard' : 'market')
        }
      } catch {
        const localRole = localStorage.getItem(`role_${result.user.uid}`)
        setView(localRole === 'producer' ? 'dashboard' : 'market')
      }
    } catch (error: any) {
      showAlert('Error con Google: ' + error.message, 'error')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, authEmail, authPassword)
      const newUserData = {
        name: authName || authEmail.split('@')[0],
        email: authEmail,
        role: 'consumer',
        location: 'Bogotá'
      }
      await setDoc(doc(db, 'users', userCredential.user.uid), newUserData)
      setUser({ id: userCredential.user.uid, ...newUserData } as User)
      setView('market')
    } catch (error: any) {
      showAlert('Error al registrarse: ' + error.message, 'error')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setView('landing')
    } catch (error: any) {
      console.error('Error logging out', error)
    }
  }

  const handleUpgradeRole = async () => {
    if (!user) {
      setView('login')
      return
    }
    try {
      await updateDoc(doc(db, 'users', user.id.toString()), { role: 'producer' })
      const updatedUser = { ...user, role: 'producer' as const }
      setUser(updatedUser)
      setView('dashboard')
      showAlert('¡Felicidades! Ahora tienes tu huerto habilitado.', 'success')
    } catch (e: any) {
      showAlert('Error al actualizar rol: ' + e.message, 'error')
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    try {
      await updateDoc(doc(db, 'users', user.id.toString()), {
        name: editProfileName,
        location: editProfileLocation,
        description: editProfileDesc
      })
      setUser({ ...user, name: editProfileName, location: editProfileLocation, description: editProfileDesc })
      showAlert('Perfil actualizado correctamente', 'success')
    } catch (error: any) {
      showAlert('Error al actualizar perfil: ' + error.message, 'error')
    }
  }

  const handleFetchProductInfo = async () => {
    if (!npName) return
    setIsSearchingImage(true)
    try {
      const res = await fetch(
        `https://es.wikipedia.org/w/api.php?action=query&prop=pageimages|extracts&exintro=1&explaintext=1&redirects=1&titles=${encodeURIComponent(npName)}&format=json&pithumbsize=600&origin=*`
      )
      const data = await res.json()
      const pages = data.query?.pages
      if (pages) {
        const pageId = Object.keys(pages)[0]
        const page = pages[pageId]
        if (page.thumbnail?.source) setNpImage(page.thumbnail.source)
        if (page.extract && !npDesc) setNpDesc(page.extract.split('.')[0] + '.')
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsSearchingImage(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploadingImage(true)
    try {
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setNpImage(url)
    } catch (error: any) {
      showAlert('Error al subir la imagen: ' + error.message, 'error')
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleDeleteProduct = async (productId: string | number) => {
    const confirmed = await showConfirm('¿Seguro que deseas eliminar definitivamente este producto?')
    if (!confirmed) return
    try {
      await deleteDoc(doc(db, 'products', productId.toString()))
      fetchProducts()
    } catch (e: any) {
      showAlert('Error al eliminar producto: ' + e.message, 'error')
    }
  }

  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    try {
      if (editingProduct) {
        const productRef = doc(db, 'products', editingProduct.id.toString())
        await updateDoc(productRef, {
          name: npName,
          price: parseFloat(npPrice),
          stock: parseInt(npStock),
          unit: npUnit,
          category: npCategory,
          description: npDesc,
          image_url: npImage
        })
        setEditingProduct(null)
      } else {
        const newProduct = {
          producer_id: user.id,
          producer_name: user.name,
          producer_location: user.location,
          name: npName,
          price: parseFloat(npPrice),
          stock: parseInt(npStock),
          unit: npUnit,
          category: npCategory,
          description: npDesc,
          isActive: true,
          image_url: npImage || `https://picsum.photos/seed/${Date.now()}/600/600`
        }
        await addDoc(collection(db, 'products'), newProduct)
      }
      setShowNewProductForm(false)
      setNpName('')
      setNpPrice('')
      setNpStock('')
      setNpDesc('')
      setNpImage('')
      fetchProducts()
    } catch (e: any) {
      showAlert('Error al guardar en Firebase: ' + e.message, 'error')
    }
  }

  const handleEditProductClick = (p: Product) => {
    setEditingProduct(p)
    setNpName(p.name)
    setNpPrice(p.price.toString())
    setNpStock(p.stock.toString())
    setNpCategory(p.category || 'Verduras')
    setNpUnit(p.unit)
    setNpDesc(p.description || '')
    setNpImage(p.image_url || '')
    setDashboardView('products')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = async (id: string | number) => {
    const confirmed = await showConfirm('¿Estás seguro de que quieres quitar este producto de tu carrito?', '¿Eliminar producto?')
    if (confirmed) setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateCartQuantity = (id: string | number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, Math.min(item.stock, item.quantity + delta))
          return { ...item, quantity: newQty }
        }
        return item
      })
    )
  }

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart])

  const checkout = async () => {
    if (!user) {
      setView('login')
      return
    }
    try {
      await addDoc(collection(db, 'orders'), {
        consumer_id: user.id,
        items: cart,
        total: cartTotal,
        status: 'pending',
        created_at: new Date().toISOString()
      })
      const promises = cart.map((item) => {
        const productRef = doc(db, 'products', item.id.toString())
        return updateDoc(productRef, { stock: Math.max(0, item.stock - item.quantity) })
      })
      await Promise.all(promises)
      setCart([])
      setIsCartOpen(false)
      setOrderSuccess(true)
      fetchProducts()
      setTimeout(() => setOrderSuccess(false), 5000)
    } catch (e) {
      console.error('Error order', e)
      showAlert('Hubo un error al procesar tu pedido', 'error')
    }
  }

  const filteredProducts = products.filter((p) => {
    if (p.isActive === false) return false
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.producer_name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'Todos' || p.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const categories = useMemo(() => {
    const cats = products.map((p) => p.category).filter((c): c is string => !!c)
    return ['Todos', ...Array.from(new Set(cats)).filter((c) => c !== 'Todos')]
  }, [products])

  let content: React.ReactNode = null

  if (view === 'landing') {
    content = (
      <LandingView
        user={user}
        products={products}
        producerCache={producerCache}
        gifImg={gifImg}
        farmerImg={farmerImg}
        familyImg={familyImg}
        setView={setView}
        onGoMarket={() => setView('market')}
        onGoRegister={() => setView('register')}
        onUpgradeRole={handleUpgradeRole}
        onGoDashboard={() => setView('dashboard')}
        onSelectProduct={(p) => {
          setSelectedProduct(p)
          setView('product')
        }}
        onSelectProducer={(id) => {
          setSelectedProducerId(id)
          setView('producer-profile')
        }}
        onAddToCart={addToCart}
        onOpenCart={() => setIsCartOpen(true)}
      />
    )
  } else if (view === 'product' && selectedProduct) {
    content = (
      <ProductView
        user={user}
        product={selectedProduct}
        producer={producerCache[selectedProduct.producer_id.toString()]}
        onAddToCart={addToCart}
        onOpenCart={() => setIsCartOpen(true)}
        onViewProducer={(id) => {
          setSelectedProducerId(id)
          setView('producer-profile')
        }}
      />
    )
  } else if (view === 'market') {
    content = (
      <MarketView
        orderSuccess={orderSuccess}
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        categories={categories}
        filteredProducts={filteredProducts}
        producerCache={producerCache}
        onSearchTermChange={setSearchTerm}
        onCategoryChange={setCategoryFilter}
        onAddToCart={addToCart}
        onViewProducer={(id) => {
          setSelectedProducerId(id)
          setView('producer-profile')
        }}
        onClickProduct={(p) => {
          setSelectedProduct(p)
          setView('product')
        }}
      />
    )
  } else if (view === 'login' || view === 'register') {
    content = (
      <AuthView
        mode={view}
        email={authEmail}
        password={authPassword}
        name={authName}
        onEmailChange={setAuthEmail}
        onPasswordChange={setAuthPassword}
        onNameChange={setAuthName}
        onSubmit={view === 'login' ? handleLogin : handleRegister}
        onGoogleLogin={handleGoogleLogin}
        onBack={() => setView('landing')}
        onToggleMode={() => setView(view === 'login' ? 'register' : 'login')}
      />
    )
  } else if (view === 'orders') {
    content = !user || user.role !== 'consumer' ? null : <OrdersView orders={userOrders} onBackToMarket={() => setView('market')} />
  } else if (view === 'dashboard') {
    content =
      !user || user.role !== 'producer'
        ? null
        : (
            <DashboardView
              user={user}
              products={products}
              logoImg={logoImg}
              dashboardView={dashboardView}
              onDashboardViewChange={setDashboardView}
              editProfileName={editProfileName}
              editProfileLocation={editProfileLocation}
              editProfileDesc={editProfileDesc}
              onEditProfileNameChange={setEditProfileName}
              onEditProfileLocationChange={setEditProfileLocation}
              onEditProfileDescChange={setEditProfileDesc}
              onUpdateProfile={handleUpdateProfile}
              onLogout={handleLogout}
              showNewProductForm={showNewProductForm}
              onToggleNewProductForm={() => setShowNewProductForm((v) => !v)}
              editingProduct={editingProduct}
              onCancelEditing={() => {
                setShowNewProductForm(false)
                setEditingProduct(null)
                setNpName('')
                setNpPrice('')
                setNpStock('')
                setNpDesc('')
                setNpImage('')
              }}
              onStartEditing={(p) => {
                setShowNewProductForm(true)
                handleEditProductClick(p)
              }}
              onDeleteProduct={(id) => handleDeleteProduct(id)}
              onSubmitProduct={handleCreateProduct}
              categories={categories}
              npName={npName}
              npCategory={npCategory}
              npPrice={npPrice}
              npStock={npStock}
              npUnit={npUnit}
              npImage={npImage}
              npDesc={npDesc}
              isSearchingImage={isSearchingImage}
              isUploadingImage={isUploadingImage}
              onNpNameChange={setNpName}
              onNpCategoryChange={setNpCategory}
              onNpPriceChange={setNpPrice}
              onNpStockChange={setNpStock}
              onNpUnitChange={setNpUnit}
              onNpImageChange={setNpImage}
              onNpDescChange={setNpDesc}
              onFetchProductInfo={handleFetchProductInfo}
              onImageUpload={handleImageUpload}
            />
          )
  } else if (view === 'producer-profile' && selectedProducerId) {
    const producerProducts = products.filter((p) => p.producer_id === selectedProducerId)
    const producerInfo = producerCache[selectedProducerId.toString()] || (producerProducts[0] as any) || {}
    content = (
      <ProducerProfileView
        producerId={selectedProducerId}
        producerInfo={producerInfo}
        products={producerProducts}
        onBackToMarket={() => setView('market')}
        onAddToCart={addToCart}
      />
    )
  }

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col">
      <div className={view === 'dashboard' ? 'hidden md:block' : ''}>
        <Navbar
          user={user}
          onLogout={handleLogout}
          cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onMenuClick={() => setView(user ? (user.role === 'producer' ? 'dashboard' : 'market') : 'login')}
          setView={setView}
          scrolled={scrolled}
        />
      </div>

      {content}

      <CartDrawer
        isOpen={isCartOpen}
        cart={cart}
        total={cartTotal}
        onClose={() => setIsCartOpen(false)}
        onCheckout={checkout}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />

      <CustomModal
        isOpen={modalConfig.isOpen}
        title={modalConfig.title}
        message={modalConfig.message}
        type={modalConfig.type}
        onConfirm={modalConfig.onConfirm}
        onCancel={modalConfig.onCancel}
      />
    </div>
  )
}

