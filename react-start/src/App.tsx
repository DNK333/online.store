import { useMemo, useState } from 'react'
import './App.css'

type Product = {
  id: number
  name: string
  category: string
  price: number
  rating: number
  stock: number
  description: string
  image: string
}

type Order = {
  id: number
  date: string
  total: number
  status: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Смарт-часы Aero',
    category: 'Электроника',
    price: 249,
    rating: 4.8,
    stock: 18,
    description: 'Премиальные смарт-часы с отслеживанием сердечного ритма и GPS-навигацией.',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Наушники Nimbus',
    category: 'Аудио',
    price: 179,
    rating: 4.7,
    stock: 12,
    description: 'Беспроводные наушники с шумоподавлением для поездок и работы.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Рюкзак Urban',
    category: 'Аксессуары',
    price: 89,
    rating: 4.6,
    stock: 24,
    description: 'Водостойкий повседневный рюкзак для города и путешествий.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Лампа Luma',
    category: 'Дом',
    price: 64,
    rating: 4.9,
    stock: 33,
    description: 'Минималистичная настольная лампа с тёплым диммируемым светом.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Бутылка Terra',
    category: 'Лайфстайл',
    price: 32,
    rating: 4.5,
    stock: 40,
    description: 'Двустенная термобутылка, которая держит холод 24 часа.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    name: 'Камера Pixel',
    category: 'Электроника',
    price: 699,
    rating: 4.8,
    stock: 8,
    description: 'Компактная беззеркальная камера с искусственным интеллектом и 4K видео.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80',
  },
]

const categories = ['Все', 'Электроника', 'Аудио', 'Аксессуары', 'Дом', 'Лайфстайл']

