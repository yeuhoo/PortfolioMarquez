'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import wordpressLogo from '../images/wordpresslogo.jpg'
import shopifyLogo from '../images/shopifylogo.png'
import reactLogo from '../images/reactlogo.png'
import nextjsLogo from '../images/nextjslogo.png'
import gsapLogo from '../images/gsaplogo.png'
import webflowLogo from '../images/webflowlogo.png'
import supabaseLogo from '../images/supabaselogo.png'
import aspnetLogo from '../images/aspnetlogo.png'
import nodejsLogo from '../images/nodejs-logo.svg'
import expressLogo from '../images/expressjslogo.png'
import postgresqlLogo from '../images/postgreslogo.png'
import prismaLogo from '../images/prismalogo.svg'
import firebaseLogo from '../images/firebaselogo.webp'
import graphqlLogo from '../images/graphql.png'
import javascriptLogo from '../images/javascriptlogo.webp'
import cssLogo from '../images/csslogo.webp'
import framerLogo from '../images/framerlogo.jpg'
import googleSearchConsoleLogo from '../images/googlesearchconsole.png'
import googleAnalytics4Logo from '../images/googleanalytics4logo.avif'
import semrushLogo from '../images/semrushlogo.png'
import screamingFrogLogo from '../images/screamingfroglogo.png'
import pagespeedInsightsLogo from '../images/pagspeedinsightslogo.webp'
import lighthouseLogo from '../images/lighthouselogo.png'
import richResultsTestLogo from '../images/richresultstestslogo.png'
import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/navigation'

gsap.registerPlugin(useGSAP)

const roles = ['Full Stack Developer', 'SEO Specialist', 'Creative Developer', 'Web Animator']

