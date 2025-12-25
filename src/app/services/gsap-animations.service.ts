import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root',
})
export class GsapAnimationsService {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Reveal sections on scroll with staggered children
  animateSectionReveal(sectionSelector: string, childSelector?: string) {
    const sections = document.querySelectorAll(sectionSelector);

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (childSelector) {
        const children = section.querySelectorAll(childSelector);
        gsap.fromTo(
          children,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }

  // Hero entrance animation - Subtle and elegant
  animateHeroEntrance() {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.fromTo(
      '.profile-image-container',
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 }
    )
      .fromTo(
        '.hero-text .name',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        '.hero-text .title',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        '.contact-info .contact-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 },
        '-=0.4'
      )
      .fromTo(
        '.social-links a, .social-links button',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        '-=0.3'
      );

    return tl;
  }

  // Enhanced Parallax effect for sections
  animateParallax() {
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {
      // Parallax background elements
      const bgElements = section.querySelectorAll('.parallax-bg');
      if (bgElements.length > 0) {
        gsap.to(bgElements, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Parallax content elements
      const contentElements = section.querySelectorAll('.parallax-content');
      if (contentElements.length > 0) {
        gsap.to(contentElements, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }
    });
  }

  // Image reveal with clip-path
  animateImageReveal() {
    const images = document.querySelectorAll('.reveal-image');

    images.forEach((img) => {
      gsap.fromTo(
        img,
        {
          clipPath: 'inset(0% 100% 0% 0%)',
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  // Staggered text reveal
  animateTextReveal() {
    const textElements = document.querySelectorAll('.reveal-text');

    textElements.forEach((element) => {
      const words = element.textContent?.split(' ') || [];
      element.innerHTML = words.map((word) => `<span class="word">${word}</span>`).join(' ');

      const wordElements = element.querySelectorAll('.word');

      gsap.fromTo(
        wordElements,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  // Scroll progress indicator
  animateScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      gsap.to(progressBar, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });
    }
  }

  // Skill chips animation - Minimal fade-up
  animateSkillChips() {
    const chips = document.querySelectorAll('.skill-category mat-chip');

    gsap.fromTo(
      chips,
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.skill-category',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  // Project cards - Smooth fade-up
  animateProjectCards() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: index * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  // Contact form animation - Subtle fade-up
  animateContactForm() {
    const formFields = document.querySelectorAll('.contact-form-card .form-row');
    const infoCard = document.querySelector('.contact-info-card');

    gsap.fromTo(
      infoCard,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      formFields,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-form-card',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  // Magnetic button effect
  createMagneticEffect(selector: string) {
    const buttons = document.querySelectorAll(selector);

    buttons.forEach((button) => {
      const btn = button as HTMLElement;

      btn.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        });
      });
    });
  }

  // Smooth scroll reveal for section titles - Elegant fade-up
  animateSectionTitles() {
    const titles = document.querySelectorAll('.section-title');

    titles.forEach((title) => {
      gsap.fromTo(
        title,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  // Initialize all animations
  initAllAnimations() {
    // Wait for DOM to be ready
    setTimeout(() => {
      this.animateHeroEntrance();
      this.animateSectionReveal('section', '.mat-mdc-card');
      this.animateSectionTitles();
      this.animateSkillChips();
      this.animateProjectCards();
      this.animateContactForm();
      this.createMagneticEffect('.social-links a, .social-links button');

      // Refresh ScrollTrigger after all animations are set up
      ScrollTrigger.refresh();
    }, 100);
  }

  // ========== PHASE 3: ADVANCED MOTION DESIGN ========== //

  // Text scramble effect
  scrambleText(element: HTMLElement, finalText: string, duration = 1000) {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let iteration = 0;
    const iterations = finalText.length;
    const interval = setInterval(() => {
      element.textContent = finalText
        .split('')
        .map((char, index) => {
          if (index < iteration) return finalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      if (iteration >= iterations) clearInterval(interval);
      iteration += 1 / 3;
    }, duration / iterations);
  }

  // Card tilt effect
  createCardTilt(selector: string, maxTilt = 10) {
    const cards = document.querySelectorAll(selector);
    cards.forEach((card) => {
      const el = card as HTMLElement;
      el.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * maxTilt;
        const rotateY = ((centerX - x) / centerX) * maxTilt;
        gsap.to(el, {
          rotateX,
          rotateY,
          duration: 0.3,
          transformPerspective: 1000,
          ease: 'power2.out',
        });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }

  // Stagger fade-in
  staggerFadeIn(selector: string, staggerAmount = 0.1) {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: staggerAmount,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: elements[0],
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }
}
