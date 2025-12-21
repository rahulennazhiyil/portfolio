import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TiltDirective } from '../../directives/tilt.directive';

interface Experience {
  title: string;
  company: string;
  duration: string;
  location: string;
  responsibilities: string[];
}

@Component({
  selector: 'app-experience',
  imports: [CommonModule, MatCardModule, TiltDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  experiences: Experience[] = [
    {
      title: 'Engineer – Software Development',
      company: 'Finch Innovate',
      duration: 'Nov 2024 – Present',
      location: 'Kochi, India',
      responsibilities: [
        'Designed and implemented compliance dashboards in FinchCOMPLY for enterprise clients, enabling automation of risk & regulatory workflows.',
        'Enhanced AML portal FinchSCAN with real-time REST API integrations and interactive visualizations, improving detection accuracy and cutting manual review time by 40%.',
        'Collaborated with international client teams & UX designers to deliver tailored UI enhancements, improving client satisfaction by 20%.',
        'Strengthened CI/CD pipelines with Azure DevOps and explored Docker-based deployments for scalable cloud rollouts.',
        'Participated in UI testing and validation using Jasmine, Karma.',
      ],
    },
    {
      title: 'Junior Engineer Software Development',
      company: 'Finch Innovate',
      duration: 'Nov 2022 – Nov 2024',
      location: 'Kochi, India',
      responsibilities: [
        'Migrated enterprise fintech applications from Angular 14 → 15, ensuring stability and scalability.',
        'Delivered responsive UI with PrimeNG + Angular Material for cross-device compatibility.',
        'Developed visual reporting modules with Chart.js to support compliance analytics.',
        'Contributed to Agile sprint planning and international delivery cycles.',
      ],
    },
  ];
}
