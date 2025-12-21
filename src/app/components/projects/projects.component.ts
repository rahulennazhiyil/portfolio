import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TiltDirective } from '../../directives/tilt.directive';

interface Project {
  title: string;
  description: string;
  domain: string;
  techStack: string[];
  highlights: string[];
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule, MatCardModule, MatIconModule, MatChipsModule, TiltDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'FinchSCAN – AML Name-Screening Web Portal',
      description:
        'A SaaS-based compliance and AML (Anti-Money Laundering) portal enabling financial institutions to screen high-risk individuals and entities.',
      domain: 'FinTech Domain',
      techStack: ['Angular 14–15', 'RxJS', 'Angular Material', 'Chart.js', 'Azure DevOps'],
      highlights: [
        'Developed the front-end interface for name screening and goAML reporting modules using Angular and Angular Material.',
        'Integrated RESTful APIs for real-time search, alerts, and report generation, ensuring smooth user interaction and data flow.',
        'Implemented dynamic charts and data visualizations using Chart.js to present screening results and trends.',
        'Ensured cross-browser compatibility and responsive UI design to support multiple device formats.',
        'Contributed to CI/CD workflow enhancements through Azure DevOps and Git for faster, version-controlled front-end deployment cycles.',
      ],
    },
    {
      title: 'FinchCOMPLY – Compliance Management System',
      description:
        'A SaaS-based compliance automation platform built for enterprise clients to manage regulatory workflows.',
      domain: 'Enterprise Compliance',
      techStack: ['Angular 15-18', 'SCSS', 'PrimeNG', 'Bootstrap', 'Azure DevOps'],
      highlights: [
        'Developed UI components for modules such as risk assessments, compliance reporting, and regulatory updates.',
        'Collaborated with cross-functional teams to deliver client-specific UI enhancements.',
        'Integrated RESTful APIs for real-time data population and compliance status tracking.',
        'Focused on responsive design and UI consistency across browsers and devices.',
      ],
    },
  ];
}
