import { useEffect, useRef, useState } from 'react'
import './index.css'

function DotsCanvas({ opacity = 1 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = canvas.offsetWidth
    let height = canvas.offsetHeight
    canvas.width = width
    canvas.height = height

    const count = Math.min(60, Math.floor((width * height) / 12000))
    const dots = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.8 + 1.2,
    }))

    let raf

    function draw() {
      ctx.clearRect(0, 0, width, height)

      dots.forEach((d) => {
        d.x += d.vx
        d.y += d.vy
        if (d.x < 0 || d.x > width) d.vx *= -1
        if (d.y < 0 || d.y > height) d.vy *= -1
      })

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(46,204,113,${(1 - dist / 140) * 0.3 * opacity})`
            ctx.lineWidth = 0.8
            ctx.moveTo(dots[i].x, dots[i].y)
            ctx.lineTo(dots[j].x, dots[j].y)
            ctx.stroke()
          }
        }
      }

      dots.forEach((d) => {
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(46,204,113,${0.5 * opacity})`
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width
      canvas.height = height
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [opacity])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}

function ServiceItem({ name }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#f4fef8' : '#fff',
        borderRight: '1px solid #e8e8e8',
        borderBottom: '1px solid #e8e8e8',
        padding: '24px 24px',
        transition: 'background 0.2s',
        cursor: 'default',
      }}
    >
      <div style={{
        width: hovered ? 28 : 16,
        height: 1.5,
        background: '#2ecc71',
        marginBottom: 14,
        transition: 'width 0.3s',
      }} />
      <p style={{ fontSize: 13, fontWeight: 500, color: '#333', margin: 0 }}>{name}</p>
    </div>
  )
}

const services = [
  'Hematologjike',
  'Biokimike',
  'Hormone',
  'Tumor Markerë',
  'Virusologji',
  'Autoimmune',
  'Imunologjike',
  'Elektrolitë',
  'Hemostazë',
  'Urinaliza',
  'Serologji',
  'Mikrobiologji',
]

const pillars = [
  {
    label: 'Aparaturë e Sofistikuar',
    text: 'Pajisur me aparaturë teknologjike të fundit nga prodhuesit botërorë liderë si Roche, Sysmex, Diesse dhe Human — standarde ndërkombëtare brenda vendit.',
  },
  {
    label: 'Personel i Specializuar',
    text: 'Ekipi ynë i biokimistëve dhe mjekëve klinikë ofron gamë të gjerë analizash, duke siguruar procedura diagnostikimi të sakta dhe me besueshmëri të plotë.',
  },
  {
    label: 'Rezultate të Shpejta',
    text: 'Konsulta falas me mjekun klinik, qasje online në rezultate dhe historik i plotë laboratorik — procesi i diagnostikimit sa më i lehtë për çdo pacient.',
  },
]

const navLinks = [
  ['#about', 'Rreth nesh'],
  ['#services', 'Shërbime'],
  ['#contact', 'Kontakt'],
]

const contactBlocks = [
  {
    label: 'Adresa',
    lines: [
      { text: 'Rr. Malush Kosova, Lokali 5', primary: true },
      { text: 'Nga Farmedi, përballë hyrjes së QKUK-së', primary: false },
      { text: 'Prishtinë, Kosovë', primary: false },
    ],
  },
  {
    label: 'Telefon',
    links: [
      ['tel:+38345102100', '+383 (0) 45 102 100'],
      ['tel:+38345102120', '+383 (0) 45 102 120'],
      ['tel:+38349559971', '+383 (0) 49 559 971'],
    ],
  },
  {
    label: 'Email',
    links: [['mailto:info@laboratorinorma.com', 'info@laboratorinorma.com']],
  },
  {
    label: 'Web',
    links: [['https://www.laboratorinorma.com', 'www.laboratorinorma.com']],
  },
]

function Logo() {
  return (
    <img
      src="/logo.png"
      alt="Laboratori Norma"
      style={{
        height: 38,
        width: 'auto',
        display: 'block',
        filter: 'hue-rotate(35deg) saturate(0.63) brightness(0.91)',
      }}
    />
  )
}

function NavLink({ href, label }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? '#2ecc71' : '#888',
        textDecoration: 'none',
        transition: 'color 0.2s',
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      {label}
    </a>
  )
}

function GreenLink({ href, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 14,
        color: hovered ? '#2ecc71' : '#333',
        textDecoration: 'none',
        fontWeight: 400,
        lineHeight: 1.7,
        display: 'block',
        transition: 'color 0.2s',
        margin: 0,
      }}
    >
      {children}
    </a>
  )
}

function HeroBtn({ href, primary, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={primary ? {
        display: 'inline-flex',
        alignItems: 'center',
        background: hovered ? '#1a9e52' : '#2ecc71',
        color: '#fff',
        padding: '13px 32px',
        borderRadius: 100,
        fontSize: 13,
        fontWeight: 500,
        textDecoration: 'none',
        transition: 'background 0.2s',
      } : {
        display: 'inline-flex',
        alignItems: 'center',
        border: `1px solid ${hovered ? '#2ecc71' : '#ddd'}`,
        color: hovered ? '#2ecc71' : '#555',
        padding: '13px 32px',
        borderRadius: 100,
        fontSize: 13,
        fontWeight: 500,
        textDecoration: 'none',
        transition: 'all 0.2s',
      }}
    >
      {children}
    </a>
  )
}