const initialOrders: Order[] = [
  { id: 1042, date: '2026-09-20', total: 249, status: 'Доставлен' },
  { id: 1041, date: '2026-09-15', total: 89, status: 'В обработке' },
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [search, setSearch] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(800)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [user, setUser] = useState({ username: 'ann_smith', email: 'ann@example.com' })
  const [orders, setOrders] = useState(initialOrders)
  const [cart, setCart] = useState<Record<number, number>>({ 1: 1, 3: 2 })
  const [activeProductId, setActiveProductId] = useState(products[0].id)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
      const matchesPrice = product.price >= minPrice && product.price <= maxPrice
      return matchesCategory && matchesSearch && matchesPrice
    })
  }, [selectedCategory, search, minPrice, maxPrice])

  const activeProduct =
    products.find((product) => product.id === activeProductId) ?? filteredProducts[0] ?? products[0]

  const cartItems = products
    .filter((product) => cart[product.id])
    .map((product) => ({ ...product, quantity: cart[product.id] }))

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const addToCart = (productId: number) => {
    setCart((current) => ({ ...current, [productId]: (current[productId] ?? 0) + 1 }))
  }

  const changeQuantity = (productId: number, delta: number) => {
    setCart((current) => {
      const next = (current[productId] ?? 0) + delta
      if (next <= 0) {
        const { [productId]: _, ...rest } = current
        return rest
      }
      return { ...current, [productId]: next }
    })
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleCheckout = () => {
    if (!cartItems.length) return

    const nextOrder: Order = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      total,
      status: 'В обработке',
    }

    setOrders((current) => [nextOrder, ...current])
    setCart({})
    scrollToSection('orders')
  }

  const handleShopNow = () => {
    setSelectedCategory('Все')
    setSearch('')
    setMinPrice(0)
    setMaxPrice(800)
    scrollToSection('catalog')
  }

  const handleDeals = () => {
    setSelectedCategory('Все')
    setSearch('')
    setMinPrice(0)
    setMaxPrice(150)
    scrollToSection('catalog')
  }

  const handleAccountAction = () => {
    setAuthMode('login')
    scrollToSection('account')
  }

  const handleAuthSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setUser({ username: 'demo_user', email: 'demo@store.com' })
    scrollToSection('account')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">S</div>
          <div>
            <p className="eyebrow">Магазин</p>
            <h1>Storefront</h1>
          </div>
        </div>

        <nav className="main-nav">
          <a href="#catalog">Каталог</a>
          <a href="#cart">Корзина</a>
          <a href="#orders">Заказы</a>
          <a href="#account">Аккаунт</a>
        </nav>

        <div className="topbar-actions">
          <span className="status-pill">Доставка бесплатно</span>
          <button type="button" className="primary-button" onClick={handleAccountAction}>
            {user.username ? `Привет, ${user.username}` : 'Войти'}
          </button>
        </div>
      </header>

      <main className="page-layout">
        <section className="hero-panel">
          <div className="hero-copy">
            <p className="eyebrow secondary">Новинки</p>
            <h2>Умные вещи для повседневной жизни.</h2>
            <p>
              Выбирайте качественные товары для дома, работы и отдыха с быстрой доставкой и удобным оформлением заказа.
            </p>
            <div className="hero-actions">
              <button type="button" className="primary-button" onClick={handleShopNow}>К покупкам</button>
              <button type="button" className="secondary-button" onClick={handleDeals}>Скидки</button>
            </div>
          </div>
          <div className="hero-card">
            <div className="mini-product">
              <img src={products[0].image} alt={products[0].name} />
            </div>
            <div className="mini-meta">
              <span className="eyebrow">Хит продаж</span>
              <strong>{products[0].name}</strong>
              <span>${products[0].price}</span>
            </div>
          </div>
        </section>

        <section id="catalog" className="catalog-panel">
          <div className="catalog-header">
            <div>
              <p className="eyebrow">Каталог</p>
              <h3>Найдите то, что нужно именно вам</h3>
            </div>

            <label className="search-box">
              <span>Поиск</span>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Поиск товаров"
              />
            </label>
          </div>

          <div className="toolbar">
            <div className="category-row">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={selectedCategory === category ? 'chip active' : 'chip'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="price-range">
              <label>
                От
                <input
                  type="number"
                  value={minPrice}
                  onChange={(event) => setMinPrice(Number(event.target.value) || 0)}
                />
              </label>
              <label>
                До
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(event) => setMaxPrice(Number(event.target.value) || 0)}
                />
              </label>
            </div>
          </div>

          <div className="product-layout">
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article key={product.id} className="product-card">
                  <img src={product.image} alt={product.name} />
                  <div className="product-body">
                    <div className="product-meta">
                      <span>{product.category}</span>
                      <span>★ {product.rating}</span>
                    </div>
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <div className="product-footer">
                      <strong>${product.price}</strong>
                      <button type="button" onClick={() => setActiveProductId(product.id)}>
                        Подробнее
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="product-detail">
              <img src={activeProduct.image} alt={activeProduct.name} />
              <div className="detail-copy">
                <p className="eyebrow">Популярный товар</p>
                <h3>{activeProduct.name}</h3>
                <div className="detail-meta">
                  <span>{activeProduct.category}</span>
                  <span>В наличии: {activeProduct.stock}</span>
                </div>
                <p>{activeProduct.description}</p>
                <div className="detail-footer">
                  <strong>${activeProduct.price}</strong>
                  <button type="button" className="primary-button" onClick={() => addToCart(activeProduct.id)}>
                    В корзину
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="bottom-grid">
          <div id="cart" className="panel card-panel">
            <div className="panel-head">
              <p className="eyebrow">Корзина</p>
              <h3>{cartItems.length} товаров</h3>
            </div>

            {cartItems.length ? (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div>
                      <strong>{item.name}</strong>
                      <small>{item.category}</small>
                    </div>
                    <div className="qty-controls">
                      <button type="button" onClick={() => changeQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => changeQuantity(item.id, 1)}>+</button>
                    </div>
                    <strong>${item.price * item.quantity}</strong>
                  </div>
                ))}

                <div className="cart-total">
                  <span>Итого</span>
                  <strong>${total}</strong>
                </div>
                <button type="button" className="primary-button checkout" onClick={handleCheckout}>
                  Оформить заказ
                </button>
              </>
            ) : (
              <p className="empty-state">Корзина пуста. Добавьте товар, чтобы начать оформление.</p>
            )}
          </div>

          <div id="account" className="panel card-panel">
            <div className="panel-head">
              <p className="eyebrow">Аккаунт</p>
              <h3>Профиль</h3>
            </div>

            <div className="auth-switch">
              <button type="button" className={authMode === 'login' ? 'chip active' : 'chip'} onClick={() => setAuthMode('login')}>
                Войти
              </button>
              <button type="button" className={authMode === 'register' ? 'chip active' : 'chip'} onClick={() => setAuthMode('register')}>
                Регистрация
              </button>
            </div>

            <form className="auth-form" onSubmit={handleAuthSubmit}>
              <label>
                Имя пользователя
                <input type="text" defaultValue={user.username} />
              </label>
              <label>
                Email
                <input type="email" defaultValue={user.email} />
              </label>
              <label>
                Пароль
                <input type="password" defaultValue="password123" />
              </label>
              <button type="submit" className="primary-button full-width">
                {authMode === 'login' ? 'Войти' : 'Создать аккаунт'}
              </button>
            </form>
          </div>

          <div id="orders" className="panel card-panel orders-panel">
            <div className="panel-head">
              <p className="eyebrow">Заказы</p>
              <h3>История</h3>
            </div>

            {orders.map((order) => (
              <div key={order.id} className="order-row">
                <div>
                  <strong>#{order.id}</strong>
                  <small>{order.date}</small>
                </div>
                <span>{order.status}</span>
                <strong>${order.total}</strong>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
