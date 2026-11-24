import { useEffect, useState } from 'react'
import './App.css'
import './Editorial.css'

const brands = [
  { name: 'Pick n Pay', category: 'Food', icon: '/brands/pick-n-pay.png' },
  { name: 'Orbit', category: 'Everyday', icon: '/brands/orbit.png' },
  { name: 'SHIELD', category: 'Beauty', icon: '/brands/shield.png' },
  { name: 'Vaseline', category: 'Beauty', icon: '/brands/vaseline.png' },
  { name: 'Pedros', category: 'Food', icon: '/brands/pedros.png' },
  { name: 'Chicken Licken', category: 'Food', icon: '/brands/chicken-licken.png' },
  { name: 'Med-Lemon', category: 'Everyday', icon: '/brands/med-lemon.png' },
  { name: 'Domestos', category: 'Everyday', icon: '/brands/domestos.png' },
  { name: 'PEP', category: 'Lifestyle', icon: '/brands/pep.png' },
  { name: 'Mazda', category: 'Lifestyle', icon: '/brands/mazda.svg' },
  { name: 'Simba', category: 'Food', icon: '/brands/simba.png' },
  { name: 'Switch', category: 'Lifestyle' },
  { name: 'Mr D', category: 'Food', icon: '/brands/mr-d.png' },
  { name: 'Google Gemini', category: 'Tech', icon: '/brands/google-gemini.svg' },
  { name: 'CeraVe', category: 'Beauty', icon: '/brands/cerave.png' },
  { name: 'KFC', category: 'Food', icon: '/brands/kfc.svg' },
  { name: 'Garnier', category: 'Beauty', icon: '/brands/garnier.png' },
  { name: 'Telkom', category: 'Tech', icon: '/brands/telkom.png' },
  { name: "McDonald's", category: 'Food', icon: '/brands/mcdonalds.svg' },
  { name: 'absa', category: 'Lifestyle', icon: '/brands/absa.png' },
  { name: 'bash', category: 'Lifestyle', icon: '/brands/bash.png' },
  { name: 'Colgate', category: 'Beauty', icon: '/brands/colgate.png' },
]

const filters = ['All', 'Food', 'Beauty', 'Lifestyle', 'Tech', 'Everyday']

const campaignVideos = [
  '/campaigns/campaign-01.mp4',
  '/campaigns/campaign-02.mp4',
  '/campaigns/campaign-03.mp4',
  '/campaigns/campaign-04.mp4',
  '/campaigns/campaign-05.mp4',
  '/campaigns/campaign-06.mp4',
]

const campaignColumns = [
  campaignVideos.slice(0, 2),
  campaignVideos.slice(2, 4),
  campaignVideos.slice(4, 6),
]

const creativeLenses = [
  {
    id: 'comedy',
    title: 'Comedy that converts.',
    label: 'SKITS',
    button: 'Skits',
    description: 'Relatable South African humour, characters, POVs and trends. Make the product the punchline — not the ad.',
    viewfinder: 'Best for awareness, shares and product launches.',
    color: 'coral',
  },
  {
    id: 'vlogs',
    title: 'Real life with Dion.',
    label: 'VLOGS',
    button: 'Vlogs',
    description: 'Day-in-my-life, GRWM, errands, events and behind-the-scenes. Audiences trust Dion because it feels real, not scripted.',
    viewfinder: 'Best for trust, brand love and day-to-day usage.',
    color: 'lilac',
  },
  {
    id: 'lifestyle',
    title: 'Fashion, beauty & glow.',
    label: 'LIFESTYLE',
    button: 'Lifestyle',
    description: 'Outfits, skincare, self-care and aesthetic content — from fits to beauty routines.',
    viewfinder: 'Best for fashion, beauty, retail and self-care.',
    color: 'mint',
  },
  {
    id: 'food',
    title: 'Food people actually make.',
    label: 'COOKING',
    button: 'Food',
    description: 'Easy, fun, budget-friendly recipes — from quick meals to viral food trends, with clear product integration.',
    viewfinder: 'Best for food, grocery, retail and kitchen brands.',
    color: 'peach',
  },
  {
    id: 'travel',
    title: 'Dion on the road.',
    label: 'TRAVEL',
    button: 'Travel',
    description: 'Trips, stays, events and city guides. Show the experience, not just the place — hotels, food, culture and adventure.',
    viewfinder: 'Best for tourism, hospitality, events and airlines.',
    color: 'blue',
  },
]

