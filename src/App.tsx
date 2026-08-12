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
  { category: 'protection', name: 'Нитро-виниловые перчатки', details: 'Для клиник, HoReCa и сервиса. Размеры S, M, L.', price: 'от 1 100 тг' },
  { category: 'protection', name: 'Нитриловые перчатки', details: 'Плотные одноразовые перчатки для регулярных закупок.', price: 'от 1 800 тг' },
  { category: 'protection', name: 'Резиновые хозяйственные перчатки', details: 'Для клининга, кухни и ежедневной уборки.', price: 'от 2 600 тг' },
  { category: 'paper', name: 'Салфетки Z-сложения', details: '2 слоя, разная плотность и формат пачки.', price: 'от 250 тг' },
  { category: 'paper', name: 'Туалетная бумага Jumbo', details: '2 слоя, разный метраж для диспенсеров.', price: 'от 420 тг' },
  { category: 'paper', name: 'Полотенца “Великан”', details: '2 слоя, рулоны для интенсивного расхода.', price: 'от 900 тг' },
  { category: 'packaging', name: 'Пакеты-майки', details: 'Белые и черные, разные размеры под задачи бизнеса.', price: 'от 300 тг' },
  { category: 'packaging', name: 'Этикет-лента', details: 'Для весов, касс и маркировки товаров.', price: 'от 420 тг' },
  { category: 'packaging', name: 'Чековая лента', details: 'Популярные размеры 57 и 80 мм.', price: 'от 120 тг' },
  { category: 'household', name: 'Мусорные пакеты', details: 'Объемы 30-240 л для офисов, клининга и HoReCa.', price: 'по запросу' },
] as const

const segments = [
  'Клиники и лаборатории',
  'Ветеринарные клиники',
  'Школы и детские сады',
  'Рестораны и кофейни',
  'Фитнес и beauty',
  'Офисы и БЦ',
  'Клининговые компании',
  'Производства',
  'Розничные сети',
]

const steps = ['Заявка', 'Подбор', 'Расчет', 'Согласование', 'Поставка']

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
    <main className="site-shell">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="stars" />

      <header className="site-header">
        <a className="brand" href="#top"><span>D</span> DESIVE</a>
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
          <p className="eyebrow">Алматы • B2B supply • ИП DESIVE</p>
          <h1>Премиальная поставка расходников для бизнеса</h1>
          <p className="hero-text">
            Перчатки, бумажная продукция, упаковка, чековая лента и хозтовары.
            DESIVE считает закупку под ваш объем и быстро отправляет персональное КП.
          </p>
          <div className="hero-actions">
            <a className="primary" href="#contacts">Оставить заявку</a>
            <a className="secondary" href="#catalog">Смотреть каталог</a>
          </div>
          <div className="badges">
            <span>БИН 080513552207</span>
            <span>WhatsApp +7 777 131 18 88</span>
          </div>
        </div>
        <aside className="astral-panel">
          <div className="cube-scene">
            <span className="cube cube-a" />
            <span className="cube cube-b" />
            <span className="cube cube-c" />
            <span className="ring" />
          </div>
          <h2>Direct supplier model</h2>
          <p>Не жесткий прайс, а расчет под объем, наличие и условия поставки.</p>
        </aside>
      </section>

      <section className="metrics">
        <div><strong>30+</strong><span>ходовых позиций</span></div>
        <div><strong>1 день</strong><span>на первичный расчет</span></div>
        <div><strong>Алматы</strong><span>основной регион</span></div>
        <div><strong>WhatsApp</strong><span>без регистрации</span></div>
      </section>

      <section className="section" id="catalog">
        <div className="section-head">
          <div>
            <p className="section-label">Каталог</p>
            <h2>Ассортимент под регулярные закупки</h2>
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
        <p className="section-label">Как работаем</p>
        <h2>Быстрая схема без лишней бюрократии</h2>
        <div className="steps">
          {steps.map((step, index) => (
            <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><p>{step}</p></div>
          ))}
        </div>
      </section>

      <section className="section segments" id="segments">
        <p className="section-label">Кому подходит</p>
        <h2>Для компаний, где важны наличие, цена и документы</h2>
        <div className="segments-grid">
          {segments.map((segment) => <span key={segment}>{segment}</span>)}
        </div>
      </section>

      <section className="section contacts" id="contacts">
        <div>
          <p className="section-label">Заявка</p>
          <h2>Получить персональный расчет</h2>
          <p>Напишите, что нужно и примерный объем. Заявка сразу откроется в WhatsApp.</p>
          <div className="requisites">
            <a href={`https://wa.me/${phone}`} target="_blank">WhatsApp +7 777 131 18 88</a>
            <span>ИП DESIVE • Республика Казахстан, г. Алматы</span>
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