export default function App() {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", background: '#fff', color: '#111', minHeight: '100vh' }}>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #f0f0f0',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center' }}><Logo /></a>
          <nav style={{ display: 'flex', gap: 32 }}>
            {navLinks.map(([href, label]) => (
              <NavLink key={href} href={href} label={label} />
            ))}
          </nav>
          <a href="tel:+38345102100" style={{ fontSize: 13, fontWeight: 500, color: '#2ecc71', textDecoration: 'none' }}>
            +383 45 102 100
          </a>
        </div>
      </header>

      <section style={{ position: 'relative', display: 'flex', alignItems: 'center', paddingTop: 64, overflow: 'hidden', background: '#fff' }}>
        <DotsCanvas />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '96px 28px 80px' }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: '#2ecc71', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 24 }}>
            Laboratori Norma — Prishtinë
          </p>
          <h1 style={{ fontSize: 'clamp(42px, 6vw, 76px)', fontWeight: 300, color: '#111', lineHeight: 1.1, letterSpacing: '-2px', maxWidth: 700, marginBottom: 28, margin: '0 0 28px' }}>
            Diagnoza e saktë,<br />
            <span style={{ color: '#2ecc71' }}>shëndeti</span> juaj.
          </h1>
          <p style={{ fontSize: 17, color: '#888', maxWidth: 480, lineHeight: 1.7, fontWeight: 300, marginBottom: 48, margin: '0 0 48px' }}>
            Analiza laboratorike me standarde ndërkombëtare, aparaturë moderne dhe rezultate të besueshme.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <HeroBtn href="#contact" primary>Na kontaktoni</HeroBtn>
            <HeroBtn href="#services">Shërbime</HeroBtn>
          </div>
        </div>
      </section>


      <section id="about" style={{ padding: '112px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ maxWidth: 500, marginBottom: 72 }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 300, color: '#111', letterSpacing: '-1px', lineHeight: 1.2, margin: 0 }}>
              Teknologji moderne,<br />rezultate që mund t'u besoni.
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 64 }}>
            {pillars.map((p, i) => (
              <div key={i}>
                <div style={{ width: 32, height: 2, background: '#2ecc71', marginBottom: 20 }} />
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#111', marginBottom: 12, margin: '0 0 12px' }}>{p.label}</h3>
                <p style={{ fontSize: 13, color: '#888', lineHeight: 1.75, fontWeight: 300, margin: 0 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" style={{ padding: '112px 0', background: '#f9f9f9', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, borderRadius: '50%', background: '#d4f5e2', opacity: 0.5, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -120, left: -120, width: 400, height: 400, borderRadius: '50%', background: '#d4f5e2', opacity: 0.5, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ maxWidth: 500, marginBottom: 72 }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 300, color: '#111', letterSpacing: '-1px', lineHeight: 1.2, margin: 0 }}>
              Shërbime laboratorike<br />
            </h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            border: '1px solid #e8e8e8',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            {services.map((s) => (
              <ServiceItem key={s} name={s} />
            ))}
          </div>

        </div>
      </section>

      <section id="contact" style={{ padding: '112px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#2ecc71', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 16, margin: '0 0 16px' }}>
              Kontakt
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 300, color: '#111', letterSpacing: '-1px', lineHeight: 1.2, marginBottom: 52, margin: '0 0 52px' }}>
              Na kontaktoni.
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {contactBlocks.map((block) => (
                <div key={block.label}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: '#ccc', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10, margin: '0 0 10px' }}>
                    {block.label}
                  </p>
                  {block.lines && block.lines.map((l, i) => (
                    <p key={i} style={{ fontSize: 14, color: l.primary ? '#333' : '#999', fontWeight: l.primary ? 400 : 300, lineHeight: 1.7, margin: 0 }}>{l.text}</p>
                  ))}
                  {block.links && block.links.map(([href, text]) => (
                    <GreenLink key={href} href={href}>{text}</GreenLink>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid #e8e8e8', aspectRatio: '1', position: 'relative' }}>
            <iframe
              title="Laboratori Norma — Harta"
              src="https://www.openstreetmap.org/export/embed.html?bbox=21.1567%2C42.6374%2C21.1768%2C42.6494&layer=mapnik&marker=42.6434%2C21.1668"
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://www.openstreetmap.org/?mlat=42.6434&mlon=21.1668#map=17/42.6434/21.1668"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'absolute', bottom: 12, right: 12,
                background: '#fff', border: '1px solid #e8e8e8',
                borderRadius: 8, padding: '6px 12px',
                fontSize: 11, fontWeight: 500, color: '#555',
                textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
              }}
            >
              Hap hartën
            </a>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #f0f0f0', padding: '28px 0', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, color: '#ccc' }}>
            © 2024 Laboratori <span style={{ color: '#2ecc71' }}>Norma</span>. Të gjitha të drejtat e rezervuara.
          </span>
          <span style={{ fontSize: 12, color: '#ccc' }}>Prishtinë, Kosovë</span>
        </div>
      </footer>
    </div>
  )
}
