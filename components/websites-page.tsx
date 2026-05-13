'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

gsap.registerPlugin(useGSAP)

const websites = [
  {
    number: '01',
    name: 'OLO Fit',
    description:
      'A high-performance fitness platform built for athletes who demand results. Focused on speed, clean UI, and conversion — from landing page to sign-up flow.',
    tags: ['Web Design', 'Development', 'SEO'],
    video: '/videos/olo-fit.mov',
  },
  {
    number: '02',
    name: 'Milk Denmark',
    description:
      'A premium Danish lifestyle brand brought to life online. Crafted with editorial aesthetics and smooth interactions to establish a bold digital presence.',
    tags: ['E-Commerce', 'Branding', 'Animation'],
    video: '/videos/milk-dk.mov',
  },
  {
    number: '03',
    name: 'The Closeout Connection',
    description:
      'A full-featured e-commerce storefront built for closeout retail. Engineered for performance, discoverability, and high conversion rates at scale.',
    tags: ['Shopify', 'E-Commerce', 'Technical SEO'],
    video: '/videos/closeout-connection.mov',
  },
  {
    number: '04',
    name: 'Lights and Angles',
    description:
      'A cinematic portfolio and studio site for a creative photography brand. Immersive transitions, bold typography, and a striking visual identity.',
    tags: ['Portfolio', 'Animation', 'Creative Dev'],
    video: '/videos/lights-angles.mov',
  },
]

