import { useState, useEffect } from 'react';
import { ChevronDown, Instagram, Youtube, Mail, MessageCircle, ArrowRight } from 'lucide-react';

declare global {
  interface Window {
    ml: (...args: unknown[]) => void;
  }
}

/* ── Scroll reveal hook ── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ── Silhouette SVG ── */
function SilhouetteSVG() {
  return (
    <svg viewBox="0 0 200 300" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="80" rx="45" ry="55" />
      <path d="M100 140 C40 140 10 200 10 280 L10 300 L190 300 L190 280 C190 200 160 140 100 140Z" />
    </svg>
  );
}


/* ════════════════════════════
   MAIN APP
   ════════════════════════════ */
export default function App() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  useScrollReveal();

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleRegister = () => {
    setShowModal(true);
    // Move the MailerLite form from the off-screen holder into our modal
    setTimeout(() => {
      const mlForm = document.querySelector('#ml-form-holder .ml-embedded');
      const modalWrap = document.querySelector('.modal__form-wrap');
      if (mlForm && modalWrap) {
        modalWrap.appendChild(mlForm);
      }
    }, 50);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Move the form back to the off-screen holder
    setTimeout(() => {
      const mlForm = document.querySelector('.modal__form-wrap .ml-embedded');
      const holder = document.getElementById('ml-form-holder');
      if (mlForm && holder) {
        holder.appendChild(mlForm);
      }
    }, 300);
  };

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // ── Speakers data ──
  const speakers = [
    { name: 'Oyewunmi Fasoro', org: 'DIVINE SISTERS MINISTRY', role: 'Convener', image: '/images/Mrs Oye.JPEG' },
    { name: 'Speaker 2', org: 'TO BE ANNOUNCED', role: 'Guest Speaker', image: '', isSilhouette: true },
    { name: 'Speaker 3', org: 'TO BE ANNOUNCED', role: 'Guest Speaker', image: '', isSilhouette: true },
    { name: 'Speaker 4', org: 'TO BE ANNOUNCED', role: 'Panelist', image: '', isSilhouette: true },
    { name: 'Speaker 5', org: 'TO BE ANNOUNCED', role: 'Panelist', image: '', isSilhouette: true },
    { name: 'Worship Leader', org: 'TO BE ANNOUNCED', role: 'Worship Leader', image: '', isSilhouette: true },
  ];

  // ── FAQ data ──
  const faqs = [
    { q: 'When is the summit taking place?', a: 'The summit will hold on Friday 20th March and Saturday 21st March 2026. It is a two-day virtual experience designed for reflection, depth, and activation.' },
    { q: 'Is the event virtual or in person?', a: 'The summit is fully virtual, making it accessible to women from anywhere in the world.' },
    { q: "What is this year's theme about?", a: "This year's theme, 'Made For More,' is a deeper call to identity and spiritual alignment. It reminds us that we are more than our setbacks, limitations, and even our achievements. We are God's workmanship, intentionally created for His glory and prepared for good works." },
    { q: 'What will happen on Day 1?', a: "Day 1 will feature a reflective panel session where speakers share what being 'Made For More' means to them, when they realised they were created for more, and how faith anchored them through seasons of growth and transition." },
    { q: 'What will happen on Day 2?', a: 'Day 2 is a Bible Study Masterclass and Prayer Session focused on spiritual empowerment. Our guest speaker will share her journey of spiritual growth and teach practical steps to study the Bible intentionally. The day concludes with a powerful time of prayer for alignment and depth.' },
    { q: 'Will there be replays if I miss a session?', a: 'Yes! Registered attendees will receive limited-time access to replays after the event.' },
  ];

  // ── Agenda data ──
  const day1 = [
    { time: '6:00 PM (UK) / 7:00 PM (WAT)', title: 'Opening & Welcome', type: 'Welcome' },
    { time: '6:15 PM (UK) / 7:15 PM (WAT)', title: 'Panel Session: What Does "Made For More" Mean?', type: 'Panel' },
    { time: '7:15 PM (UK) / 8:15 PM (WAT)', title: 'Reflective Discussion & Q&A', type: 'Discussion' },
    { time: '8:00 PM (UK) / 9:00 PM (WAT)', title: 'Closing Prayer & Reflection', type: 'Prayer' },
  ];
  const day2 = [
    { time: '10:00 AM (UK) / 11:00 AM (WAT)', title: 'Opening & Worship', type: 'Welcome' },
    { time: '10:15 AM (UK) / 11:15 AM (WAT)', title: 'Bible Study Masterclass', type: 'Masterclass' },
    { time: '11:15 AM (UK) / 12:15 PM (WAT)', title: 'Practical Steps for Intentional Bible Study', type: 'Workshop' },
    { time: '12:00 PM (UK) / 1:00 PM (WAT)', title: 'Prayer Session: Alignment & Depth', type: 'Prayer' },
  ];
  const agenda = activeDay === 1 ? day1 : day2;

  return (
    <>
      {/* ─────── NAVIGATION ─────── */}
      <nav className={`nav ${navScrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav__logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <img src="/images/divine-logo.png" alt="Divine Sisters Ministry" className="nav__logo-img" />
        </a>
        <div className="nav__links">
          <button className="nav__link" onClick={() => scrollTo('about')}>About</button>
          <button className="nav__link" onClick={() => scrollTo('speakers')}>Speakers</button>
          <button className="nav__link" onClick={() => scrollTo('agenda')}>Agenda</button>
          <button className="nav__link" onClick={() => scrollTo('faq')}>FAQ</button>
          <button className="nav__cta" onClick={handleRegister}>Register Now</button>
        </div>
        <button className="nav__hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <button className="mobile-menu__link" onClick={() => scrollTo('about')}>About</button>
        <button className="mobile-menu__link" onClick={() => scrollTo('speakers')}>Speakers</button>
        <button className="mobile-menu__link" onClick={() => scrollTo('agenda')}>Agenda</button>
        <button className="mobile-menu__link" onClick={() => scrollTo('faq')}>FAQ</button>
        <button className="nav__cta" style={{ marginTop: 12, alignSelf: 'flex-start' }} onClick={() => { setMobileOpen(false); handleRegister(); }}>Register Now</button>
      </div>

      {/* ─────── HERO (dark, like reference) ─────── */}
      <section className="hero">
        <div className="hero__theme reveal">THEME: MADE FOR MORE</div>
        <h1 className="hero__title reveal">
          The Limitless<br />Woman<br />Summit 2026
        </h1>
        <div className="hero__bottom reveal reveal-d1">
          <button className="hero__cta" onClick={handleRegister}>
            <ArrowRight size={18} /> Register Now
          </button>
          <div className="hero__meta">
            <span>Friday & Saturday, March 20–21</span>
            <span>Virtual Summit</span>
            <span>Youtube</span>
          </div>
        </div>
      </section>

      {/* ─────── MAIN SURFACE (light rounded container) ─────── */}
      <div className="main-surface">

        {/* ─── ABOUT ─── */}
        <section className="about" id="about">
          <div className="about__inner">
            <div className="about__content">
              <div className="section-label reveal">
                <span className="section-label__wave">〰</span> ABOUT
              </div>
              <div className="about__text-wrap">
                <h2 className="about__heading reveal">
                  The Limitless Woman Summit 2026 is a <strong>two-day virtual experience</strong>{' '}
                  <span>celebrating International Women's Day and Mother's Day, where women of faith, purpose, and vision step into their God-given identity. Rooted in Ephesians 2:10, it reminds every woman she is God's workmanship, created for good works, empowered, and equipped to do exploits.</span>
                </h2>
              </div>
            </div>
            <div className="about__stats">
              <div className="stat reveal">
                <div className="stat__number">2</div>
                <div className="stat__label">📅 DAYS</div>
              </div>
              <div className="stat reveal reveal-d1">
                <div className="stat__number">5+1</div>
                <div className="stat__label">🎤 SPEAKERS & WORSHIP LEAD</div>
              </div>
              <div className="stat reveal reveal-d2">
                <div className="stat__number">∞</div>
                <div className="stat__label">🌍 GLOBAL REACH</div>
              </div>
              <div className="stat reveal reveal-d3">
                <div className="stat__number">3</div>
                <div className="stat__label">📖 SESSIONS</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── WHAT TO EXPECT ─── */}
        <section className="expect">
          <div className="expect__inner">
            <div className="section-label reveal">
              <span className="section-label__wave">〰</span> WHAT'S ON
            </div>
            <div className="expect__header">
              <h2 className="expect__title reveal">What to expect</h2>
              <p className="expect__subtitle reveal reveal-d1">
                Join our Convener, Oyewunmi Fasoro, for a fully virtual experience accessible from anywhere in the world.
              </p>
            </div>
            <div className="expect__grid">
              <div className="expect__card reveal">
                <div className="expect__card-top">
                  <h3 className="expect__card-title">Reflective<br />panel session</h3>
                  <span className="expect__card-num">01</span>
                </div>
                <p className="expect__card-bottom">
                  A deep exploration of what it means to be "Made For More" and how <strong>faith anchors us</strong> through life's transitions.
                </p>
              </div>
              <div className="expect__card reveal reveal-d1">
                <div className="expect__card-top">
                  <h3 className="expect__card-title">Bible Study<br />Masterclass</h3>
                  <span className="expect__card-num">02</span>
                </div>
                <p className="expect__card-bottom">
                  Learn <strong>practical steps</strong> to study the Bible intentionally with actionable takeaways for spiritual growth.
                </p>
              </div>
              <div className="expect__card reveal reveal-d2">
                <div className="expect__card-top">
                  <h3 className="expect__card-title">Powerful<br />prayer session</h3>
                  <span className="expect__card-num">03</span>
                </div>
                <p className="expect__card-bottom">
                  A closing time of <strong>prayer</strong> focused on spiritual alignment and depth. Come expectant.
                </p>
              </div>
              <div className="expect__card expect__card--dark reveal reveal-d3">
                <div className="expect__card-top">
                  <h3 className="expect__card-title">Subscribe to<br />our YouTube</h3>
                  <span className="expect__card-num">〰</span>
                </div>
                <div>
                  <a className="expect__card-cta" href="https://www.youtube.com/@DivineSistersMinistryTV" target="_blank" rel="noopener noreferrer">
                    <ArrowRight size={16} /> Subscribe Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SPEAKERS (like reference: title left, grid right) ─── */}
        <section className="speakers" id="speakers">
          <div className="speakers__inner">
            <div className="speakers__layout">
              <div className="speakers__left">
                <div className="section-label reveal">
                  <span className="section-label__wave">〰</span> SPEAKERS
                </div>
                <h2 className="speakers__title reveal">
                  Meet Our<br />Speakers
                </h2>
                <p className="speakers__desc reveal reveal-d1">
                  Hear from women who walk in purpose and are passionate about empowering others.
                </p>
              </div>
              <div className="speakers__grid">
                {speakers.map((s, i) => (
                  <div className={`speaker-card reveal reveal-d${Math.min(i + 1, 5)}`} key={i}>
                    <div className="speaker-card__img-wrap">
                      {s.isSilhouette ? (
                        <div className="speaker-card__silhouette"><SilhouetteSVG /></div>
                      ) : (
                        <img src={s.image} alt={s.name} />
                      )}
                    </div>
                    <div className="speaker-card__name">{s.name}</div>
                    <div className="speaker-card__org">{s.org}</div>
                    <div className="speaker-card__role">{s.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── MARQUEE DIVIDER ─── */}
        <div className="marquee-wrap">
          <div className="marquee">
            {[...Array(3)].map((_, i) => (
              <span className="marquee__item" key={`m1-${i}`}>
                MARCH 20-21, 2026 <span className="marquee__item">MADE FOR MORE</span>
                <span className="marquee__item">EPHESIANS 2:10</span>
                <span className="marquee__item">IDENTITY</span>
                <span className="marquee__item">PURPOSE</span>
                <span className="marquee__item">FAITH</span>
              </span>
            ))}
          </div>
        </div>

        {/* ─── AGENDA ─── */}
        <section className="agenda" id="agenda">
          <div className="agenda__inner">
            <div className="section-label reveal">
              <span className="section-label__wave">〰</span> AGENDA
            </div>
            <div className="agenda__header">
              <h2 className="agenda__title reveal">The Experience</h2>
            </div>

            <div className="agenda__tabs reveal">
              <button className={`agenda__tab ${activeDay === 1 ? 'agenda__tab--active' : ''}`} onClick={() => setActiveDay(1)}>
                Day 1
              </button>
              <button className={`agenda__tab ${activeDay === 2 ? 'agenda__tab--active' : ''}`} onClick={() => setActiveDay(2)}>
                Day 2
              </button>
            </div>

            <div className="agenda__day-info reveal">
              {activeDay === 1 ? (
                <>
                  <div className="agenda__day-title">Day 1 — Reflection & Growth</div>
                  <div className="agenda__day-time">Friday 20th March · 6:00 PM – 8:30 PM (UK) | 7:00 PM – 9:30 PM (WAT)</div>
                </>
              ) : (
                <>
                  <div className="agenda__day-title">Day 2 — Depth & Activation</div>
                  <div className="agenda__day-time">Saturday 21st March · 10:00 AM – 12:30 PM (UK) | 11:00 AM – 1:30 PM (WAT)</div>
                </>
              )}
            </div>

            {agenda.map((item, i) => (
              <div className="agenda__item reveal" key={i}>
                <div className="agenda__time">{item.time}</div>
                <div className="agenda__item-title">{item.title}</div>
                <div className="agenda__item-type">{item.type}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── WHY ATTEND ─── */}
        <section className="why-attend">
          <div className="why-attend__inner">
            <div className="section-label reveal">
              <span className="section-label__wave">〰</span> WHY ATTEND
            </div>
            <div className="why-attend__header">
              <h2 className="why-attend__title reveal">Why you<br />should be there</h2>
              <p className="why-attend__subtitle reveal reveal-d1">
                More than an event — it's a movement for women who know they were made for more.
              </p>
            </div>
            <div className="why-attend__grid">
              <div className="why-attend__card reveal">
                <div>
                  <div className="why-attend__card-icon">🌍</div>
                  <h3 className="why-attend__card-title">Virtual<br />Accessibility</h3>
                </div>
                <p className="why-attend__card-text">
                  Join the global community of women from the comfort of your home. No travel required — just your heart, your Bible, and your device.
                </p>
              </div>
              <div className="why-attend__card reveal reveal-d1">
                <div>
                  <div className="why-attend__card-icon">✨</div>
                  <h3 className="why-attend__card-title">Spiritual<br />Empowerment</h3>
                </div>
                <p className="why-attend__card-text">
                  Move beyond limitations and align your life with God's workmanship. Step into who you were created to be.
                </p>
              </div>
              <div className="why-attend__card reveal reveal-d2">
                <div>
                  <div className="why-attend__card-icon">🎬</div>
                  <h3 className="why-attend__card-title">Replay<br />Access</h3>
                </div>
                <p className="why-attend__card-text">
                  Registered attendees will receive limited-time access to replays after the event. Never miss a moment of impact.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section className="faq" id="faq">
          <div className="faq__inner">
            <div className="section-label reveal">
              <span className="section-label__wave">〰</span> FAQ
            </div>
            <div className="faq__header">
              <h2 className="faq__title reveal">FAQ</h2>
              <div className="reveal reveal-d1">
                <p className="faq__desc">Still got questions? Feel free to reach out. We're happy to help.</p>
                <a href="https://wa.me/+2348099442606" target="_blank" rel="noopener noreferrer" className="link-btn" style={{ marginTop: 20 }}>
                  <ArrowRight size={18} /> Ask a question
                </a>
              </div>
            </div>
            <div className="faq__items">
              {faqs.map((faq, i) => (
                <div className={`faq__item ${openFAQ === i ? 'faq__item--open' : ''}`} key={i}>
                  <button className="faq__question" onClick={() => setOpenFAQ(openFAQ === i ? null : i)}>
                    <span>{faq.q}</span>
                    <ChevronDown size={20} className="faq__chevron" />
                  </button>
                  <div className="faq__answer"><p>{faq.a}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── ABOUT MINISTRY ─── */}
        <section className="ministry">
          <div className="ministry__inner">
            <div className="ministry__img-wrap reveal">
              <img src="/images/divine-logo.png" alt="Divine Sisters Ministry Logo" />
            </div>
            <div className="reveal reveal-d1">
              <div className="section-label">
                <span className="section-label__wave">〰</span> ABOUT US
              </div>
              <h2 className="ministry__title">Divine Sisters Ministry</h2>
              <p className="ministry__text">
                Divine Sisters Ministry is a non-denominational, faith-based community that encourages, equips, and empowers women to deepen their relationship with God. Whether you are rededicating your life or looking for more depth, we provide a safe, non-judgmental space to grow without the pressure to be perfect.
              </p>
              <p className="ministry__text">
                We know what it's like to crave a spiritual home where you can be yourself—to love God boldly while staying honest about the journey. Through connection, mentorship, and support, we help you build meaningful friendships and walk in obedience in every area of life.
              </p>
              <blockquote className="ministry__scripture">
                “But the people who know their God shall be strong, and carry out great exploits.”
                <cite>— Daniel 11:32b</cite>
              </blockquote>
              <p className="ministry__text">
                We believe that when a woman truly knows her God, strength follows, and exploits become inevitable.
              </p>
              <p className="ministry__motto"><strong>Know God, Be Strong & Do Exploits.</strong></p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSclfLMwDKoFsA7Atb2z_Ydh1csjt0yu7I1tcUA3XB9_b80x5Q/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <ArrowRight size={16} /> Join our Community
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ─────── FOOTER CTA (dark, like reference) ─────── */}
      <footer className="footer-cta">
        <div className="footer-cta__top">
          <span className="footer-cta__brand">Divine Sisters Ministry</span>
          <div style={{ display: 'flex', gap: 16 }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-cta__link" aria-label="Instagram">
              <Instagram size={16} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="footer-cta__link" aria-label="YouTube">
              <Youtube size={16} />
            </a>
          </div>
        </div>

        <div className="footer-cta__center">
          <h2 className="footer-cta__heading reveal">Join us in<br />March.</h2>
          <p className="footer-cta__sub reveal reveal-d1">Secure your spot for The Limitless Woman Summit 2026 now.</p>
          <button className="footer-cta__btn reveal reveal-d2" onClick={handleRegister}>
            <ArrowRight size={18} /> Register Now
          </button>
        </div>

        <div className="footer-cta__links">
          <button className="footer-cta__link" onClick={() => scrollTo('about')}>About</button>
          <button className="footer-cta__link" onClick={() => scrollTo('speakers')}>Speakers</button>
          <button className="footer-cta__link" onClick={() => scrollTo('agenda')}>Agenda</button>
          <button className="footer-cta__link" onClick={() => scrollTo('faq')}>FAQ</button>
          <a href="mailto:thedivinedivasad@gmail.com" className="footer-cta__link">
            <Mail size={12} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} /> Contact
          </a>
          <a href="https://wa.me/+2348099442606" target="_blank" rel="noopener noreferrer" className="footer-cta__link">
            <MessageCircle size={12} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} /> WhatsApp
          </a>
        </div>
      </footer>

      {/* ─── REGISTER MODAL (MailerLite embedded form) ─── */}
      <div className={`modal-overlay ${showModal ? 'modal-overlay--visible' : ''}`} onClick={(e) => e.target === e.currentTarget && handleCloseModal()}>
        <div className="modal modal--mailerlite">
          <button className="modal__close" onClick={handleCloseModal}>✕</button>
          <h2 className="modal__title">Register Now</h2>
          <p className="modal__subtitle">Secure your spot for The Limitless Woman Summit 2026</p>
          <div className="modal__form-wrap"></div>
        </div>
      </div>
    </>
  );
}