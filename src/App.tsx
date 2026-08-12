import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Lang = 'ru' | 'kz'
type Category = 'paper' | 'protection' | 'packaging' | 'household'

const phone = '77771311888'

const copy = {
  ru: {
    nav: ['Каталог', 'Процесс', 'Для кого', 'Контакты'],
    heroTitle: 'Расходные материалы для бизнеса в Алматы',
    heroText:
      'DESIVE поставляет перчатки, бумажную продукцию, пакеты, этикет-ленту и чековую ленту для организаций. Мы работаем напрямую с поставщиками и подбираем условия под ваш объем.',
    request: 'Получить расчет',
    catalog: 'Каталог продукции',
    catalogText:
      'Показываем ориентиры по прайсу. Точная цена зависит от объема, наличия, НДС и условий поставки.',
    all: 'Все',
    ask: 'Запросить цену',
    from: 'от',
    process: 'Как мы работаем',
    audience: 'Кому подходит',
    why: 'Почему DESIVE',
    certificates: 'Сертификаты',
    certificatesText:
      'По запросу предоставим документы соответствия на позиции, где это важно для сетей, клиник, франшиз и производственных клиентов.',
    formTitle: 'Оставить заявку',
    formText:
      'Опишите потребность и примерный объем. Мы подготовим персональное коммерческое предложение.',
    company: 'Название компании',
    segment: 'Сфера деятельности',
    need: 'Что нужно',
    volume: 'Примерный объем',
    contact: 'Контактные данные',
    submit: 'Отправить в WhatsApp',
    requisites: 'ИП DESIVE · БИН 080513552207 · Республика Казахстан, г. Алматы',
  },
  kz: {
    nav: ['Каталог', 'Жұмыс тәртібі', 'Кімге', 'Байланыс'],
    heroTitle: 'Алматыдағы бизнеске арналған шығын материалдары',
    heroText:
      'DESIVE ұйымдарға қолғап, қағаз өнімдері, пакеттер, жапсырма және чек таспаларын жеткізеді. Біз жеткізушілермен тікелей жұмыс істеп, көлеміңізге сай шарт ұсынамыз.',
    request: 'Есеп алу',
    catalog: 'Өнім каталогы',
    catalogText:
      'Бағалар бағдар ретінде көрсетілген. Нақты баға көлемге, қолжетімділікке, ҚҚС-қа және жеткізу шартына байланысты.',
    all: 'Барлығы',
    ask: 'Бағаны сұрау',
    from: 'бастап',
    process: 'Қалай жұмыс істейміз',
    audience: 'Кімге қолайлы',
    why: 'Неге DESIVE',
    certificates: 'Сертификаттар',
    certificatesText:
      'Желілер, клиникалар, франшизалар және өндірістік клиенттер үшін қажет сәйкестік құжаттарын сұрау бойынша береміз.',
    formTitle: 'Өтінім қалдыру',
    formText: 'Қажеттілікті және шамамен көлемді жазыңыз. Жеке коммерциялық ұсыныс дайындаймыз.',
    company: 'Компания атауы',
    segment: 'Қызмет саласы',
    need: 'Не қажет',
    volume: 'Шамамен көлем',
    contact: 'Байланыс деректері',
    submit: 'WhatsApp арқылы жіберу',
    requisites: 'ИП DESIVE · БИН 080513552207 · Қазақстан Республикасы, Алматы қ.',
  },
}

const categories: Record<Category, { ru: string; kz: string }> = {
  paper: { ru: 'Бумага', kz: 'Қағаз' },
  protection: { ru: 'Защита', kz: 'Қорғаныс' },
  packaging: { ru: 'Упаковка', kz: 'Қаптама' },
  household: { ru: 'Хозтовары', kz: 'Шаруашылық' },
}

const products = [
  { category: 'protection', name: 'Перчатки нитро-винил Wally Plastic, черные', details: 'S / M / L · 50 пар', price: '1 250 тг', tax: 'без НДС от 1 100 тг' },
  { category: 'protection', name: 'Перчатки нитро-винил Wally Plastic, голубые', details: 'S / M / L · 50 пар', price: '1 250 тг', tax: 'без НДС от 1 100 тг' },
  { category: 'protection', name: 'Перчатки нитрил Prime Med, голубые', details: 'S / M / L · 50 пар', price: '2 500 тг', tax: 'без НДС от 1 800 тг' },
  { category: 'protection', name: 'Перчатки резиновые плотные', details: '90-100 гр · 10 пар', price: '3 200 тг', tax: 'без НДС от 2 600 тг' },
  { category: 'paper', name: 'Салфетки Z-сложение, 2 слоя', details: '120 / 150 / 200 листов', price: '250 тг', tax: 'за пачку' },
  { category: 'paper', name: 'Туалетная бумага Jumbo, 2 слоя', details: '100 / 120 / 150 м', price: '420 тг', tax: 'за рулон' },
  { category: 'paper', name: 'Бумажное полотенце "Великан"', details: '2 слоя · 100 м', price: '900 тг', tax: 'за рулон' },
  { category: 'household', name: 'Мусорные пакеты', details: '30 / 60 / 120 / 160 / 240 л', price: 'по запросу', tax: 'под объем' },
  { category: 'packaging', name: 'Пакеты-майки белые и черные', details: 'разные размеры и плотность', price: '300 тг', tax: 'от партии' },
  { category: 'packaging', name: 'Этикет-лента для весов и касс', details: '9 популярных размеров', price: '420 тг', tax: 'за ролик' },
  { category: 'packaging', name: 'Чековая лента', details: '57 и 80 мм · разные намотки', price: '120 тг', tax: 'за ролик' },
] as const

