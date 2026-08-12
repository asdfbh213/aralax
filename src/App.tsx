import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Category = 'all' | 'paper' | 'protection' | 'packaging' | 'household'

const phone = '77771311888'

const categories: Record<Category, string> = {
  all: 'Все',
  paper: 'Бумага',
  protection: 'Защита',
  packaging: 'Упаковка',
  household: 'Хозтовары',
}

const products = [
  { category: 'protection', name: 'Перчатки нитро-винил Wally Plastic', details: 'черные / голубые · S, M, L · 50 пар', price: 'от 1 250 тг' },
  { category: 'protection', name: 'Перчатки нитрил Prime Med', details: 'голубые · S, M, L · 50 пар', price: 'от 2 500 тг' },
  { category: 'protection', name: 'Перчатки резиновые плотные', details: '90-100 гр · S, M, L · 10 пар', price: 'от 3 200 тг' },
  { category: 'paper', name: 'Салфетки Z-сложение', details: '2 слоя · 120, 150, 200 листов', price: 'от 250 тг' },
  { category: 'paper', name: 'Туалетная бумага Jumbo', details: '2 слоя · 100, 120, 150 м', price: 'от 420 тг' },
  { category: 'paper', name: 'Бумажное полотенце «Великан»', details: '2 слоя · 100 м · рулон', price: 'от 900 тг' },
  { category: 'packaging', name: 'Пакеты-майки', details: 'белые и черные · разные размеры', price: 'от 300 тг' },
  { category: 'packaging', name: 'Этикет-лента', details: 'для весов и касс · 9 размеров', price: 'от 420 тг' },
  { category: 'packaging', name: 'Чековая лента', details: '57 и 80 мм · разные намотки', price: 'от 120 тг' },
  { category: 'household', name: 'Мусорные пакеты', details: '30, 60, 120, 160, 240 л', price: 'по запросу' },
] as const

const segments = [
  'Медицинские клиники',
  'Ветеринарные клиники',
  'Частные школы и сады',
  'Рестораны и кофейни',
  'Фитнес и beauty',
  'Офисы и бизнес-центры',
  'Клининг',
  'Производства',
  'Розничные сети',
]

const steps = [
  'Принимаем заявку',
  'Уточняем объем',
  'Подбираем позиции',
  'Отправляем расчет',
  'Согласуем поставку',
]

