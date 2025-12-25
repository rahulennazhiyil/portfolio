import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SmoothScrollService } from '../../services/smooth-scroll.service';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  angularVersion = '19';
  showBackToTop = false;

  constructor(private smoothScrollService: SmoothScrollService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.pageYOffset > 500;
  }

  scrollToTop() {
    this.smoothScrollService.scrollTo(0, { duration: 1.5 });
  }
}
