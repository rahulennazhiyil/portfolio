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

  // Hero entrance animation
  animateHeroEntrance() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.profile-image-container',
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 1.2 }
    )
      .fromTo(
        '.hero-text .name',
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        '.hero-text .title',
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        '.contact-info .contact-item',
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
        '-=0.4'
      )
      .fromTo(
        '.social-links a, .social-links button',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
        '-=0.3'
      );

    return tl;
  }

  // Parallax effect for sections
  animateParallax() {
    const sections = document.querySelectorAll('section');

    sections.forEach((section) => {
      gsap.to(section, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
  }

  // Skill chips animation
  animateSkillChips() {
    const chips = document.querySelectorAll('.skill-category mat-chip');

    gsap.fromTo(
      chips,
      {
        opacity: 0,
        scale: 0.8,
        rotateY: 90,
      },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.skill-category',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  // Project cards with 3D effect
  animateProjectCards() {
    const cards = document.querySelectorAll('.project-card');

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          rotateX: -15,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Add hover tilt effect
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }

  // Contact form animation
  animateContactForm() {
    const formFields = document.querySelectorAll('.contact-form-card .form-row');
    const infoCard = document.querySelector('.contact-info-card');

    gsap.fromTo(
      infoCard,
      { opacity: 0, x: -100, rotateY: -20 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      formFields,
      { opacity: 0, x: 100, rotateY: 20 },
      {
        opacity: 1,
        x: 0,
        rotateY: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
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

  // Smooth scroll reveal for section titles
  animateSectionTitles() {
    const titles = document.querySelectorAll('.section-title');

    titles.forEach((title) => {
      gsap.fromTo(
        title,
        {
          opacity: 0,
          y: 50,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.5)',
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
}