export default function AboutPage() {
  const pageRef = useRef<HTMLElement>(null)
  const isPageTransitioningRef = useRef(false)
  const roleRef = useRef<HTMLSpanElement>(null)
  const router = useRouter()
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const el = roleRef.current
      if (!el) return
      gsap.to(el, {
        yPercent: -120,
        autoAlpha: 0,
        duration: 0.28,
        ease: 'power2.in',
        onComplete: () => {
          setRoleIndex((prev) => (prev + 1) % roles.length)
          gsap.fromTo(
            el,
            { yPercent: 120, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.32, ease: 'power2.out' }
          )
        }
      })
    }, 2600)
    return () => clearInterval(interval)
  }, [])
  const techTitle = 'TECH STACKS'
  const placeholderCards = [
    {
      title: 'WordPress',
      image: wordpressLogo,
      description: 'Custom themes, plugins & content-driven sites.',
      category: 'frontend'
    },
    {
      title: 'Shopify',
      image: shopifyLogo,
      description: 'E-commerce storefronts with custom Liquid themes.',
      category: 'frontend'
    },
    {
      title: 'React',
      image: reactLogo,
      description: 'Component-based UIs with hooks & state management.',
      category: 'frontend'
    },
    {
      title: 'Next.js',
      image: nextjsLogo,
      description: 'Full-stack React apps with SSR, SSG & API routes.',
      category: 'frontend'
    },
    {
      title: 'GSAP',
      image: gsapLogo,
      description: 'High-performance animations & scroll interactions.',
      category: 'frontend'
    },
    {
      title: 'Webflow',
      image: webflowLogo,
      description: 'No-code visual builds with CMS & interactions.',
      category: 'frontend'
    },
    {
      title: 'JavaScript',
      image: javascriptLogo,
      description: 'Core scripting for dynamic web experiences.',
      category: 'frontend'
    },
    {
      title: 'CSS',
      image: cssLogo,
      description: 'Responsive layouts, animations & design systems.',
      category: 'frontend'
    },
    {
      title: 'Framer',
      image: framerLogo,
      description: 'Interactive prototypes & production-ready sites.',
      category: 'frontend'
    },
    {
      title: 'Supabase',
      image: supabaseLogo,
      description: 'Open-source backend with auth, DB & storage.',
      category: 'backend'
    },
    {
      title: 'ASP.NET',
      image: aspnetLogo,
      description: 'Scalable server-side apps & REST APIs in C#.',
      category: 'backend'
    },
    {
      title: 'Node.js',
      image: nodejsLogo,
      description: 'Server-side JavaScript for scalable network apps.',
      category: 'backend'
    },
    {
      title: 'Express',
      image: expressLogo,
      description: 'Minimal, flexible Node.js web application framework.',
      category: 'backend'
    },
    {
      title: 'PostgreSQL',
      image: postgresqlLogo,
      description: 'Powerful open-source relational database system.',
      category: 'backend'
    },
    {
      title: 'Prisma',
      image: prismaLogo,
      description: 'Type-safe ORM for Node.js & TypeScript projects.',
      category: 'backend'
    },
    {
      title: 'Firebase',
      image: firebaseLogo,
      description: 'Google BaaS with auth, Firestore & realtime DB.',
      category: 'backend'
    },
    {
      title: 'GraphQL',
      image: graphqlLogo,
      description: 'Flexible query language for APIs & data graphs.',
      category: 'backend'
    },
    {
      title: 'Google Search Console',
      image: googleSearchConsoleLogo,
      description: 'Monitor indexing, crawl issues & search performance.',
      category: 'seo'
    },
    {
      title: 'Google Analytics 4',
      image: googleAnalytics4Logo,
      description: 'Event-based tracking for user behavior & conversions.',
      category: 'seo'
    },
    {
      title: 'Semrush',
      image: semrushLogo,
      description: 'Keyword research, competitor audits & rank tracking.',
      category: 'seo'
    },
    {
      title: 'Screaming Frog',
      image: screamingFrogLogo,
      description: 'Technical SEO crawls for on-page & structural issues.',
      category: 'seo'
    },
    {
      title: 'PageSpeed Insights',
      image: pagespeedInsightsLogo,
      description: 'Core Web Vitals analysis & performance scoring.',
      category: 'seo'
    },
    {
      title: 'Lighthouse',
      image: lighthouseLogo,
      description: 'Automated audits for performance, SEO & accessibility.',
      category: 'seo'
    },
    {
      title: 'Rich Results Test',
      image: richResultsTestLogo,
      description: 'Validate structured data for rich search snippets.',
      category: 'seo'
    }
  ]
  const [activeCategory, setActiveCategory] = useState<'frontend' | 'backend' | 'seo'>('frontend')
  const [activeIndex, setActiveIndex] = useState(0)

  const filteredCards = placeholderCards.filter((c) => c.category === activeCategory)
  const totalCards = filteredCards.length

  const getCardOffset = (index: number) => {
    let offset = index - activeIndex

    if (offset > totalCards / 2) {
      offset -= totalCards
    }

    if (offset < -totalCards / 2) {
      offset += totalCards
    }

    return offset
  }

  useGSAP(
    () => {
      const pageElement = pageRef.current
      const techTitleWrap = pageElement?.querySelector('.tech-title-wrap') as HTMLElement | null
      const techTitleText = pageElement?.querySelector('.tech-title') as HTMLElement | null
      const transitionDirection = window.sessionStorage.getItem('portfolio_transition_dir')
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
      let shimmerTween: gsap.core.Tween | null = null

      const handleWheel = (event: Event) => {
        if (isPageTransitioningRef.current) {
          return
        }

        const wheelEvent = event as WheelEvent
        const currentScrollTop = pageElement?.scrollTop ?? 0
        const scrollHeight = pageElement?.scrollHeight ?? 0
        const clientHeight = pageElement?.clientHeight ?? 0
        const atBottom = currentScrollTop + clientHeight >= scrollHeight - 10

        // Scroll down at the bottom → go to websites
        if (wheelEvent.deltaY >= 30 && atBottom) {
          isPageTransitioningRef.current = true
          window.sessionStorage.setItem('websites_from', 'about')
          gsap.to('.about-content', {
            yPercent: -100,
            duration: 0.65,
            ease: 'power3.inOut',
            overwrite: 'auto',
            onComplete: () => router.push('/websites')
          })
          return
        }

        // Scroll up at the top → go back to home
        if (wheelEvent.deltaY > -30) {
          return
        }

        if (currentScrollTop > 8) {
          return
        }

        isPageTransitioningRef.current = true
        window.sessionStorage.setItem('portfolio_transition_dir', 'up')

        gsap.to('.about-content', {
          yPercent: 100,
          duration: 0.65,
          ease: 'power3.inOut',
          overwrite: 'auto',
          onComplete: () => {
            router.push('/')
          }
        })
      }

      if (transitionDirection === 'down') {
        gsap.set('.about-content', { yPercent: 100, autoAlpha: 1 })
        pageElement?.scrollTo({ top: 0 })
        timeline
          .to('.about-content', {
            yPercent: 0,
            duration: 0.65,
            ease: 'power3.inOut'
          })
          .from(
            '.about-animate',
            {
              y: 24,
              autoAlpha: 0,
              duration: 0.6,
              stagger: 0.08
            },
            '-=0.15'
          )
          .from(
            '.tech-letter',
            {
              y: 20,
              autoAlpha: 0,
              duration: 0.45,
              stagger: 0.03,
              ease: 'power3.out'
            },
            '-=0.25'
          )
      } else {
        gsap.from('.about-animate', {
          y: 24,
          autoAlpha: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out'
        })

        gsap.from('.tech-letter', {
          y: 20,
          autoAlpha: 0,
          duration: 0.45,
          stagger: 0.03,
          ease: 'power3.out',
          delay: 0.2
        })
      }

      shimmerTween = gsap.fromTo(
        '.tech-shimmer',
        {
          xPercent: -130
        },
        {
          xPercent: 130,
          duration: 2.2,
          ease: 'sine.inOut',
          repeat: -1,
          repeatDelay: 1.2
        }
      )

      const handleTechEnter = () => {
        if (!techTitleText) {
          return
        }

        gsap.to(techTitleText, {
          scale: 1.02,
          letterSpacing: '0.12em',
          textShadow: '0 0 20px rgba(148, 163, 184, 0.34)',
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
          transformOrigin: 'left center'
        })
      }

      const handleTechLeave = () => {
        if (!techTitleText) {
          return
        }

        gsap.to(techTitleText, {
          scale: 1,
          letterSpacing: '0.08em',
          textShadow: '0 0 0 rgba(148, 163, 184, 0)',
          duration: 0.24,
          ease: 'power2.out',
          overwrite: 'auto'
        })
      }

      techTitleWrap?.addEventListener('mouseenter', handleTechEnter)
      techTitleWrap?.addEventListener('mouseleave', handleTechLeave)

      window.sessionStorage.removeItem('portfolio_transition_dir')

      pageElement?.addEventListener('wheel', handleWheel, { passive: true })

      return () => {
        pageElement?.removeEventListener('wheel', handleWheel)
        techTitleWrap?.removeEventListener('mouseenter', handleTechEnter)
        techTitleWrap?.removeEventListener('mouseleave', handleTechLeave)
        shimmerTween?.kill()
        isPageTransitioningRef.current = false
      }
    },
    { scope: pageRef }
  )

  return (
    <main ref={pageRef} className="h-dvh overflow-y-auto bg-neutral-950 text-neutral-100">
      <div className="about-content mx-auto w-full max-w-6xl px-6 py-8 sm:px-10">
        <header className="about-animate flex justify-end">
          <nav className="flex gap-6 text-sm text-neutral-200">
            <Link href="/" className="transition hover:text-neutral-100">
              Home
            </Link>
            <span className="text-white">About Me</span>
            <span className="text-neutral-400">Services</span>
            <Link href="/websites" className="text-neutral-400 transition-colors hover:text-white">Projects</Link>
            <span className="text-neutral-400">Contact</span>
          </nav>
        </header>

        <section className="about-animate flex min-h-[72vh] items-center">
          <div className="max-w-4xl">
            <p className="about-animate text-xs uppercase tracking-[0.22em] text-neutral-400">
              About Me
            </p>
            <div className="about-animate mt-4 flex items-center gap-2">
              <span className="h-px w-6 bg-neutral-600" />
              <div className="overflow-hidden">
                <span
                  ref={roleRef}
                  className="inline-block text-sm font-medium uppercase tracking-[0.18em] text-neutral-300"
                >
                  {roles[roleIndex]}
                </span>
              </div>
            </div>
            <p className="about-animate mt-7 max-w-3xl text-2xl leading-relaxed text-neutral-300 sm:text-3xl">
              I blend design, strategy, and engineering to create seamless digital experiences. As a
              full stack developer and SEO specialist with 4+ years of experience, I build stable,
              high-performing digital products that rank, convert, and scale. I bring that expertise
              to startups and agencies as a creative developer.
            </p>
          </div>
        </section>

        <section className="about-animate pb-16 pt-1">
          <h2 className="tech-title-wrap -mt-4 w-max overflow-hidden">
            <span className="tech-title relative block text-3xl font-semibold tracking-[0.08em] text-white sm:text-4xl">
              {Array.from(techTitle).map((letter, index) => (
                <span key={`${letter}-${index}`} className="tech-letter inline-block">
                  {letter === ' ' ? '\u00A0' : letter}
                </span>
              ))}
              <span className="tech-shimmer pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent via-neutral-200/30 to-transparent blur-[1px]" />
            </span>
          </h2>

          <div className="mt-8 flex gap-3">
            {(['frontend', 'backend', 'seo'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat)
                  setActiveIndex(0)
                }}
                className={`rounded-full border px-5 py-1.5 text-xs uppercase tracking-[0.18em] transition-all duration-200 ${
                  activeCategory === cat
                    ? 'border-neutral-300 bg-neutral-100 text-neutral-900'
                    : 'border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-neutral-200'
                }`}
              >
                {cat === 'seo' ? 'SEO' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <div className="relative mt-60 h-[690px] overflow-visible">
            <div className="absolute inset-0 perspective-[1400px]">
              {filteredCards.map((card, index) => {
                const offset = getCardOffset(index)
                const abs = Math.abs(offset)
                const hidden = abs > 1

                const translateX = offset * 320
                const rotateY = offset * -23
                const rotateZ = offset * -4
                const scale = abs === 0 ? 1 : 0.84
                const opacity = abs === 0 ? 1 : 0.68
                const curveY = abs === 0 ? 0 : abs * abs * 24

                return (
                  <article
                    key={card.title}
                    onClick={() => setActiveIndex(index)}
                    className="absolute left-1/2 top-[58%] h-[500px] w-[320px] -translate-y-1/2 cursor-pointer rounded-[2rem] border border-neutral-700/80 bg-gradient-to-b from-neutral-800 to-neutral-900 p-7 shadow-[0_24px_65px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out"
                    style={{
                      transform: `translateX(calc(-50% + ${translateX}px)) translateY(calc(-50% + ${curveY}px)) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                      opacity,
                      zIndex: 20 - abs,
                      pointerEvents: hidden ? 'none' : 'auto'
                    }}
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                      {card.title}
                    </p>
                    <div className="relative mt-6 h-56 overflow-hidden rounded-2xl border border-neutral-200/20 bg-white p-4">
                      <Image src={card.image} alt={card.title} fill className="object-contain" />
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-neutral-400">
                      {card.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>

          <div className="about-animate mt-4 max-w-3xl text-left">
            <p className="text-left text-xl leading-relaxed text-neutral-300 sm:text-2xl">
              I focus on building elegant, performance-driven websites that feel modern, meaningful,
              and memorable. I also enjoy exploring motion and interaction, feel free to visit my{' '}
              <a
                href="#"
                className="font-medium text-white underline decoration-neutral-400 underline-offset-4 transition hover:decoration-white"
              >
                Playground
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
