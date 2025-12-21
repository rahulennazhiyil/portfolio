import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit {
  @Output() loadingComplete = new EventEmitter<void>();

  progress = 0;

  ngOnInit(): void {
    this.animateLoader();
  }

  private animateLoader(): void {
    const tl = gsap.timeline({
      onComplete: () => {
        this.hideLoader();
      },
    });

    // Animate progress counter
    tl.to(this, {
      progress: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const progressElement = document.querySelector('.progress-number');
        if (progressElement) {
          progressElement.textContent = Math.floor(this.progress) + '%';
        }
      },
    });

    // Animate progress bar
    tl.to(
      '.progress-bar-fill',
      {
        width: '100%',
        duration: 2.5,
        ease: 'power2.inOut',
      },
      0
    );

    // Animate loader text
    tl.from(
      '.loader-text span',
      {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      },
      0.3
    );

    // Animate circles
    tl.from(
      '.loader-circle',
      {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'back.out(1.7)',
      },
      0.5
    );
  }

  private hideLoader(): void {
    const tl = gsap.timeline({
      onComplete: () => {
        this.loadingComplete.emit();
      },
    });

    // Slide up animation
    tl.to('.loader-container', {
      yPercent: -100,
      duration: 1,
      ease: 'power3.inOut',
    });

    tl.to('.loader-container', {
      display: 'none',
    });
  }
}
