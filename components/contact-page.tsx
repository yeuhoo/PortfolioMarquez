'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

gsap.registerPlugin(useGSAP)

const contactItems = [
  {
    label: 'Email',
    value: 'yeumarcsteven@gmail.com',
    href: 'mailto:yeumarcsteven@gmail.com',
    description: 'Best for project inquiries',
  },
  {
    label: 'WhatsApp',
    value: '+63 907 920 1173',
    href: 'https://wa.me/639079201173',
    description: 'Quick replies, Mon – Fri',
  },
  {
    label: 'LinkedIn',
    value: 'marc-steven-marquez',
    href: 'https://www.linkedin.com/in/marc-steven-marquez-a9874a378/',
    description: 'Connect professionally',
  },
  {
    label: 'Location',
    value: 'Davao City, Philippines',
    href: null,
    description: 'GMT+8 · Available remotely',
  },
]

export default function ContactPage() {
  const containerRef = useRef<HTMLElement>(null)
  const isPageTransitioningRef = useRef(false)
  const router = useRouter()

  useGSAP(
    () => {
      const fromPage = window.sessionStorage.getItem('contact_from')
      window.sessionStorage.removeItem('contact_from')

      if (fromPage === 'websites') {
        gsap.set('.contact-main', { yPercent: 100 })
        gsap.to('.contact-main', { yPercent: 0, duration: 0.65, ease: 'power3.inOut' })
      } else {
        // Direct navigation — individual entrance
        gsap.set('.contact-nav-item', { y: -14, opacity: 0 })
        gsap.set('.contact-heading', { y: 40, opacity: 0 })
        gsap.set('.contact-sub', { y: 20, opacity: 0 })
        gsap.set('.contact-item', { y: 30, opacity: 0 })
        gsap.set('.contact-footer', { opacity: 0 })

        gsap.to('.contact-nav-item', { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power2.out', delay: 0.1 })
        gsap.to('.contact-heading', { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.2 })
        gsap.to('.contact-sub', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.35 })
        gsap.to('.contact-item', { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'power3.out', delay: 0.45 })
        gsap.to('.contact-footer', { opacity: 1, duration: 0.5, delay: 0.9 })
      }

      // Hover animations on contact items
      const items = containerRef.current?.querySelectorAll('.contact-item-inner') ?? []
      items.forEach((item) => {
        const el = item as HTMLElement
        const line = el.querySelector('.contact-line') as HTMLElement | null

        gsap.set(line, { scaleX: 0, transformOrigin: '0% 50%' })

        el.addEventListener('mouseenter', () => {
          gsap.to(el, { x: 6, duration: 0.22, ease: 'power2.out' })
          gsap.to(line, { scaleX: 1, duration: 0.28, ease: 'power3.out' })
        })
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { x: 0, duration: 0.24, ease: 'power2.out' })
          gsap.to(line, { scaleX: 0, transformOrigin: '100% 50%', duration: 0.22, ease: 'power2.in' })
        })
      })

      // Wheel handler
      const handleWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaY) < 30) return
        if (isPageTransitioningRef.current) return

        if (e.deltaY < 0) {
          // Scroll up → back to websites
          isPageTransitioningRef.current = true
          gsap.to('.contact-main', {
            yPercent: 100,
            duration: 0.65,
            ease: 'power3.inOut',
            onComplete: () => router.push('/websites'),
          })
        }
      }

      const el = containerRef.current
      el?.addEventListener('wheel', handleWheel, { passive: true })
      return () => el?.removeEventListener('wheel', handleWheel)
    },
    { scope: containerRef }
  )

  return (
    <main
      ref={containerRef}
      className="h-dvh overflow-hidden bg-neutral-950 text-neutral-100"
    >
      <div className="contact-main h-full w-full">
        {/* Header */}
        <header className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-8 sm:px-10">
          <Link
            href="/"
            className="contact-nav-item flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 transition-colors hover:text-neutral-200"
          >
            <span>←</span>
            <span>Home</span>
          </Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/about" className="contact-nav-item text-neutral-400 transition-colors hover:text-white">
              About Me
            </Link>
            <Link href="/websites" className="contact-nav-item text-neutral-400 transition-colors hover:text-white">
              Projects
            </Link>
            <span className="contact-nav-item relative text-white">
              Contact
              <span className="absolute -bottom-0.5 left-0 block h-px w-full bg-white" />
            </span>
          </nav>
        </header>

        {/* Main content */}
        <div className="flex h-full flex-col justify-center px-6 sm:px-10">
          <div className="mx-auto w-full max-w-6xl">
            <div className="grid gap-16 md:grid-cols-[1fr_1fr] md:gap-24 lg:grid-cols-[1.1fr_0.9fr]">

              {/* Left */}
              <div className="flex flex-col justify-center">
                <p className="contact-sub mb-4 text-[11px] uppercase tracking-[0.35em] text-neutral-600">
                  Get in Touch
                </p>
                <h1 className="contact-heading text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.88] tracking-[-0.03em] text-white">
                  Let&apos;s build<br />something great.
                </h1>
                <p className="contact-sub mt-6 max-w-[40ch] text-base leading-relaxed text-neutral-500">
                  Whether you have a project in mind or just want to talk shop — reach out. I&apos;m always open to new opportunities.
                </p>
              </div>

              {/* Right — contact list */}
              <div className="flex flex-col justify-center gap-1">
                {contactItems.map((item, i) => (
                  <div key={i} className="contact-item">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="contact-item-inner group flex cursor-pointer items-start justify-between border-b border-neutral-800 py-5"
                      >
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-600">
                            {item.label}
                          </p>
                          <p className="mt-1.5 text-lg font-medium text-white">
                            {item.value}
                          </p>
                          <p className="mt-0.5 text-xs text-neutral-600">
                            {item.description}
                          </p>
                          <span className="contact-line mt-3 block h-px bg-neutral-400" />
                        </div>
                        <span className="mt-1 text-neutral-700 transition-colors group-hover:text-neutral-300">
                          ↗
                        </span>
                      </a>
                    ) : (
                      <div className="contact-item-inner flex items-start justify-between border-b border-neutral-800 py-5">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-600">
                            {item.label}
                          </p>
                          <p className="mt-1.5 text-lg font-medium text-white">
                            {item.value}
                          </p>
                          <p className="mt-0.5 text-xs text-neutral-600">
                            {item.description}
                          </p>
                          <span className="contact-line mt-3 block h-px bg-neutral-400" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="contact-footer absolute bottom-8 left-0 right-0 flex items-center justify-between px-6 sm:px-10">
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-700">
            © {new Date().getFullYear()} Marc Marquez
          </p>
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-700">
            Available for freelance work
          </p>
        </div>
      </div>
    </main>
  )
}
