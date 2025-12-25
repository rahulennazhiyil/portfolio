import { Component, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from './components/navbar/navbar';
import { HeaderComponent } from './components/header/header.component';
import { ProfileSummaryComponent } from './components/profile-summary/profile-summary.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FooterComponent } from './components/footer/footer.component';
import { GsapAnimationsService } from './services/gsap-animations.service';
import { SmoothScrollService } from './services/smooth-scroll.service';
import { CursorService } from './services/cursor.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    NavbarComponent,
    HeaderComponent,
    ProfileSummaryComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    CertificatesComponent,
    ContactComponent,
    LoaderComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'Rahul E - Portfolio';
  isLoading = true;

  constructor(
    private gsapService: GsapAnimationsService,
    private smoothScrollService: SmoothScrollService,
    private cursorService: CursorService
  ) {}

  ngAfterViewInit() {
    // Initialize custom cursor
    this.cursorService.init();

    // Initialize smooth scroll
    this.smoothScrollService.init();

    // Initialize all GSAP animations
    setTimeout(() => {
      this.gsapService.initAllAnimations();
      this.gsapService.animateParallax();
      this.gsapService.animateImageReveal();
      this.gsapService.animateTextReveal();
      this.gsapService.animateScrollProgress();
    }, 100);
  }

  ngOnDestroy() {
    this.smoothScrollService.destroy();
    this.cursorService.destroy();
  }

  onLoadingComplete() {
    this.isLoading = false;
  }
}
