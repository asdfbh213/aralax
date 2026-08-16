import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Category = 'all' | 'gloves' | 'paper' | 'bags' | 'labels'

type Product = {
  id: string
  category: Exclude<Category, 'all'>
  name: string
  image: string
  price: number | null
  unit: string
  pack: string
  badge: string
}

type Cart = Record<string, number>

const phone = '77771311888'

const categories: Record<Category, string> = {
  all: 'Все',
  gloves: 'Перчатки',
  paper: 'Бумага',
  bags: 'Пакеты',
  labels: 'Лента',
}

const products: Product[] = [
  {
    id: 'black-vinyl-nitrile-gloves',
    category: 'gloves',
    name: 'Перчатки винил/нитрил, черные',
    image: '/images/products/black-vinyl-nitrile-gloves.jpg',
    price: 1250,
    unit: 'упаковка',
    pack: '100 шт · размер M',
    badge: 'Powder free',
  },
  {
    id: 'blue-vinyl-nitrile-gloves',
    category: 'gloves',
    name: 'Перчатки винил/нитрил, голубые',
    image: '/images/products/blue-vinyl-nitrile-gloves.jpg',
    price: 1250,
    unit: 'упаковка',
    pack: '100 шт · размер M',
    badge: 'Latex free',
  },
  {
    id: 'verde-vita-black-gloves',
    category: 'gloves',
    name: 'Verde Vita нитро-винил, черные',
    image: '/images/products/verde-vita-black-gloves.jpg',
    price: 1250,
    unit: 'упаковка',
    pack: '100 шт · размер M',
    badge: 'Универсальные',
  },
  {
    id: 'prime-med-nitrile-gloves',
    category: 'gloves',
    name: 'Prime Med нитриловые, голубые',
    image: '/images/products/prime-med-nitrile-gloves.jpg',
    price: 2500,
    unit: 'упаковка',
    pack: '100 шт · размер M',
    badge: 'EN ISO',
  },
  {
    id: 'mediok-nitrile-gloves',
    category: 'gloves',
    name: 'mediOk нитриловые перчатки',
    image: '/images/products/mediok-nitrile-gloves.jpg',
    price: 2300,
    unit: 'упаковка',
    pack: '50 пар · размер M',
    badge: 'AQL 1.5',
  },
  {
    id: 'latex-household-gloves',
    category: 'gloves',
    name: 'Латексные хозяйственные перчатки',
    image: '/images/products/latex-household-gloves.jpg',
    price: 3200,
    unit: '10 пар',
    pack: 'плотные · желтые',
    badge: 'Плотные',
  },
  {
    id: 'z-fold-napkins',
    category: 'paper',
    name: 'Салфетки Z-сложения',
    image: '/images/products/z-fold-napkins.jpg',
    price: 250,
    unit: 'пачка',
    pack: '120 / 150 / 200 листов',
    badge: '2 слоя',
  },
  {
    id: 'jumbo-toilet-paper-rolls',
    category: 'paper',
    name: 'Туалетная бумага Jumbo',
    image: '/images/products/jumbo-toilet-paper-rolls.jpg',
    price: 420,
    unit: 'рулон',
    pack: '100 / 120 / 150 м',
    badge: 'Jumbo',
  },
  {
    id: 'toilet-paper-roll',
    category: 'paper',
    name: 'Туалетная бумага в рулоне',
    image: '/images/products/toilet-paper-roll.jpg',
    price: null,
    unit: 'рулон',
    pack: 'для диспенсеров',
    badge: 'Опт',
  },
  {
    id: 'trash-bags-30l',
    category: 'bags',
    name: 'Мусорные пакеты 30 л',
    image: '/images/products/trash-bags-30l.jpg',
    price: null,
    unit: 'рулон',
    pack: 'черные · прочные',
    badge: '30 л',
  },
  {
    id: 'trash-bags-60l',
    category: 'bags',
    name: 'Мусорные пакеты 60 л',
    image: '/images/products/trash-bags-60l.jpg',
    price: null,
    unit: 'рулон',
    pack: 'черные · KZ',
    badge: '60 л',
  },
  {
    id: 'trash-bags-120l',
    category: 'bags',
    name: 'Пакеты для мусора 120 л',
    image: '/images/products/trash-bags-120l.jpg',
    price: null,
    unit: 'рулон',
    pack: '10 шт · 120 л',
    badge: 'KZ-Арман',
  },
  {
    id: 'trash-bags-160l',
    category: 'bags',
    name: 'Пакеты для мусора 160 л',
    image: '/images/products/trash-bags-160l.jpg',
    price: null,
    unit: 'рулон',
    pack: '5 шт · 100x90 см',
    badge: '160 л',
  },
  {
    id: 'trash-bags-240l',
    category: 'bags',
    name: 'Пакеты для мусора 240 л',
    image: '/images/products/trash-bags-240l.jpg',
    price: null,
    unit: 'рулон',
    pack: '5 шт · 100x140 см',
    badge: '240 л',
  },
  {
    id: 'eco-bags-3500',
    category: 'bags',
    name: 'Eco Kz пакеты 3500',
    image: '/images/products/eco-bags-3500.jpg',
    price: null,
    unit: 'упаковка',
    pack: '260x450 мм',
    badge: 'Eco Kz',
  },
  {
    id: 'eco-bags-3000',
    category: 'bags',
    name: 'Eco Kz пакеты 3000',
    image: '/images/products/eco-bags-3000.jpg',
    price: null,
    unit: 'упаковка',
    pack: '260x450 мм',
    badge: 'Eco Kz',
  },
  {
    id: 'eco-bags-2500',
    category: 'bags',
    name: 'Eco Kz пакеты 2500',
    image: '/images/products/eco-bags-2500.jpg',
    price: null,
    unit: 'упаковка',
    pack: '260x450 мм',
    badge: 'Eco Kz',
  },
  {
    id: 'eco-bags-2000',
    category: 'bags',
    name: 'Eco Kz пакеты 2000',
    image: '/images/products/eco-bags-2000.jpg',
    price: null,
    unit: 'упаковка',
    pack: '260x450 мм',
    badge: 'Eco Kz',
  },
  {
    id: 'black-tshirt-bag',
    category: 'bags',
    name: 'Пакет-майка черный',
    image: '/images/products/black-tshirt-bag.jpg',
    price: 300,
    unit: 'пачка',
    pack: 'размер по запросу',
    badge: 'Майка',
  },
  {
    id: 'white-tshirt-bag',
    category: 'bags',
    name: 'Пакет-майка белый',
    image: '/images/products/white-tshirt-bag.jpg',
    price: 300,
    unit: 'пачка',
    pack: 'размер по запросу',
    badge: 'Майка',
  },
  {
    id: 'label-roll-yellow',
    category: 'labels',
    name: 'Этикет-лента',
    image: '/images/products/label-roll-yellow.jpg',
    price: 420,
    unit: 'рулон',
    pack: 'для весов и маркировки',
    badge: 'Термо',
  },
  {
    id: 'receipt-tape-roll',
    category: 'labels',
    name: 'Чековая лента',
    image: '/images/products/receipt-tape-roll.jpg',
    price: 120,
    unit: 'рулон',
    pack: 'кассовая термолента',
    badge: '57 / 80 мм',
  },
]