function App() {
  const [active, setActive] = useState<Category>('all')

  const visibleProducts = useMemo(
    () => products.filter((product) => active === 'all' || product.category === active),
    [active],
  )

  function sendRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const message = [
      'Заявка с сайта DESIVE',
      `Компания: ${data.get('company')}`,
      `Сфера: ${data.get('segment')}`,
      `Что нужно: ${data.get('need')}`,
      `Объем: ${data.get('volume')}`,
      `Контакт: ${data.get('contact')}`,
    ].join('\n')

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top">
          <span>DESIVE</span>
        </a>
        <nav>
          <a href="#catalog">Каталог</a>
          <a href="#process">Процесс</a>
          <a href="#segments">Клиенты</a>
          <a href="#contacts">Заявка</a>
        </nav>
        <a className="header-action" href="#contacts">Получить расчет</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-content">
          <p className="eyebrow">Алматы · поставки для бизнеса · +7 777 131 18 88</p>
          <h1>Расходные материалы для организаций без лишних согласований</h1>
          <p className="hero-text">
            Перчатки, бумажная продукция, пакеты, этикет-лента, чековая лента и хозтовары.
            DESIVE считает закупку под ваш объем и быстро отправляет коммерческое предложение.
          </p>
          <div className="hero-actions">
            <a className="primary" href="#contacts">Оставить заявку</a>
            <a className="secondary" href="#catalog">Смотреть каталог</a>
          </div>
        </div>
        <aside className="quote-panel">
          <div>
            <span>01</span>
            <strong>Не витрина ради цен</strong>
            <p>Финальный расчет зависит от партии, наличия и условий поставки.</p>
          </div>
          <div>
            <span>02</span>
            <strong>Быстрый контакт</strong>
            <p>Заявка сразу открывается в WhatsApp, без регистрации и личного кабинета.</p>
          </div>
          <div>
            <span>03</span>
            <strong>Для регулярных закупок</strong>
            <p>Подходит клиникам, HoReCa, офисам, сетям, производствам и клинингу.</p>
          </div>
        </aside>
      </section>

      <section className="metric-strip" aria-label="Преимущества">
        <div><strong>30+</strong><span>ходовых позиций</span></div>
        <div><strong>1 день</strong><span>на первичный расчет</span></div>
        <div><strong>Алматы</strong><span>основной регион поставки</span></div>
        <div><strong>WhatsApp</strong><span>быстрая заявка</span></div>
      </section>

      <section className="section" id="catalog">
        <div className="section-head">
          <div>
            <p className="section-label">Каталог</p>
            <h2>Основной ассортимент</h2>
            <p>Цены указаны как ориентир. Точную стоимость под объем лучше запросить отдельно.</p>
          </div>
          <div className="filters">
            {(Object.keys(categories) as Category[]).map((category) => (
              <button key={category} className={active === category ? 'active' : ''} onClick={() => setActive(category)}>
                {categories[category]}
              </button>
            ))}
          </div>
        </div>

        <div className="catalog-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.name}>
              <span>{categories[product.category]}</span>
              <h3>{product.name}</h3>
              <p>{product.details}</p>
              <strong>{product.price}</strong>
              <a href="#contacts">Запросить точную цену</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section process" id="process">
        <div>
          <p className="section-label">Процесс</p>
          <h2>Понятная схема работы</h2>
        </div>
        <div className="steps">
          {steps.map((step, index) => (
            <div key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section segments" id="segments">
        <p className="section-label">Клиенты</p>
        <h2>Для кого подходит DESIVE</h2>
        <div className="segments-grid">
          {segments.map((segment) => <span key={segment}>{segment}</span>)}
        </div>
      </section>

      <section className="section comparison">
        <p className="section-label">Почему мы</p>
        <h2>Строго, быстро, под объем</h2>
        <div className="comparison-grid">
          <article>
            <h3>Широкий список товаров</h3>
            <p>Бумага, защита, упаковка, ленты и хозтовары в одном запросе.</p>
          </article>
          <article>
            <h3>Персональное КП</h3>
            <p>Не заставляем выбирать из шаблонного прайса, считаем под закупку.</p>
          </article>
          <article>
            <h3>Документы по запросу</h3>
            <p>Для крупных клиентов предоставим сертификаты и реквизиты.</p>
          </article>
        </div>
      </section>

      <section className="section contacts" id="contacts">
        <div>
          <p className="section-label">Заявка</p>
          <h2>Получить расчет</h2>
          <p>
            Напишите, что нужно и примерный объем. Мы подготовим коммерческое предложение и ответим в WhatsApp.
          </p>
          <div className="requisites">
            <a href={`https://wa.me/${phone}`} target="_blank">WhatsApp +7 777 131 18 88</a>
            <span>ИП DESIVE · БИН 080513552207 · Республика Казахстан, г. Алматы</span>
          </div>
        </div>
        <form onSubmit={sendRequest}>
          <input name="company" placeholder="Название компании" required />
          <select name="segment" defaultValue="" required>
            <option value="" disabled>Сфера деятельности</option>
            {segments.map((segment) => <option key={segment}>{segment}</option>)}
          </select>
          <textarea name="need" placeholder="Что нужно из ассортимента" rows={4} required />
          <input name="volume" placeholder="Примерный объем" />
          <input name="contact" placeholder="Ваш телефон или WhatsApp" required />
          <button type="submit">Отправить заявку в WhatsApp</button>
        </form>
      </section>

      <footer>
        <strong>DESIVE</strong>
        <span>Расходные материалы для бизнеса в Алматы</span>
      </footer>

      <a className="whatsapp" href={`https://wa.me/${phone}`} target="_blank" aria-label="Открыть WhatsApp">WA</a>
    </main>
  )
}

export default App
