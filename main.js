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

    // Recalculate ScrollTrigger positions after all assets finish loading
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // =========================================================================
    // Premium Application Modal Logic
    // =========================================================================
    const modal = document.getElementById("applyModal");
    const modalOverlay = document.querySelector(".modal-overlay");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const openModalBtns = document.querySelectorAll(".open-apply-modal");
    const applyForm = document.getElementById("applyForm");
    const submitBtn = document.getElementById("submitBtn");
    const btnText = document.getElementById("btnText");
    const btnIcon = document.getElementById("btnIcon");

    const openModal = () => {
        if(modal) modal.classList.add("active");
        if(lenis) lenis.stop(); // Disable background scrolling
    };

    const closeModal = () => {
        if(modal) modal.classList.remove("active");
        if(lenis) lenis.start(); // Re-enable scrolling
    };

    if (modal) {
        openModalBtns.forEach(btn => btn.addEventListener("click", openModal));
        closeModalBtn.addEventListener("click", closeModal);
        modalOverlay.addEventListener("click", closeModal);

        // Escape key to close
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("active")) {
                closeModal();
            }
        });
        // Dynamic Position Dropdown based on Department
        const deptSelect = document.getElementById("candDept");
        const posSelect = document.getElementById("candPosition");
        
        const positionsMap = {
            "Security": ["Security Guard", "Security Officer", "Chief Security"],
            "Food Production": ["Executive Chef", "Sous Chef", "Pastry Chef", "Commis", "Baker"],
            "F & B Service": ["Restaurant Manager", "Waiter/Waitress", "Bartender", "Sommelier", "Buffet Steward"],
            "Housekeeping": ["Cabin Steward", "Cleaner", "Laundry Operator", "Florist", "Pool Attendant"],
            "Accounts/Finance": ["Purser", "Payroll Manager", "Accountant"],
            "Front Office": ["Guest Service Officer", "Receptionist", "Night Auditor", "Concierge"],
            "Kitchen Management": ["Kitchen Steward", "Provision Master", "Storekeeper"],
            "Photography": ["Photographer", "Photo Gallery Manager", "Videographer"],
            "Medical": ["Doctor", "Nurse", "Paramedic"],
            "Spa/Salon": ["Massage Therapist", "Hair Stylist", "Nail Technician", "Fitness Instructor"],
            "Sales": ["Retail Assistant", "Duty Free Manager", "Fine Jewelry Consultant"]
        };

        if (deptSelect && posSelect) {
            deptSelect.addEventListener("change", () => {
                const selectedDept = deptSelect.value;
                const positions = positionsMap[selectedDept] || [];
                
                posSelect.innerHTML = '<option value="" disabled selected>Select Position</option>';
                
                positions.forEach(pos => {
                    const opt = document.createElement("option");
                    opt.value = pos;
                    opt.textContent = pos;
                    posSelect.appendChild(opt);
                });
            });
        }

        // Form Submission Logic
        applyForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Gather Data
            const formData = new FormData(applyForm);
            const name = formData.get("name");
            const email = formData.get("email");
            const phone = formData.get("phone");
            const dob = formData.get("dob");
            const position = formData.get("position");
            const experience = formData.get("experience");
            const department = formData.get("department");
            const age = formData.get("age");
            const gender = formData.get("gender");
            const location = formData.get("location");
            const cdc = formData.get("cdc") || "Not Provided";
            const message = formData.get("message") || "No additional message.";

            // Format WhatsApp String
            const waRawMessage = `*New Candidate Application* 🚢 \n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Date of Birth:* ${dob}\n*Age:* ${age}\n*Gender:* ${gender}\n*Location:* ${location}\n*Department:* ${department}\n*Position:* ${position}\n*Experience:* ${experience}\n*CDC Status:* ${cdc}\n\n*Message:*\n${message}`;
            const encodedMessage = encodeURIComponent(waRawMessage);
            const waLink = `https://wa.me/919446481424?text=${encodedMessage}`;

            // UI Loading Feedback
            submitBtn.classList.add("loading");
            submitBtn.disabled = true;
            btnText.innerText = "Redirecting...";
            btnIcon.className = "fas fa-spinner fa-spin";

            // Premium Delay & Redirect
            setTimeout(() => {
                window.open(waLink, "_blank");
                
                // Reset form gracefully
                setTimeout(() => {
                    submitBtn.classList.remove("loading");
                    submitBtn.disabled = false;
                    btnText.innerText = "Submit via WhatsApp";
                    btnIcon.className = "fab fa-whatsapp";
                    applyForm.reset();
                    closeModal();
                }, 500);
            }, 1200);
        });
    }

});