const segments = ['Кафе и рестораны', 'Магазины', 'Клиники', 'Доставка еды', 'Клининг', 'Офисы']

const heroSlides = products.slice(0, 4)

const categoryIcons: Record<Category, string> = {
  all: '•',
  gloves: 'G',
  paper: 'P',
  bags: 'B',
  labels: 'L',
}

function formatPrice(price: number | null) {
  return price ? `от ${price.toLocaleString('ru-RU')} тг` : 'цена по запросу'
}

function App() {
  const [active, setActive] = useState<Category>('all')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<Cart>({})
  const [favorites, setFavorites] = useState<string[]>([])
  const [activeSlide, setActiveSlide] = useState(0)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesCategory = active === 'all' || product.category === active
      const matchesQuery = !normalizedQuery || `${product.name} ${product.pack} ${product.badge}`.toLowerCase().includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [active, query])

  const cartItems = products.filter((product) => cart[product.id])
  const cartCount = Object.values(cart).reduce((sum, value) => sum + value, 0)
  const total = cartItems.reduce((sum, product) => sum + (product.price ?? 0) * cart[product.id], 0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (!isCartOpen) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsCartOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isCartOpen])

  function addToCart(id: string) {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }))
  }

  function changeQuantity(id: string, delta: number) {
    setCart((current) => {
      const nextValue = (current[id] ?? 0) + delta
      const next = { ...current }
      if (nextValue <= 0) delete next[id]
      else next[id] = nextValue
      return next
    })
  }

  function toggleFavorite(id: string) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function openWhatsApp(product?: Product) {
    const lines = product
      ? [`Здравствуйте! Хочу заказать: ${product.name}`, `Фасовка: ${product.pack}`, `Цена на сайте: ${formatPrice(product.price)}`]
      : [
        'Здравствуйте! Хочу оформить заказ с сайта DESIVE.',
        ...cartItems.map((item) => `- ${item.name}, ${cart[item.id]} ${item.unit}, ${formatPrice(item.price)}`),
        total ? `Ориентировочная сумма: ${total.toLocaleString('ru-RU')} тг` : 'По части позиций нужна цена по запросу.',
      ]

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer')
  }

  function sendLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const contact = String(data.get('contact') ?? '').trim()

    if (!name || !/^\+?\d[\d\s()-]{8,}$/.test(contact)) return

    setLeadStatus('sending')
    const message = [`Заявка с сайта DESIVE`, `Имя: ${name}`, `Телефон: ${contact}`].join('\n')
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    window.setTimeout(() => setLeadStatus('sent'), 420)
  }

  const cartContent = (
    <>
      {cartItems.length === 0 ? (
        <p className="empty">Корзина пока пустая.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-row" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <span>{formatPrice(item.price)}</span>
              </div>
              <div className="quantity">
                <button type="button" onClick={() => changeQuantity(item.id, -1)}>-</button>
                <span>{cart[item.id]}</span>
                <button type="button" onClick={() => changeQuantity(item.id, 1)}>+</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <span>Ориентировочно</span>
            <strong>{total ? `${total.toLocaleString('ru-RU')} тг` : 'по запросу'}</strong>
          </div>
          <button className="checkout" type="button" onClick={() => openWhatsApp()}>Отправить заказ</button>
        </>
      )}
    </>
  )

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top">DESIVE</a>
        <nav>
          <a href="#catalog">Каталог</a>
          <a href="#delivery">Доставка</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <button className="cart-pill" type="button" onClick={() => setIsCartOpen(true)}>
          Корзина · {cartCount}
        </button>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Алматы · расходные материалы для бизнеса</p>
          <h1>DESIVE</h1>
          <p>
            Перчатки, бумажная продукция, пакеты, этикет-лента и чековая лента для кафе, магазинов,
            клиник, доставки и клининга. Заказ оформляется напрямую в WhatsApp.
          </p>
          <div className="hero-actions">
            <a className="primary" href="#catalog">Смотреть товары</a>
            <button className="secondary" type="button" onClick={() => openWhatsApp()}>Написать в WhatsApp</button>
          </div>
        </div>
        <div className="hero-slider">
          {heroSlides.map((product, index) => (
            <img
              key={product.id}
              className={index === activeSlide ? 'active' : ''}
              src={product.image}
              alt={product.name}
            />
          ))}
          <div className="hero-dots" aria-label="Слайды">
            {heroSlides.map((product, index) => (
              <button
                key={product.id}
                className={index === activeSlide ? 'active' : ''}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Показать слайд ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="category-island" aria-label="Категории товаров">
        <p className="section-label">Категории товаров</p>
        <div>
          {(Object.keys(categories) as Category[]).map((category) => (
            <button key={category} className={active === category ? 'active' : ''} type="button" onClick={() => setActive(category)}>
              <span>{categoryIcons[category]}</span>
              {categories[category]}
            </button>
          ))}
        </div>
      </section>

      <section className="section catalog-section" id="catalog">
        <div className="section-head">
          <div>
            <p className="section-label">Каталог</p>
            <h2>Товары в наличии и под заказ</h2>
          </div>
          <input aria-label="Поиск по каталогу" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск: перчатки, 60 л, чековая..." />
        </div>

        <div className="catalog-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <button className={`favorite ${favorites.includes(product.id) ? 'active' : ''}`} type="button" onClick={() => toggleFavorite(product.id)} aria-label="Добавить в избранное">
                ♥
              </button>
              <div className="product-image">
                <img src={product.image} alt={product.name} loading="lazy" />
              </div>
              <div className="product-body">
                <div className="product-meta">
                  <span>{categories[product.category]}</span>
                  <small><i />В наличии</small>
                </div>
                <h3>{product.name}</h3>
                <p>{product.pack}</p>
                <div className="product-bottom">
                  <strong>{formatPrice(product.price)}</strong>
                  <span>{product.badge}</span>
                </div>
                <div className="product-actions">
                  <button type="button" onClick={() => addToCart(product.id)}>В корзину</button>
                  <button type="button" onClick={() => openWhatsApp(product)}>Купить</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section info-grid" id="delivery">
        <article>
          <span>01</span>
          <h3>Опт и розница</h3>
          <p>Работаем с разовыми и регулярными закупками для бизнеса.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Алматы</h3>
          <p>Быстрая обработка заявок и согласование поставки по городу.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Персональный расчет</h3>
          <p>Финальная цена зависит от объема, упаковки и наличия.</p>
        </article>
      </section>

      <section className="section clients">
        <p className="section-label">Клиенты</p>
        <div>
          {segments.map((segment) => <span key={segment}>{segment}</span>)}
        </div>
      </section>

      <section className="section lead-section">
        <div>
          <p className="section-label">Заявка</p>
          <h2>Оставить заявку</h2>
          <p>Напишите имя и телефон. Мы уточним потребность и подготовим расчет по вашим товарам.</p>
        </div>
        <form className="lead-form" onSubmit={sendLead}>
          <input name="name" placeholder="Ваше имя" required />
          <input name="contact" placeholder="+7 XXX XXX XX XX" required />
          <button type="submit" disabled={leadStatus === 'sending'}>
            {leadStatus === 'sending' ? 'Отправляем...' : 'Отправить заявку'}
          </button>
          {leadStatus === 'sent' && <span>Заявка открыта в WhatsApp.</span>}
        </form>
      </section>

      <section className="section contacts" id="contacts">
        <div>
          <p className="section-label">Контакты</p>
          <h2>DESIVE, Алматы</h2>
          <p>Расходные материалы для бизнеса: перчатки, бумага, пакеты, упаковка и лента.</p>
        </div>
        <div className="contact-actions">
          <a className="primary" href={`https://wa.me/${phone}`} target="_blank">WhatsApp +7 777 131 18 88</a>
          <a className="secondary" href="#catalog">Вернуться в каталог</a>
        </div>
      </section>

      <footer>
        <strong>DESIVE</strong>
        <span>Интернет-магазин расходных материалов · Алматы, Казахстан</span>
      </footer>

      <a className="whatsapp" href={`https://wa.me/${phone}`} target="_blank" aria-label="Открыть WhatsApp">WA</a>

      {isCartOpen && (
        <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <aside className="cart-drawer" onClick={(event) => event.stopPropagation()} aria-label="Корзина">
            <div className="drawer-head">
              <div>
                <p className="section-label">Корзина</p>
                <h2>Быстрый заказ</h2>
              </div>
              <button type="button" onClick={() => setIsCartOpen(false)} aria-label="Закрыть корзину">×</button>
            </div>
            <p className="drawer-text">Отправьте позиции в WhatsApp. Менеджер уточнит объем, наличие и финальную цену.</p>
            <div className="cart-panel">{cartContent}</div>
          </aside>
        </div>
      )}
    </main>
  )
}

export default App
