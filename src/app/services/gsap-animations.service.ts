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
        '.social-links a',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.15 },
        '-=0.3'
      );

    return tl;
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

  // Text reveal animation
  animateTextReveal(selector: string) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          backgroundSize: '0% 100%',
          opacity: 0.3,
        },
        {
          backgroundSize: '100% 100%',
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
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
      this.createMagneticEffect('.social-links a');
    }, 100);
  }
}
