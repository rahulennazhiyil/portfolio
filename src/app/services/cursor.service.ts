import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CursorService {
  private cursor: HTMLElement | null = null;
  private cursorDot: HTMLElement | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private cursorX = 0;
  private cursorY = 0;
  private dotX = 0;
  private dotY = 0;
  private isHovering = false;

  init() {
    // Create cursor elements
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);

    this.cursorDot = document.createElement('div');
    this.cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(this.cursorDot);

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    // Add hover effects to interactive elements
    this.addHoverListeners();

    // Start animation loop
    this.animate();

    console.log('✅ Custom cursor initialized');
  }

  private animate = () => {
    // Smooth follow for main cursor
    this.cursorX += (this.mouseX - this.cursorX) * 0.15;
    this.cursorY += (this.mouseY - this.cursorY) * 0.15;

    // Faster follow for dot
    this.dotX += (this.mouseX - this.dotX) * 0.25;
    this.dotY += (this.mouseY - this.dotY) * 0.25;

    if (this.cursor) {
      this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px) scale(${
        this.isHovering ? 1.5 : 1
      })`;
    }

    if (this.cursorDot) {
      this.cursorDot.style.transform = `translate(${this.dotX}px, ${this.dotY}px)`;
    }

    requestAnimationFrame(this.animate);
  };

  private addHoverListeners() {
    const interactiveElements = 'a, button, input, textarea, [role="button"], .magnetic';

    document.addEventListener('mouseover', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(interactiveElements)) {
        this.isHovering = true;
        this.cursor?.classList.add('hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(interactiveElements)) {
        this.isHovering = false;
        this.cursor?.classList.remove('hovering');
      }
    });
  }

  destroy() {
    this.cursor?.remove();
    this.cursorDot?.remove();
    console.log('🛑 Custom cursor destroyed');
  }
}
