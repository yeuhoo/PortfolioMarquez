"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

gsap.registerPlugin(useGSAP);

export default function PortfolioPage() {
  const containerRef = useRef<HTMLElement>(null);
  const isPageTransitioningRef = useRef(false);
  const router = useRouter();
  const leftWord = "SEO";
  const rightWordTop = "Web";
  const rightWordBottom = "Development";

  useGSAP(
    () => {
      const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });
      const mainElement = containerRef.current;
      const hoverZone = containerRef.current?.querySelector(
        ".word-hover-zone",
      ) as HTMLElement | null;
      let isIntroComplete = false;

      const lettersLeft = ".word-letter-left";
      const lettersRight = ".word-letter-right";
      const leftWordSelector = ".big-word-left";
      const rightWordSelector = ".big-word-right";
      const imageSelector = ".big-image";
      const cardDetailsSelector = ".card-detail";
      const cardChipSelector = ".card-chip";
      const cardElement = containerRef.current?.querySelector(
        ".big-image",
      ) as HTMLElement | null;
      const headerLinks = Array.from(
        containerRef.current?.querySelectorAll(".header-link") ?? [],
      ) as HTMLElement[];
      let isCardHovered = false;

      const resetCardState = (duration = 0.4) => {
        gsap.killTweensOf([
          imageSelector,
          cardDetailsSelector,
          cardChipSelector,
        ]);

        gsap.to(imageSelector, {
          scale: 1,
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration,
          ease: "power3.out",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
          borderColor: "#262626",
          overwrite: "auto",
        });

        gsap.to(cardDetailsSelector, {
          y: 8,
          opacity: 0,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsap.to(cardChipSelector, {
          y: 8,
          opacity: 0,
          scale: 0.95,
          duration: 0.25,
          stagger: 0.04,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const resetWordState = (duration = 0.45) => {
        gsap.killTweensOf([
          lettersLeft,
          lettersRight,
          leftWordSelector,
          rightWordSelector,
          imageSelector,
        ]);

        gsap.to([leftWordSelector, rightWordSelector, imageSelector], {
          x: 0,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration,
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to([lettersLeft, lettersRight], {
          y: 0,
          opacity: 1,
          skewX: 0,
          scaleY: 1,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      const handleHoverMove = (event: Event) => {
        if (!hoverZone) {
          return;
        }

        const mouseEvent = event as MouseEvent;

        const rect = hoverZone.getBoundingClientRect();
        const horizontal = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
        const vertical = (mouseEvent.clientY - rect.top) / rect.height - 0.5;

        gsap.to(leftWordSelector, {
          x: horizontal * -26,
          y: vertical * -10,
          rotateY: horizontal * -11,
          rotateX: vertical * 7,
          duration: 0.28,
          ease: "power2.out",
          overwrite: "auto",
          transformPerspective: 1000,
        });

        gsap.to(rightWordSelector, {
          x: horizontal * 24,
          y: vertical * -8,
          rotateY: horizontal * 9,
          rotateX: vertical * -6,
          duration: 0.28,
          ease: "power2.out",
          overwrite: "auto",
          transformPerspective: 1000,
        });

        if (!isCardHovered) {
          gsap.to(imageSelector, {
            x: horizontal * 16,
            y: vertical * 12,
            rotateY: horizontal * 8,
            rotateX: vertical * -5,
            duration: 0.32,
            ease: "power2.out",
            overwrite: "auto",
            transformPerspective: 1000,
          });
        }
      };

      const handleHoverEnter = () => {
        gsap.killTweensOf([lettersLeft, lettersRight]);

        gsap.fromTo(
          lettersLeft,
          {
            y: 24,
            opacity: 0,
            skewX: 10,
            scaleY: 0.86,
            transformOrigin: "50% 100%",
          },
          {
            y: 0,
            opacity: 1,
            skewX: 0,
            scaleY: 1,
            duration: 0.55,
            stagger: 0.07,
            ease: "power3.out",
          },
        );

        gsap.fromTo(
          lettersRight,
          {
            y: 20,
            opacity: 0,
            skewX: -8,
            scaleY: 0.9,
            transformOrigin: "50% 100%",
          },
          {
            y: 0,
            opacity: 1,
            skewX: 0,
            scaleY: 1,
            duration: 0.5,
            stagger: 0.045,
            ease: "power3.out",
            delay: 0.08,
          },
        );
      };

      const handleHoverLeave = () => {
        resetWordState(0.5);
      };

      const handleCardEnter = () => {
        isCardHovered = true;

        gsap.to(imageSelector, {
          scale: 1.08,
          y: -8,
          duration: 0.45,
          ease: "power3.out",
          borderColor: "#4b5563",
          boxShadow:
            "0 30px 70px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.14)",
          overwrite: "auto",
        });

        gsap.fromTo(
          cardDetailsSelector,
          {
            y: 14,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: "auto",
          },
        );

        gsap.fromTo(
          cardChipSelector,
          {
            y: 10,
            opacity: 0,
            scale: 0.92,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.35,
            stagger: 0.05,
            ease: "power3.out",
            overwrite: "auto",
          },
        );
      };

      const handleCardMove = (event: Event) => {
        if (!cardElement) {
          return;
        }

        const mouseEvent = event as MouseEvent;
        const rect = cardElement.getBoundingClientRect();
        const horizontal = (mouseEvent.clientX - rect.left) / rect.width - 0.5;
        const vertical = (mouseEvent.clientY - rect.top) / rect.height - 0.5;

        gsap.to(imageSelector, {
          x: horizontal * 12,
          y: vertical * 8 - 8,
          rotateY: horizontal * 10,
          rotateX: vertical * -8,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
          transformPerspective: 1000,
        });
      };

      const handleCardLeave = () => {
        isCardHovered = false;
        resetCardState(0.45);
      };

      const handlePageWheel = (event: Event) => {
        if (!isIntroComplete || isPageTransitioningRef.current) {
          return;
        }

        const wheelEvent = event as WheelEvent;

        if (wheelEvent.deltaY < 30) {
          return;
        }

        isPageTransitioningRef.current = true;
        window.sessionStorage.setItem("portfolio_transition_dir", "down");

        gsap.to(".main-content", {
          yPercent: -100,
          duration: 0.65,
          ease: "power3.inOut",
          overwrite: "auto",
          onComplete: () => {
            router.push("/about");
          },
        });
      };

      const handleHeaderEnter = (event: Event) => {
        const link = event.currentTarget as HTMLElement;
        const label = link.querySelector(
          ".header-link-label",
        ) as HTMLElement | null;
        const line = link.querySelector(
          ".header-link-line",
        ) as HTMLElement | null;

        gsap.to(link, {
          y: -2,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (label) {
          gsap.to(label, {
            color: "#ffffff",
            letterSpacing: "0.05em",
            duration: 0.22,
            ease: "power2.out",
            overwrite: "auto",
          });
        }

        if (line) {
          gsap.to(line, {
            scaleX: 1,
            opacity: 1,
            transformOrigin: "0% 50%",
            duration: 0.28,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      };

      const handleHeaderLeave = (event: Event) => {
        const link = event.currentTarget as HTMLElement;
        const label = link.querySelector(
          ".header-link-label",
        ) as HTMLElement | null;
        const line = link.querySelector(
          ".header-link-line",
        ) as HTMLElement | null;

        gsap.to(link, {
          y: 0,
          duration: 0.24,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (label) {
          gsap.to(label, {
            color: "#e5e7eb",
            letterSpacing: "0em",
            duration: 0.24,
            ease: "power2.out",
            overwrite: "auto",
          });
        }

        if (line) {
          gsap.to(line, {
            scaleX: 0,
            opacity: 0.5,
            transformOrigin: "100% 50%",
            duration: 0.24,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const introStorageKey = "portfolio_intro_seen";
      const hasSeenIntro =
        window.sessionStorage.getItem(introStorageKey) === "1";
      const transitionDirection = window.sessionStorage.getItem(
        "portfolio_transition_dir",
      );

      if (transitionDirection === "up") {
        gsap.set(".main-content", { autoAlpha: 1, yPercent: -100 });
        timeline.to(".main-content", {
          yPercent: 0,
          duration: 0.65,
          ease: "power3.inOut",
        });
      }

      window.sessionStorage.removeItem("portfolio_transition_dir");

      if (hasSeenIntro) {
        gsap.set(".intro-overlay", { display: "none", yPercent: 0 });
        if (transitionDirection !== "up") {
          gsap.set(".main-content", { autoAlpha: 1 });
        }
        isIntroComplete = true;
      } else {
        timeline
          .fromTo(
            ".intro-title",
            {
              y: 18,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
            },
          )
          .fromTo(
            ".intro-subtitle",
            {
              y: 8,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.35,
            },
            "-=0.2",
          )
          .fromTo(
            ".intro-progress",
            {
              scaleX: 0,
              transformOrigin: "0% 50%",
            },
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power2.inOut",
            },
            "-=0.05",
          )
          .to(
            ".intro-overlay",
            {
              yPercent: -100,
              duration: 0.85,
              ease: "power4.inOut",
            },
            "+=0.15",
          )
          .set(".intro-overlay", { display: "none" })
          .add(() => {
            isIntroComplete = true;
            window.sessionStorage.setItem(introStorageKey, "1");
          })
          .to(
            ".main-content",
            {
              autoAlpha: 1,
              duration: 0.01,
            },
            "<",
          );
      }

      timeline
        .fromTo(
          ".nav-animate",
          {
            y: -14,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.06,
          },
        )
        .from(
          ".hero-animate",
          {
            y: 28,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.1,
          },
          "-=0.1",
        )
        .from(
          ".big-image",
          {
            y: 70,
            autoAlpha: 0,
            duration: 0.85,
          },
          "-=0.65",
        );

      hoverZone?.addEventListener("mouseenter", handleHoverEnter);
      hoverZone?.addEventListener("mousemove", handleHoverMove);
      hoverZone?.addEventListener("mouseleave", handleHoverLeave);
      cardElement?.addEventListener("mouseenter", handleCardEnter);
      cardElement?.addEventListener("mousemove", handleCardMove);
      cardElement?.addEventListener("mouseleave", handleCardLeave);
      mainElement?.addEventListener("wheel", handlePageWheel, {
        passive: true,
      });
      headerLinks.forEach((link) => {
        const line = link.querySelector(
          ".header-link-line",
        ) as HTMLElement | null;

        if (line) {
          gsap.set(line, {
            scaleX: 0,
            opacity: 0.5,
            transformOrigin: "100% 50%",
          });
        }

        link.addEventListener("mouseenter", handleHeaderEnter);
        link.addEventListener("mouseleave", handleHeaderLeave);
      });

      resetWordState(0);
      resetCardState(0);

      return () => {
        hoverZone?.removeEventListener("mouseenter", handleHoverEnter);
        hoverZone?.removeEventListener("mousemove", handleHoverMove);
        hoverZone?.removeEventListener("mouseleave", handleHoverLeave);
        cardElement?.removeEventListener("mouseenter", handleCardEnter);
        cardElement?.removeEventListener("mousemove", handleCardMove);
        cardElement?.removeEventListener("mouseleave", handleCardLeave);
        mainElement?.removeEventListener("wheel", handlePageWheel);
        headerLinks.forEach((link) => {
          link.removeEventListener("mouseenter", handleHeaderEnter);
          link.removeEventListener("mouseleave", handleHeaderLeave);
        });
        isPageTransitioningRef.current = false;
        resetWordState(0);
        resetCardState(0);
      };
    },
    { scope: containerRef },
  );

  return (
    <main
      ref={containerRef}
      className="h-dvh overflow-hidden bg-neutral-950 text-neutral-100"
    >
      <div className="intro-overlay fixed inset-0 z-40 flex items-center justify-center bg-neutral-950 px-6">
        <div className="w-full max-w-sm text-center">
          <p className="intro-title text-2xl font-semibold tracking-[0.08em] text-neutral-100 sm:text-3xl">
            Marc Marquez
          </p>
          <p className="intro-subtitle mt-3 text-xs uppercase tracking-[0.22em] text-neutral-400">
            Loading Portfolio
          </p>
          <div className="mt-6 h-[2px] w-full overflow-hidden rounded bg-neutral-800">
            <div className="intro-progress h-full w-full bg-neutral-100" />
          </div>
        </div>
      </div>

      <div className="main-content mx-auto flex h-full w-full max-w-6xl flex-col px-6 py-8 opacity-0 sm:px-10">
        <section className="flex flex-1 flex-col pb-6">
          <div className="flex-1">
            <header className="flex justify-end">
              <nav className="flex gap-6 text-sm text-neutral-200">
                <Link
                  href="/about"
                  className="header-link nav-animate cursor-pointer"
                >
                  <span className="header-link-label block">About Me</span>
                  <span className="header-link-line mt-1 block h-px w-full bg-neutral-100" />
                </Link>
                <span className="header-link nav-animate cursor-pointer">
                  <span className="header-link-label block">Projects</span>
                  <span className="header-link-line mt-1 block h-px w-full bg-neutral-100" />
                </span>
                <span className="header-link nav-animate cursor-pointer">
                  <span className="header-link-label block">Services</span>
                  <span className="header-link-line mt-1 block h-px w-full bg-neutral-100" />
                </span>
                <span className="header-link nav-animate cursor-pointer">
                  <span className="header-link-label block">Contact</span>
                  <span className="header-link-line mt-1 block h-px w-full bg-neutral-100" />
                </span>
              </nav>
            </header>

            <h1 className="hero-animate mt-8 max-w-4xl text-4xl font-semibold leading-tight text-white sm:mt-10 sm:text-6xl">
              Marc Marquez
            </h1>
            <p className="hero-animate mt-6 max-w-2xl text-base text-neutral-300 sm:text-lg">
              A Full Stack Web Developer and SEO Specialist. Welcome to my
              Portfolio!
            </p>
          </div>

          <div className="bottom-hero-wrap -translate-x-12 md:-translate-x-36">
            <div className="word-hover-zone grid items-end gap-4 pt-8 md:grid-cols-[auto_minmax(220px,20vw)_1fr] md:gap-6">
              <h2
                aria-label={leftWord}
                className="big-word-left whitespace-nowrap text-[clamp(3.25rem,11vw,9.5rem)] font-semibold leading-[0.85] tracking-[-0.04em] text-neutral-50"
              >
                {Array.from(leftWord).map((letter, index) => (
                  <span
                    key={`${letter}-${index}`}
                    aria-hidden="true"
                    className="word-letter-left inline-block"
                  >
                    {letter}
                  </span>
                ))}
              </h2>

              <div className="big-image h-[clamp(180px,22vw,320px)] w-full cursor-pointer rounded-[2rem] border border-neutral-800 bg-gradient-to-br from-neutral-700 via-neutral-900 to-neutral-950 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] will-change-transform md:translate-y-3">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-300">
                  Available for Work
                </p>
                <p className="mt-4 max-w-[20ch] text-sm text-neutral-300">
                  I help brands and startups turn ideas into performant digital
                  products.
                </p>
                <p className="card-detail mt-4 max-w-[24ch] text-xs text-neutral-200">
                  From frontend polish to backend architecture.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="card-chip rounded-full border border-neutral-600 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-neutral-200">
                    UX Architecture
                  </span>
                  <span className="card-chip rounded-full border border-neutral-600 px-2 py-1 text-[10px] uppercase tracking-[0.16em] text-neutral-200">
                    Technical SEO
                  </span>
                </div>
              </div>

              <h2
                aria-label="Web Development"
                className="big-word-right justify-self-end w-max text-left text-[clamp(3.25rem,10vw,8.6rem)] font-semibold leading-[0.85] tracking-[-0.04em] text-neutral-50"
              >
                <span className="block whitespace-nowrap">
                  {Array.from(rightWordTop).map((letter, index) => (
                    <span
                      key={`top-${letter}-${index}`}
                      aria-hidden="true"
                      className="word-letter-right inline-block"
                    >
                      {letter}
                    </span>
                  ))}
                </span>
                <span className="block whitespace-nowrap">
                  {Array.from(rightWordBottom).map((letter, index) => (
                    <span
                      key={`bottom-${letter}-${index}`}
                      aria-hidden="true"
                      className="word-letter-right inline-block"
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </h2>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
