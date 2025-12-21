import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective {
  // Max tilt angle
  @Input() maxTilt = 15;
  // Perspective value (lower = more dramatic 3D effect)
  @Input() perspective = 1000;
  // Scale on hover
  @Input() scale = 1.05;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.1s ease-out');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const el = this.el.nativeElement;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center of element
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;

    // Calculate rotation
    const rotateY = (mouseX / (width / 2)) * this.maxTilt; // Rotate around Y axis based on X position
    const rotateX = -(mouseY / (height / 2)) * this.maxTilt; // Rotate around X axis based on Y position (inverted)

    this.renderer.setStyle(
      el,
      'transform',
      `perspective(${this.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${this.scale})`
    );
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.5s ease-out');
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
    );
  }
}
