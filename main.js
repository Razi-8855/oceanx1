/* =========================================================================
   Oceanix Hospitality - Interactions & GSAP Animations
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // --- Lenis Smooth Scroll Setup ---
    const lenis = new Lenis({
        duration: 1.0, // Reduced from 1.5 to make it feel less heavy
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        direction: 'vertical',
        gestureDirection: 'vertical',
        smoothTouch: false,
        touchMultiplier: 2,
        wheelMultiplier: 1.2, // Increases scroll sensitivity
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = mobileMenuBtn.querySelector("i");
            if (icon.classList.contains("fa-bars")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
                lenis.stop();
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
                lenis.start();
            }
        });

        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll("a");
        links.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = mobileMenuBtn.querySelector("i");
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
                lenis.start();
            });
        });
    }

    // --- Hero Section Animations ---
    const heroTl = gsap.timeline();

    // Subtle zoom on the background image or video
    heroTl.to(".hero-img, .hero-video", {
        scale: 1,
        duration: 5,
        ease: "power2.out"
    }, 0);

    // Reveal main headline
    heroTl.fromTo(".gsap-reveal",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.8, ease: "power3.out" },
        0.5
    );

    // Reveal subtext
    heroTl.fromTo(".gsap-reveal-delay",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power3.out" },
        0.9
    );

    // Reveal buttons
    heroTl.fromTo(".gsap-reveal-delay-2",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        1.2
    );

    // --- ScrollTrigger Cinematic Reveals (Runs on all devices) ---
    const revealElements = document.querySelectorAll(".section .gsap-reveal");
    revealElements.forEach((el) => {
        gsap.fromTo(el,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // --- Staggered Cards (Programs Section) ---
    gsap.fromTo(".gsap-card",
        { y: 60, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".cards-grid",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // --- Process / Timeline Reveal ---
    gsap.fromTo(".gsap-process",
        { y: 50, opacity: 0, scale: 0.95 },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.25,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".timeline",
                start: "top 75%"
            }
        }
    );

    // --- Results Stagger Reveal ---
    gsap.fromTo(".result-brand",
        { scale: 0.9, opacity: 0, y: 30 },
        {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".results-grid",
                start: "top 85%"
            }
        }
    );

    // =========================================================================
    // Desktop-Only Parallax Effects (Prevents lag on mobile touch devices)
    // =========================================================================
    let mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {

        // Hero Background Parallax
        gsap.to(".hero-bg", {
            yPercent: 35,
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Intro Image Parallax
        const introImage = document.querySelector(".split-image img");
        if (introImage) {
            gsap.fromTo(introImage,
                { scale: 1.15, yPercent: -5 },
                {
                    scale: 1,
                    yPercent: 5,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".split-image",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        }

        // Results Section Parallax
        gsap.fromTo(".results-section",
            { backgroundPosition: "50% 0%" },
            {
                backgroundPosition: "50% 100%",
                ease: "none",
                scrollTrigger: {
                    trigger: ".results-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );

        // CTA Section Parallax
        gsap.fromTo(".cta-section",
            { backgroundPosition: "50% 0%" },
            {
                backgroundPosition: "50% 100%",
                ease: "none",
                scrollTrigger: {
                    trigger: ".cta-section",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );

    });

});