export default function WebsitesPage() {
  const containerRef = useRef<HTMLElement>(null)
  const isTransitioningRef = useRef(false)
  const activeIndexRef = useRef(0)
  const isPageTransitioningRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const router = useRouter()

  const goToSection = (index: number) => {
    if (isTransitioningRef.current) return
    const current = activeIndexRef.current
    if (index === current || index < 0 || index >= websites.length) return

    isTransitioningRef.current = true
    const direction = index > current ? 1 : -1

    gsap.to(['.site-number', '.site-title', '.site-desc', '.site-tags'], {
      y: direction * -50,
      opacity: 0,
      duration: 0.32,
      stagger: 0.03,
      ease: 'power2.in',
    })

    gsap.to('.site-video', {
      scale: 0.93,
      opacity: 0,
      y: direction * -20,
      duration: 0.32,
      ease: 'power2.in',
      onComplete: () => {
        activeIndexRef.current = index
        setActiveIndex(index)

        requestAnimationFrame(() => {
          gsap.fromTo(
            ['.site-number', '.site-title', '.site-desc', '.site-tags'],
            { y: direction * 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              stagger: 0.05,
              ease: 'power3.out',
            }
          )
          gsap.fromTo(
            '.site-video',
            { scale: 0.93, opacity: 0, y: direction * 20 },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: 'power3.out',
              onComplete: () => {
                isTransitioningRef.current = false
              },
            }
          )
        })
      },
    })
  }

  useGSAP(
    () => {
      const websitesFrom = window.sessionStorage.getItem('websites_from')
      window.sessionStorage.removeItem('websites_from')

      if (websitesFrom === 'about') {
        // Slide in from below — matches the about-content sliding up
        gsap.set('.websites-main', { yPercent: 100 })
        gsap.to('.websites-main', { yPercent: 0, duration: 0.65, ease: 'power3.inOut' })
      } else {
        // Direct navigation — animate individual elements in
        gsap.set('.websites-nav-item', { y: -14, opacity: 0 })
        gsap.set(['.site-number', '.site-title', '.site-desc', '.site-tags'], { y: 32, opacity: 0 })
        gsap.set('.site-video', { scale: 0.92, opacity: 0 })
        gsap.set('.side-dots', { x: 16, opacity: 0 })

        gsap.to('.websites-nav-item', { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power2.out', delay: 0.1 })
        gsap.to(['.site-number', '.site-title', '.site-desc', '.site-tags'], { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.25 })
        gsap.to('.site-video', { scale: 1, opacity: 1, duration: 0.85, ease: 'power3.out', delay: 0.35 })
        gsap.to('.side-dots', { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.5 })
      }

      // Wheel handler
      const handleWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) < 30) return
        const current = activeIndexRef.current

        if (e.deltaY > 0) {
          if (current < websites.length - 1) {
            goToSection(current + 1)
          } else {
            // Last section scroll down → go to contact
            if (isPageTransitioningRef.current) return
            isPageTransitioningRef.current = true
            window.sessionStorage.setItem('contact_from', 'websites')
            gsap.to('.websites-main', {
              yPercent: -100,
              duration: 0.65,
              ease: 'power3.inOut',
              onComplete: () => router.push('/contact'),
            })
          }
        } else {
          if (current > 0) {
            goToSection(current - 1)
          } else {
            // First section scroll up → back to about
            if (isPageTransitioningRef.current) return
            isPageTransitioningRef.current = true
            gsap.to('.websites-main', {
              yPercent: 100,
              duration: 0.65,
              ease: 'power3.inOut',
              onComplete: () => router.push('/about'),
            })
          }
        }
      }

      const el = containerRef.current
      el?.addEventListener('wheel', handleWheel, { passive: true })
      return () => el?.removeEventListener('wheel', handleWheel)
    },
    { scope: containerRef }
  )

  const site = websites[activeIndex]

  return (
    <main
      ref={containerRef}
      className="h-dvh overflow-hidden bg-neutral-950 text-neutral-100"
    >
      <div className="websites-main h-full w-full">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-8 sm:px-10">
          <Link
            href="/"
            className="websites-nav-item flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-neutral-200"
          >
            <span className="inline-block">←</span>
            <span>Home</span>
          </Link>

          <nav className="flex gap-6 text-sm text-neutral-200">
            <Link href="/about" className="websites-nav-item group relative cursor-pointer">
              <span className="block text-neutral-400 transition-colors group-hover:text-white">About Me</span>
              <span className="absolute bottom-0 left-0 block h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </Link>
            <span className="websites-nav-item relative cursor-default">
              <span className="block text-white">Websites</span>
              <span className="absolute bottom-0 left-0 block h-px w-full bg-white" />
            </span>
          </nav>
        </header>

        {/* Main layout */}
        <div className="flex h-full items-center px-6 sm:px-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-16">

              {/* Left — text */}
              <div className="order-2 md:order-1">
                <p className="site-number mb-5 text-[11px] uppercase tracking-[0.35em] text-neutral-600">
                  {site.number}&nbsp;/&nbsp;04
                </p>

                <h1 className="site-title text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.88] tracking-[-0.03em] text-white">
                  {site.name}
                </h1>

                <p className="site-desc mt-6 max-w-[42ch] text-base leading-relaxed text-neutral-400 sm:text-lg">
                  {site.description}
                </p>

                <div className="site-tags mt-8 flex flex-wrap gap-2">
                  {site.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-neutral-800 px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] text-neutral-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — video */}
              <div className="site-video order-1 md:order-2">
                <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
                  <video
                    key={site.video}
                    className="block h-auto w-full"
                    style={{ aspectRatio: '16 / 10' }}
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src={site.video} type="video/mp4" />
                    <source src={site.video} type="video/quicktime" />
                  </video>
                  {/* subtle glare */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]" />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Dot navigation */}
        <div className="side-dots fixed right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 sm:right-10">
          {websites.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSection(i)}
              aria-label={`Go to ${websites[i].name}`}
              className={`rounded-full transition-all duration-400 ${
                i === activeIndex
                  ? 'h-7 w-1.5 bg-white'
                  : 'h-1.5 w-1.5 bg-neutral-700 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="pointer-events-none fixed bottom-8 left-1/2 -translate-x-1/2">
          <div
            className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${
              activeIndex < websites.length - 1 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-600">Scroll</span>
            <div className="h-8 w-px bg-gradient-to-b from-neutral-600 to-transparent" />
          </div>
        </div>
      </div>
    </main>
  )
}