const steps = ['Получаем заявку', 'Подбираем позиции', 'Формируем КП', 'Согласуем условия', 'Организуем поставку', 'Поддерживаем сотрудничество']
const audiences = ['Медицинские клиники', 'Ветеринарные клиники', 'Частные школы и сады', 'HoReCa', 'Фитнес и beauty', 'Офисы и БЦ', 'Клининг', 'Производства', 'Розничные сети']
const advantages = [
  ['Широкий ассортимент', 'бумага, защита, упаковка и хозтовары в одном запросе'],
  ['Быстрое рассмотрение', 'оперативно считаем КП без сложной регистрации'],
  ['Стабильное наличие', 'ориентируемся на регулярные потребности организаций'],
  ['Индивидуальные условия', 'цена и состав поставки зависят от вашего объема'],
]

function App() {
  const [lang, setLang] = useState<Lang>('ru')
  const [active, setActive] = useState<Category | 'all'>('all')
  const t = copy[lang]

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
      `Потребность: ${data.get('need')}`,
      `Объем: ${data.get('volume')}`,
      `Контакт: ${data.get('contact')}`,
    ].join('\n')
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="DESIVE">
          <span>D</span> DESIVE
        </a>
        <nav>
          {t.nav.map((item, index) => (
            <a key={item} href={['#catalog', '#process', '#audience', '#contacts'][index]}>
              {item}
            </a>
          ))}
        </nav>
        <div className="lang" aria-label="Language">
          <button className={lang === 'ru' ? 'active' : ''} onClick={() => setLang('ru')}>RU</button>
          <button className={lang === 'kz' ? 'active' : ''} onClick={() => setLang('kz')}>KZ</button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Алматы · B2B поставки · WhatsApp +7 777 131 18 88</p>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <div className="hero-actions">
            <a className="primary" href="#contacts">{t.request}</a>
            <a className="secondary" href="#catalog">{t.catalog}</a>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="product-stack">
            <span>Gloves</span>
            <span>Paper</span>
            <span>Labels</span>
            <span>Packaging</span>
          </div>
        </div>
      </section>

      <section className="section intro">
        <div>
          <p className="section-label">Direct sourcing</p>
          <h2>Не фиксированный прайс, а расчет под вашу закупку.</h2>
        </div>
        <p>DESIVE работает напрямую с поставщиками, поэтому подбирает выгодные позиции под конкретный объем и формирует персональное коммерческое предложение.</p>
      </section>

      <section className="section" id="catalog">
        <div className="section-head">
          <div>
            <p className="section-label">01 · Products</p>
            <h2>{t.catalog}</h2>
            <p>{t.catalogText}</p>
          </div>
          <div className="filters" aria-label="Категории каталога">
            <button className={active === 'all' ? 'active' : ''} onClick={() => setActive('all')}>{t.all}</button>
            {(Object.keys(categories) as Category[]).map((category) => (
              <button key={category} className={active === category ? 'active' : ''} onClick={() => setActive(category)}>
                {categories[category][lang]}
              </button>
            ))}
          </div>
        </div>
        <div className="catalog-grid">
          {visibleProducts.map((product) => (
            <article className="product-card" key={product.name}>
              <p>{categories[product.category][lang]}</p>
              <h3>{product.name}</h3>
              <span>{product.details}</span>
              <div>
                <strong>{product.price === 'по запросу' ? product.price : `${t.from} ${product.price}`}</strong>
                <small>{product.tax}</small>
              </div>
              <a href="#contacts">{t.ask}</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section dark" id="process">
        <p className="section-label">02 · Workflow</p>
        <h2>{t.process}</h2>
        <div className="steps">
          {steps.map((step, index) => (
            <div key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="audience">
        <p className="section-label">03 · Segments</p>
        <h2>{t.audience}</h2>
        <div className="audience-grid">
          {audiences.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="section why">
        <p className="section-label">04 · Difference</p>
        <h2>{t.why}</h2>
        <div className="advantage-grid">
          {advantages.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section certificates">
        <div>
          <p className="section-label">05 · Documents</p>
          <h2>{t.certificates}</h2>
        </div>
        <p>{t.certificatesText}</p>
      </section>

      <section className="section contacts" id="contacts">
        <div>
          <p className="section-label">06 · Request</p>
          <h2>{t.formTitle}</h2>
          <p>{t.formText}</p>
          <div className="contact-panel">
            <a href={`https://wa.me/${phone}`} target="_blank">WhatsApp +7 777 131 18 88</a>
            <span>{t.requisites}</span>
          </div>
        </div>
        <form onSubmit={sendRequest}>
          <input name="company" placeholder={t.company} required />
          <select name="segment" defaultValue="" required>
            <option value="" disabled>{t.segment}</option>
            {audiences.map((item) => <option key={item}>{item}</option>)}
          </select>
          <textarea name="need" placeholder={t.need} rows={4} required />
          <input name="volume" placeholder={t.volume} />
          <input name="contact" placeholder={t.contact} required />
          <button type="submit">{t.submit}</button>
        </form>
      </section>

      <footer>
        <span>DESIVE</span>
        <p>{t.requisites}</p>
      </footer>

      <a className="whatsapp" href={`https://wa.me/${phone}`} target="_blank" aria-label="WhatsApp">
        WA
      </a>
    </main>
  )
}

export default App
