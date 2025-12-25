import { Injectable } from '@angular/core';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root',
})
export class SmoothScrollService {
  private lenis: Lenis | null = null;

  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  init() {
    // Initialize Lenis
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Integrate with GSAP ScrollTrigger
    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  scrollTo(target: string | number, options?: any) {
    this.lenis?.scrollTo(target, options);
  }

  destroy() {
    this.lenis?.destroy();
    this.lenis = null;
  }

  getLenis() {
    return this.lenis;
  }
}
