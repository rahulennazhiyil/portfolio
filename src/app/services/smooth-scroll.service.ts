import { Injectable, NgZone } from '@angular/core';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root',
})
export class SmoothScrollService {
  private lenis: Lenis | null = null;
  private rafId: number | null = null;

  constructor(private ngZone: NgZone) {
    gsap.registerPlugin(ScrollTrigger);
  }

  init() {
    // Run outside Angular zone for better performance
    this.ngZone.runOutsideAngular(() => {
      // Initialize Lenis with optimized settings
      this.lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 2,
        infinite: false,
        autoResize: true,
      });

      // Debug logging
      this.lenis.on('scroll', (e: any) => {
        ScrollTrigger.update();
        // console.log('Lenis scroll:', e.scroll, e.velocity);
      });

      // Animation loop
      const raf = (time: number) => {
        this.lenis?.raf(time);
        this.rafId = requestAnimationFrame(raf);
      };

      this.rafId = requestAnimationFrame(raf);

      console.log('✅ Lenis smooth scroll initialized');
    });
  }

  scrollTo(target: string | number, options?: any) {
    if (this.lenis) {
      this.lenis.scrollTo(target, {
        offset: options?.offset || 0,
        duration: options?.duration || 1.5,
        easing: options?.easing || ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
        ...options,
      });
    }
  }

  stop() {
    this.lenis?.stop();
  }

  start() {
    this.lenis?.start();
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.lenis?.destroy();
    this.lenis = null;
    console.log('🛑 Lenis smooth scroll destroyed');
  }

  getLenis() {
    return this.lenis;
  }

  getScroll() {
    return this.lenis?.scroll || 0;
  }

  getVelocity() {
    return (this.lenis as any)?.velocity || 0;
  }
}
