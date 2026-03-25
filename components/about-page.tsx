'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/navigation'

gsap.registerPlugin(useGSAP)

export default function AboutPage() {
  const pageRef = useRef<HTMLElement>(null)
  const isPageTransitioningRef = useRef(false)
  const router = useRouter()
  const techTitle = 'TECH STACKS'
  const placeholderCards = [
    { title: 'WordPress', subtitle: 'Image coming soon' },
    { title: 'Shopify', subtitle: 'Image coming soon' },
    { title: 'React', subtitle: 'Image coming soon' },
    { title: 'Next.js', subtitle: 'Image coming soon' },
    { title: 'GSAP', subtitle: 'Image coming soon' },
    { title: 'Webflow', subtitle: 'Image coming soon' },
    { title: 'Supabase', subtitle: 'Image coming soon' },
    { title: 'ASP.NET', subtitle: 'Image coming soon' },
    { title: 'JavaScript', subtitle: 'Image coming soon' },
    { title: 'CSS', subtitle: 'Image coming soon' },
    { title: 'Framer', subtitle: 'Image coming soon' },
    { title: 'Google Search Console', subtitle: 'Image coming soon' },
    { title: 'Google Analytics 4', subtitle: 'Image coming soon' },
    { title: 'Semrush', subtitle: 'Image coming soon' },
    { title: 'Screaming Frog', subtitle: 'Image coming soon' },
    { title: 'PageSpeed Insights', subtitle: 'Image coming soon' },
    { title: 'Lighthouse', subtitle: 'Image coming soon' },
    { title: 'Rich Results Test', subtitle: 'Image coming soon' }
  ]
  const [activeIndex, setActiveIndex] = useState(2)

  const totalCards = placeholderCards.length

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
            <span className="text-neutral-400">Projects</span>
            <span className="text-neutral-400">Services</span>
            <span className="text-neutral-400">Contact</span>
          </nav>
        </header>

        <section className="about-animate flex min-h-[72vh] items-center">
          <div className="max-w-4xl">
            <p className="about-animate text-xs uppercase tracking-[0.22em] text-neutral-400">
              About Me
            </p>
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
          <div className="relative mt-60 h-[690px] overflow-visible">
            <div className="absolute inset-0 perspective-[1400px]">
              {placeholderCards.map((card, index) => {
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
                    <div className="mt-6 h-72 rounded-2xl border border-neutral-700/70 bg-gradient-to-br from-neutral-700/60 via-neutral-800 to-neutral-900" />
                    <p className="mt-6 text-base text-neutral-200">{card.subtitle}</p>
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
