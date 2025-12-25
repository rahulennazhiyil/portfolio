import {
  Component,
  OnInit,
  OnDestroy,
  inject,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThreeSceneService } from '../../services/three-scene.service';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('threeCanvas', { static: false }) threeCanvas!: ElementRef<HTMLDivElement>;

  private viewportScroller = inject(ViewportScroller);
  private threeSceneService = inject(ThreeSceneService);

  roles: string[] = ['Frontend Developer', 'Angular Expert', 'Tech Enthusiast', 'Problem Solver'];

  currentRoleIndex = 0;
  displayText = '';
  isAnimating = true;
  private animationTimeout?: ReturnType<typeof setTimeout>;

  ngOnInit() {
    // Set initial text immediately
    this.displayText = this.roles[0];
    this.isAnimating = true;
    this.startCycle();
  }

  ngAfterViewInit() {
    // Initialize Three.js scene after view is ready
    if (this.threeCanvas) {
      this.threeSceneService.initScene(this.threeCanvas);
    }
  }

  ngOnDestroy() {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
    this.threeSceneService.destroy();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.threeCanvas) {
      this.threeSceneService.onMouseMove(event, this.threeCanvas);
    }
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollY = window.pageYOffset;
    this.threeSceneService.onScroll(scrollY);
  }

  startCycle() {
    // Hold current text for 3 seconds
    this.animationTimeout = setTimeout(() => {
      this.transitionToNext();
    }, 3000);
  }

  transitionToNext() {
    // Start exit animation
    this.isAnimating = false;

    // After exit animation, switch text and start entrance animation
    this.animationTimeout = setTimeout(() => {
      this.currentRoleIndex = (this.currentRoleIndex + 1) % this.roles.length;
      this.displayText = this.roles[this.currentRoleIndex];

      // Small delay before starting entrance animation
      this.animationTimeout = setTimeout(() => {
        this.isAnimating = true;
        // Then start the cycle again
        this.startCycle();
      }, 50);
    }, 400);
  }

  scrollToContact(): void {
    this.viewportScroller.scrollToAnchor('contact');
  }
}