const packages = [
  {
    number: '01',
    title: 'The all-in-one Dion package',
    description: 'One booking. Content for every platform. Built for brands that want it all.',
    details: ['1 x skit + 1 x vlog', '1 x lifestyle + 1 x cooking', '1 x travel piece'],
  },
  {
    number: '02',
    title: 'Stories + UGC',
    description: 'Extra content for your channels to post and reuse.',
    details: ['3 x Stories + 2 x UGC videos', 'Raw + edited deliverables', 'Captions, hooks and hashtags'],
    featured: true,
  },
  {
    number: '03',
    title: 'Custom collaborations',
    description: 'A package shaped around your campaign, audience and goals.',
    details: ['Single posts and ambassadorships', 'Travel collaborations', 'Usage and exclusivity agreed together'],
  },
]

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      <path d="M3.5 12.5 12 4m0 0H5m7 0v7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function InstagramLink({ children, className = '' }) {
  return (
    <a
      className={className}
      href="https://www.instagram.com/officiallyjustdion/"
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  )
}

function App() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeLens, setActiveLens] = useState(creativeLenses[0])
  const [menuOpen, setMenuOpen] = useState(false)
  const [shutterKey, setShutterKey] = useState(0)
  const [reelPaused, setReelPaused] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [reelInView, setReelInView] = useState(false)
  const [reelStatus, setReelStatus] = useState('')
  const visibleBrands =
    activeFilter === 'All' ? brands : brands.filter((brand) => brand.category === activeFilter)
  const activeLensIndex = creativeLenses.findIndex((lens) => lens.id === activeLens.id)

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [activeFilter])

  useEffect(() => {
    const section = document.querySelector('#campaigns')
    if (!section) return undefined

    const videos = section.querySelectorAll('.campaign-video')
    let isInView = false
    const syncPlayback = () => {
      const shouldPlay = !reelPaused && isInView && !document.hidden
      setReelInView(shouldPlay)

      videos.forEach((video) => {
        if (!shouldPlay) {
          video.pause()
          return
        }

        video.play().catch((error) => {
          if (error.name === 'AbortError') return

          if (error.name === 'NotAllowedError') {
            setReelPaused(true)
            setReelStatus('Playback was paused by your browser. Press play to start the reel.')
            return
          }

          console.error('A campaign video could not be played.', error)
          setReelStatus('A campaign clip could not be played. Try reloading the page.')
        })
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        isInView = entries.some((entry) => entry.isIntersecting)
        syncPlayback()
      },
      { threshold: 0.1 },
    )
    observer.observe(section)
    document.addEventListener('visibilitychange', syncPlayback)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
    }
  }, [reelPaused])

  const closeMenu = () => setMenuOpen(false)
  const chooseLens = (lens) => {
    setActiveLens(lens)
    setShutterKey((key) => key + 1)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner section-wrap">
          <a className="wordmark" href="#home" aria-label="Just Dion, home" onClick={closeMenu}>
            JUST<span>DION<span className="wordmark-dot">.</span></span>
          </a>
          <button
            aria-controls="main-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
          >
            <span />
            <span />
          </button>
          <nav
            className={menuOpen ? 'main-nav is-open' : 'main-nav'}
            id="main-navigation"
            aria-label="Main navigation"
          >
            <a href="#about" onClick={closeMenu}>The story</a>
            <a href="#content" onClick={closeMenu}>My lens</a>
            <a href="#campaigns" onClick={closeMenu}>Campaigns</a>
            <a href="#brands" onClick={closeMenu}>Brand friends</a>
            <a href="#contact" onClick={closeMenu}>DM to book</a>
          </nav>
          <InstagramLink className="header-cta">
            DM to book <ArrowIcon />
          </InstagramLink>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-orb hero-orb-one" aria-hidden="true" />
          <div className="hero-orb hero-orb-two" aria-hidden="true" />
          <div className="hero-layout section-wrap">
            <div className="hero-copy">
              <p className="eyebrow"><span className="eyebrow-dot" /> Based in South Africa · Available for travel &amp; shoots</p>
              <p className="hero-kicker">OFFICIALLY JUST DION</p>
              <h1>Just Dion.<br /><span>The All-In-One Creator.</span></h1>
              <p className="hero-description">
                Comedy skits that go viral, vlogs that feel like real life, lifestyle and fashion,
                cooking people actually try, and travel content that makes you want to go.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#campaigns">See the work <ArrowIcon /></a>
                <InstagramLink className="text-link">DM to book <ArrowIcon /></InstagramLink>
              </div>
              <div className="hero-note">
                <span className="note-line" />
                <span>Funny, warm, authentic, high-energy, proudly South African.</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-image-frame">
                <img src="/dion-hero.png" alt="Dion at an Absa brand experience" />
                <div className="image-caption">
                  <span>ABSA BRAND EXPERIENCE</span>
                  <strong>OFFICIALLY JUST DION</strong>
                </div>
              </div>
              <div className="hero-sticker" aria-label="70 thousand Instagram followers">
                <span>INSTAGRAM</span>
                <strong>70K</strong>
                <span>FOLLOWERS</span>
              </div>
            </div>
          </div>
          <a className="scroll-cue" href="#numbers" aria-label="Scroll to audience numbers">
            <span>THE NUMBERS</span>
            <span className="scroll-cue-line" />
          </a>
        </section>

        <section className="numbers-section" id="numbers" aria-label="Audience and reach">
          <div className="numbers-inner section-wrap">
            <p className="numbers-label">Audience: 18–34 · South African Gen Z &amp; millennials who buy, share &amp; comment.</p>
            <div className="stats-grid">
              <div className="stat stat-coral"><strong>70K</strong><span>Instagram</span></div>
              <div className="stat stat-lilac"><strong>47K</strong><span>TikTok</span></div>
              <div className="stat stat-mint"><strong>11.11M<span>+</span></strong><span>Total views</span></div>
              <div className="stat stat-peach"><strong>22<span>+</span></strong><span>Brands worked with</span></div>
            </div>
          </div>
        </section>

        <section className="about-section section-wrap section-pad" id="about">
          <div className="about-story reveal">
            <p className="eyebrow">01 / WHO IS DION?</p>
            <h2>Who is<br /><span>Dion?</span></h2>
            <p className="about-signoff">5 pillars. 1 loyal audience. Endless brand angles.</p>
            <figure className="about-portrait">
              <img
                src="/dion-photos/dion-real-life.png"
                alt="Dion in a candid portrait"
                decoding="async"
                loading="lazy"
              />
              <figcaption className="about-photo-caption">
                <span>BEHIND THE BRIEF</span>
                <strong>JUST DION, OFF CAMERA.</strong>
              </figcaption>
            </figure>
          </div>
          <div className="about-copy reveal">
            <p className="about-lead">
              One creator for five content types — less briefing, more content.
            </p>
            <p>
              Proven with 20+ South African brands across retail, food, beauty, telco, auto and
              FMCG. Funny, warm, authentic and high-energy — with content made for people who buy,
              share and comment.
            </p>
            <div className="audience-note">
              <span className="audience-icon">SA</span>
              <span><strong>85%+ South African audience.</strong><br />Based in South Africa. Available for travel &amp; shoots.</span>
            </div>
          </div>
          <div className="city-strip reveal" aria-label="Audience locations in South Africa">
            <span>Durban</span><i /> <span>Johannesburg</span><i /> <span>Cape Town</span><i /> <span>Pretoria</span>
          </div>
        </section>

        <section className="creative-section section-pad" id="content">
          <div className="section-wrap">
          <div className="creative-heading reveal">
            <div>
              <p className="eyebrow">02 / THE FIVE PILLARS</p>
              <h2>Skits. Vlogs.<br /><span>Lifestyle. Cooking. Travel.</span></h2>
            </div>
            <p>
              One creator for five content types — less briefing, more content. Choose a pillar to
              see where your brand fits.
            </p>
          </div>
          <div className="lens-studio">
            <div className="lens-copy reveal" aria-live="polite">
              <span className="lens-index">LENS {String(activeLensIndex + 1).padStart(2, '0')} / 05</span>
              <p className="lens-label">{activeLens.label}</p>
              <h3>{activeLens.title}</h3>
              <p className="lens-description">{activeLens.description}</p>
              <div className="lens-controls" role="group" aria-label="Choose a creative lens">
                {creativeLenses.map((lens, index) => (
                  <button
                    aria-pressed={activeLens.id === lens.id}
                    className={activeLens.id === lens.id ? 'lens-button is-active' : 'lens-button'}
                    key={lens.id}
                    onClick={() => chooseLens(lens)}
                    type="button"
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {lens.button}
                  </button>
                ))}
              </div>
              <a className="text-link lens-link" href="#contact">
                Put my lens on your brief <ArrowIcon />
              </a>
            </div>
            <div className={`viewfinder viewfinder-${activeLens.color}`} aria-hidden="true">
              <div className="viewfinder-grain" />
              <div className="viewfinder-top">
                <span><b>JD</b> CREATIVE VIEWFINDER</span>
                <span>FRAME {String(activeLensIndex + 1).padStart(2, '0')} / 05</span>
              </div>
              <div className="viewfinder-center">
                <span className="focus-corner focus-top-left" />
                <span className="focus-corner focus-top-right" />
                <span className="focus-corner focus-bottom-left" />
                <span className="focus-corner focus-bottom-right" />
                <span className="aperture-ring"><i /></span>
                <div className="viewfinder-caption">
                  <span>THROUGH THIS LENS</span>
                  <strong>{activeLens.viewfinder}</strong>
                </div>
              </div>
              <div className="viewfinder-bottom">
                <span>MADE OF REAL LIFE</span>
                <span>{activeLens.label}</span>
              </div>
              <div className="shutter-flash" key={shutterKey} />
            </div>
            </div>
          </div>
        </section>

        <section
          className={`campaign-reel-section section-pad${reelPaused ? ' is-paused' : ''}${reelInView ? ' is-in-view' : ''}`}
          id="campaigns"
          aria-labelledby="campaign-heading"
        >
          <div className="campaign-heading section-wrap reveal">
            <div className="section-heading">
              <p className="eyebrow">03 / THE PROJECT WALL</p>
              <h2 id="campaign-heading">Real work.<br /><span>Real Dion.</span></h2>
            </div>
            <p>
              Six real campaign clips, rolling together. Funny, warm, authentic and proudly South African.
            </p>
          </div>
          <div className="campaign-stage section-wrap">
            <div className="campaign-wall" role="group" aria-label="Dion's moving campaign video wall">
              {campaignColumns.map((column, columnIndex) => (
                <div className={`campaign-column campaign-column-${columnIndex + 1}`} key={columnIndex}>
                  <div className="campaign-track">
                    {column.map((src, clipIndex) => {
                      const index = columnIndex * 2 + clipIndex
                      return (
                        <figure
                          aria-label={`Focus campaign clip ${String(index + 1).padStart(2, '0')}`}
                          className="campaign-frame"
                          key={src}
                          tabIndex={0}
                        >
                          <video
                            aria-label={`Campaign clip ${String(index + 1).padStart(2, '0')}`}
                            className="campaign-video"
                            loop
                            muted
                            playsInline
                            preload="none"
                            src={src}
                          />
                          <figcaption className="campaign-frame-caption">
                            <span>{String(index + 1).padStart(2, '0')}</span>
                            <span>PROJECT</span>
                          </figcaption>
                        </figure>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="campaign-footer section-wrap reveal">
            <span className="campaign-live-indicator">
              <i aria-hidden="true" />
              {reelPaused ? 'WALL PAUSED' : 'WALL IN MOTION'}
            </span>
            <p>Focus a clip to bring it forward, or let all six projects roll.</p>
            <button
              aria-pressed={!reelPaused}
              className="campaign-toggle"
              onClick={() => {
                setReelStatus('')
                setReelPaused((paused) => !paused)
              }}
              type="button"
            >
              {reelPaused ? 'Play the wall' : 'Pause the wall'}
            </button>
            <span aria-live="polite" className="campaign-status">{reelStatus}</span>
          </div>
        </section>

        <section className="brands-section section-pad" id="brands">
          <div className="section-wrap">
            <div className="brands-heading reveal">
              <div className="section-heading">
                <p className="eyebrow">04 / GOOD COMPANY</p>
                <h2>20+ South African<br /><span>brands trust Dion.</span></h2>
              </div>
              <p>Retail, food, beauty, telco, auto and FMCG — from first brief to final post.</p>
            </div>
            <div className="brand-filters reveal" role="group" aria-label="Filter brands by category">
              {filters.map((filter) => (
                <button
                  aria-pressed={activeFilter === filter}
                  className={activeFilter === filter ? 'filter-button is-active' : 'filter-button'}
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  type="button"
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="brand-grid" aria-live="polite">
              {visibleBrands.map((brand, index) => (
                <div className={`brand-tile brand-tone-${index % 6} reveal`} key={brand.name}>
                  {brand.icon && (
                    <span className="brand-logo-wrap">
                      <img alt="" className="brand-logo" decoding="async" loading="lazy" src={brand.icon} />
                    </span>
                  )}
                  <span className="brand-name">{brand.name}</span>
                </div>
              ))}
            </div>
            <p className="brand-footnote">A few familiar names. Always room for a new story.</p>
          </div>
        </section>

        <section className="partnership-section section-pad" id="partnerships">
          <div className="section-wrap">
            <div className="section-heading partnership-heading reveal">
              <p className="eyebrow">05 / THE COLLAB</p>
              <h2>A good fit makes<br /><span>great content.</span></h2>
              <p>One booking. Content for every platform. Built for brands that want it all.</p>
            </div>
            <div className="package-grid">
              {packages.map((item) => (
                <article className={`package-card reveal ${item.featured ? 'is-featured' : ''}`} key={item.number}>
                  <span className="package-number">{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.details.map((detail) => <li key={detail}>{detail}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <div className="process-row reveal">
              <span className="process-title">THE PROCESS</span>
              <div><b>01</b><span>Brief &amp; ideas</span></div>
              <i />
              <div><b>02</b><span>Shoot &amp; edit</span></div>
              <i />
              <div><b>03</b><span>You approve</span></div>
              <i />
              <div><b>04</b><span>I post + you get UGC</span></div>
            </div>
            <p className="rates-note"><strong>Rates on request.</strong> DM for custom packages, single posts, ambassadorships &amp; travel collabs. Rates depend on deliverables, usage and exclusivity.</p>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-card reveal">
            <div className="contact-copy">
                <p className="eyebrow">06 / YOUR TURN</p>
                <h2>Let's create something people actually <em>watch, share &amp; buy from.</em></h2>
                <p>DM to book. Based in South Africa — available for travel &amp; shoots.</p>
              <InstagramLink className="button button-dark">
                  DM to book <ArrowIcon />
              </InstagramLink>
            </div>
            <div className="contact-aside">
              <span className="contact-spark" aria-hidden="true">✳</span>
              <span>South Africa<br />Available to travel</span>
              <span className="contact-handle">@officiallyjustdion</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="wordmark footer-wordmark" href="#home">
          JUST<span>DION<span className="wordmark-dot">.</span></span>
        </a>
        <span>Funny, warm, authentic, high-energy and proudly South African.</span>
        <InstagramLink className="footer-link">Instagram <ArrowIcon /></InstagramLink>
        <span className="copyright">© {new Date().getFullYear()} Just Dion</span>
      </footer>
    </div>
  )
}

export default App
