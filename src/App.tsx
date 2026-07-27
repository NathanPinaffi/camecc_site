import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import CAMECCAO from './assets/CAMECCAO.png'
import cameccaoCorrendo from './assets/cameccao_correndo.png'
import Camecc_frente from './assets/camecc.png'
import GBG from './assets/GBG.webp';
import MG from './assets/MG.webp';
import BETEL from './assets/BETEL.webp';
import RUPOLO from './assets/RUPOLO.webp';
import TAVARES from './assets/TAVARES.webp';
import BRUNO from './assets/BRUNO.webp';

gsap.registerPlugin(ScrollTrigger)

function App() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const panels = document.querySelectorAll('.reveal')
    ScrollTrigger.batch(panels, {
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
        }),
      start: 'top 82%',
      once: true,
    })
  })

  useEffect(() => {
    const progress =
      document.getElementById('scrollProgress') as HTMLDivElement | null
    const heroMasc = document.getElementById('cameccao') as HTMLImageElement | null
    const follow = document.getElementById('mascoteFollow') as HTMLImageElement | null
    const parallaxEls = document.querySelectorAll('[data-parallax]')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let ticking = false

    function onScroll() {
      const y = window.scrollY
      const vh = window.innerHeight
      const docH = document.documentElement.scrollHeight - vh
      const pct = docH > 0 ? (y / docH) : 0

      if (progress) progress.style.width = `${(pct * 100).toFixed(2)}%`

      if (reduceMotion) {
        ticking = false
        return
      }

      parallaxEls.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-parallax') || '0.2')
      ;(el as HTMLElement).style.transform = `translate3d(0,${(y * speed).toFixed(1)}px,0)`
    })

      if (heroMasc) {
        const rot = Math.max(-18, Math.min(18, y * 0.04))
        const scale = Math.max(0.85, 1 - y * 0.0004)
        heroMasc.style.transform = `rotate(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`
      }

      if (follow) {
        const showAfter = vh * 0.6
        if (y > showAfter) {
          follow.classList.add('visible')
          const maxX = window.innerWidth - 96
          const tx = Math.max(0, Math.min(maxX, pct * (maxX + 120) - 60))
          const bob = Math.sin(y / 90) * 6
          const rot = Math.sin(y / 120) * 8
          follow.style.transform = `translate(${tx.toFixed(1)}px,${bob.toFixed(1)}px) rotate(${rot.toFixed(1)}deg)`
        } else {
          follow.classList.remove('visible')
        }
      }

      ticking = false
    }

    window.addEventListener(
      'scroll',
      () => {
        if (!ticking) {
          requestAnimationFrame(onScroll)
          ticking = true
        }
      },
      { passive: true }
    )
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()
  }, [])

  return (
    <div ref={rootRef}>

      <div id="scrollProgress" className="scroll-progress" />
      <div className="plastic-overlay" />
      <div className="grain" />
      <img className="mascote-follow" id="mascoteFollow" src={cameccaoCorrendo} alt="" />

      <header>
        <a href="#"><div className="logo">CAME<span className="c-red">C</span>c</div></a>
        <button className="nav-toggle" id="navToggle" type="button" aria-label="Abrir menu">☰</button>
        <nav>
          <ul id="navList">
            <li><a href="#inicio">Início</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#eventos">Eventos</a></li>
            <li><a href="#diretoria">Diretoria</a></li>
            <li><a href="#galeria">Galeria</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero" id="inicio">
        <svg className="blob" data-parallax="0.25" style={{ width: 520, top: -140, left: -160 }} viewBox="0 0 400 400">
          <path fill="#D91F26" d="M320,60 Q400,140 360,240 Q320,340 200,360 Q80,380 40,280 Q0,180 80,100 Q160,20 320,60Z" />
        </svg>
        <svg className="blob" data-parallax="0.4" style={{ width: 460, top: -80, right: -180 }} viewBox="0 0 400 400">
          <path fill="#111111" d="M300,40 Q380,120 340,220 Q300,320 190,340 Q80,360 50,260 Q20,160 100,90 Q180,20 300,40Z" />
        </svg>
        <svg className="blob" data-parallax="0.15" style={{ width: 380, bottom: -140, left: '20%' }} viewBox="0 0 400 400">
          <path fill="#D91F26" d="M280,50 Q360,130 320,230 Q280,330 170,350 Q60,370 40,270 Q20,170 100,100 Q180,30 280,50Z" />
        </svg>

        <div className="logo bubble reveal" style={{ fontSize: '1.4rem', WebkitTextStroke: '2px #111', textShadow: '2px 2px 0 #111', marginBottom: '1.6rem', zIndex: 2 }}>CAMECCc</div>

        <h1 className="hero-title bubble reveal">BEM-VINDO<br />AO <span className="camecc_span">CAMECC</span></h1>
        <p className="hero-sub reveal">O Centro Acadêmico que representa, agita e acolhe cada aluno do instituto — todo evento, toda pauta, todo rolê.</p>

        <div className="cta-row reveal">
          <a href="#sobre" className="btn primary">O que é o CAMECC</a>
          <a href="#eventos" className="btn">Ver eventos</a>
        </div>

        <div className="hero-mascote-wrap" id="heroMascoteWrap">
          <img className="mascote" id="heroMascote" src={CAMECCAO} alt="Mascote CAMECC" />
        </div>
        <br />
        <br />
        <br />
        <div className="scroll-cue"><span></span>DESÇA A PÁGINA</div>
      </section>

      <section className="sobre" id="sobre">
        <svg className="blob" data-parallax="0.3" style={{ width: 420, top: -120, right: -140, opacity: 0.5 }} viewBox="0 0 400 400">
          <path fill="#D91F26" d="M300,60 Q380,140 340,240 Q300,340 190,360 Q80,380 50,280 Q20,180 100,100 Q180,20 300,60Z" />
        </svg>

        <div className="sobre-text reveal">
          <span className="eyebrow">Quem somos</span>
          <h2 className="bubble" style={{ fontSize: 'clamp(1.8rem,3.6vw,2.8rem)', WebkitTextStroke: '2.5px #D91F26' }}>O QUE É O CAMECC</h2>
          <p>O CAMECC é o Centro Acadêmico que representa oficialmente os estudantes do instituto. Organizamos eventos, defendemos pautas estudantis e criamos espaço pra comunidade rolar de verdade — de reunião de diretoria a torneio de truco.</p>
          <p>Nossa missão é simples: dar voz ao corpo estudantil, aproximar as pessoas e deixar a vida acadêmica mais leve, divertida e conectada.</p>
          <div className="cta-row" style={{ justifyContent: 'flex-start' }}>
            <a href="#diretoria" className="btn primary">Conheça a diretoria</a>
          </div>
        </div>

        <div className="sobre-illustration reveal">
          <img src={Camecc_frente} alt=""/>
        </div>
      </section>

      <section className="eventos" id="eventos">
        <svg className="blob" data-parallax="0.2" style={{ width: 340, bottom: -100, left: -120, opacity: 0.4 }} viewBox="0 0 400 400">
          <path fill="#111111" d="M300,60 Q380,140 340,240 Q300,340 190,360 Q80,380 50,280 Q20,180 100,100 Q180,20 300,60Z" />
        </svg>

        <div className="section-head reveal">
          <h2 className="bubble" style={{ fontSize: 'clamp(1.8rem,3.6vw,2.8rem)' }}>PRÓXIMOS <span className='camecc_span'>EVENTOS</span></h2>
          <p>Fica de olho, tem rolê toda semana</p>
        </div>

        <div className="cards-grid">
          <div className="card reveal" data-delay="0">
            <span className="tag">DIRETORIA</span>
            <h3>Reunião de Diretoria</h3>
            <p>Pauta aberta com discussão dos próximos projetos do centro acadêmico.</p>
            <div className="meta"><span className="dot"></span>Terça-feira, 18h · Mesinhas do Instituto</div>
          </div>
          <div className="card reveal" data-delay="120">
            <span className="tag">TORNEIO</span>
            <h3>Trucamecc³</h3>
            <p>Torneio de truco 3ª edição, com premiação em troféu para a dupla campeã.</p>
            <div className="meta"><span className="dot"></span>Inscrições abertas</div>
          </div>
          <div className="card reveal" data-delay="240">
            <span className="tag">INSTITUCIONAL</span>
            <h3>O que é o CAMECC</h3>
            <p>Uma apresentação rápida sobre o centro acadêmico pra quem tá chegando agora.</p>
            <div className="meta"><span className="dot"></span>Semana de recepção</div>
          </div>
        </div>
      </section>

      <section className="diretoria" id="diretoria">
        <div className="section-head reveal">
          <h2 className="bubble" style={{ fontSize: 'clamp(1.8rem,3.6vw,2.8rem)' }}>DIRETORIA</h2>
          <p>Quem toca o CAMECC no dia a dia</p>
        </div>

        <div className="team-grid">
          <div className="member reveal" data-delay="0"><div className="avatar"><img src={GBG} alt="" /></div><h4>Gustavo Scilla</h4><span>Presidência</span></div>
          <div className="member reveal" data-delay="80"><div className="avatar"><img src={MG} alt="" /></div><h4>Rodrigo Monti</h4><span>Vice-presidência</span></div>
          <div className="member reveal" data-delay="160"><div className="avatar"><img src={BETEL} alt="" /></div><h4>Bianca Bosnardo</h4><span>Secretaria Geral</span></div>
          <div className="member reveal" data-delay="240"><div className="avatar"><img src={TAVARES} alt="" /></div><h4>Arthur Tavares</h4><span>Tesouraria</span></div>
          <div className="member reveal" data-delay="320"><div className="avatar"><img src={RUPOLO} alt="" /></div><h4>Gabriel Rupolo</h4><span>Marketing e Design</span></div>
          <div className="member reveal" data-delay="400"><div className="avatar"><img src={BRUNO} alt="" /></div><h4>Bruno Wolff</h4><span>Eventos</span></div>
        </div>

      </section>

      <section className="galeria" id="galeria">
        <div className="section-head reveal" style={{ color: '#fff' }}>
          <h2 className="bubble" style={{ fontSize: 'clamp(1.8rem,3.6vw,2.8rem)' }}>GALERIA</h2>
          <p style={{ color: '#D91F26' }}>Nossos pôsteres e o Cameccão em ação</p>
        </div>

        <div className="gallery-grid">
          <div className="poster p1 reveal zoom" data-delay="0">
            <svg className="mini-blob" style={{ width: 140, height: 140, top: -40, left: -30 }} viewBox="0 0 100 100"><path fill="#111" d="M70,15 Q95,35 88,60 Q80,90 50,90 Q15,90 10,60 Q5,30 35,15 Q55,5 70,15Z" /></svg>
            <div className="p-title">REUNIÃO DE<br />DIRETORIA</div>
          </div>
          <div className="poster p2 reveal zoom" data-delay="120">
            <img className="poster-mascote" src={CAMECCAO} alt="Mascote CAMECC" />
            <div className="p-title" style={{ alignSelf: 'flex-start', margin: '1rem' }}>TRUCAMECC³</div>
          </div>
          <div className="poster p3 reveal zoom" data-delay="240">
            <svg className="mini-blob" style={{ width: 120, height: 120, bottom: -30, right: -20 }} viewBox="0 0 100 100"><path fill="#111" d="M70,15 Q95,35 88,60 Q80,90 50,90 Q15,90 10,60 Q5,30 35,15 Q55,5 70,15Z" /></svg>
            <div className="p-title">SEMANA DE<br />RECEPÇÃO</div>
          </div>
          <div className="poster p4 reveal zoom" data-delay="360">
            <img className="poster-mascote" src={CAMECCAO} alt="Mascote CAMECC" />
            <div className="p-title" style={{ alignSelf: 'flex-end', margin: '1rem' }}>O QUE É O<br />CAMECC</div>
          </div>
        </div>
      </section>

      <section className="contato" id="contato">
        <svg className="blob" data-parallax="0.25" style={{ width: 360, top: -80, right: -140, opacity: 0.35 }} viewBox="0 0 400 400">
          <path fill="#D91F26" d="M300,60 Q380,140 340,240 Q300,340 190,360 Q80,380 50,280 Q20,180 100,100 Q180,20 300,60Z" />
        </svg>

        <span className="eyebrow reveal" style={{ position: 'relative', zIndex: 2 }}>Fala com a gente</span>
        <h2 className="bubble reveal" data-delay="100" style={{ fontSize: 'clamp(1.8rem,3.6vw,2.8rem)', position: 'relative', zIndex: 2 }}>VEM PRO <span className="camecc_span">CAMECC</span></h2>

        <div className="social-row reveal" data-delay="200">
          <a className="social-btn" href="https://www.instagram.com/camecc_oficial/" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
          </a>
          <a className="social-btn" href="" aria-label="WhatsApp">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.5 8.5 0 1 1-4.1-7.3L21 3l-1.2 3.9A8.46 8.46 0 0 1 21 11.5Z"/></svg>
          </a>
          <a className="social-btn" href="camecc@unicamp.br" aria-label="E-mail">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
          </a>
        </div>
      </section>

      <footer>
        <p style={{ marginTop: '.6rem', opacity: '.7' }}>© 2026 CAMECC — Centro Acadêmico da Matemática, Estatística e Computação Científica da Unicamp - Direitos reservados.</p>
      </footer>

      <div className="last-blobs" aria-hidden="true">
        <svg className="blob" data-parallax="0.15" style={{ width: 460, bottom: 26, left: '12%', opacity: 0.6 }} viewBox="0 0 400 400"><path fill="#D91F26" d="M320,60 Q400,140 360,240 Q320,340 200,360 Q80,380 40,280 Q0,180 80,100 Q160,20 320,60Z" /></svg>
        <svg className="blob" data-parallax="0.3" style={{ width: 360, bottom: 22, left: '50%', transform: 'translateX(-50%)', opacity: 0.55 }} viewBox="0 0 400 400"><path fill="#111111" d="M300,40 Q380,120 340,220 Q300,320 190,340 Q80,360 50,260 Q20,160 100,90 Q180,20 300,40Z" /></svg>
        <svg className="blob" data-parallax="0.4" style={{ width: 520, bottom: 28, right: '10%', opacity: 0.5 }} viewBox="0 0 400 400"><path fill="#D91F26" d="M280,50 Q360,130 320,230 Q280,330 170,350 Q60,370 40,270 Q20,170 100,100 Q180,30 280,50Z" /></svg>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        const toggle = document.getElementById('navToggle')
        const list = document.getElementById('navList')
        toggle && toggle.addEventListener('click', () => list.classList.toggle('open'))
        list && Array.from(list.querySelectorAll('a')).forEach(a => a.addEventListener('click', () => list.classList.remove('open')))
      `}} />
    </div>
  )
}

export default App
