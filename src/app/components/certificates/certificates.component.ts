import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Certificate {
  title: string;
  description: string;
  link?: string;
}

@Component({
  selector: 'app-certificates',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss',
})
export class CertificatesComponent {
  certificates: Certificate[] = [
    {
      title: 'Angular Deep Dive - Beginner to Advanced (Angular 19)',
      description:
        'Covered Angular fundamentals to advanced concepts including components, services, routing, RxJS, and deployment.',
      link: 'https://www.udemy.com/certificate/UC-b154bac2-b4d2-4df8-876b-cd456c4ca5d7/',
    },
    {
      title: 'HackerRank - Angular (intermediate)',
      description:
        'Validated JavaScript problem-solving skills including ES6+, functions, closures, array methods, and async programming.',
    },
    {
      title: 'MEAN/MEARN FULL STACK',
      description:
        'Covered end-to-end development using MongoDB, Express.js, Angular, React, and Node.js with real-world project implementation.',
    },
    {
      title: 'Prompt Engineering & Programming with OpenAI (2025)',
      description:
        'Utilized advanced prompt engineering techniques with ChatGPT, similar to GitHub Copilot, to develop practical AI applications and prototypes.',
      link: 'https://badges.plus.columbia.edu/da0875a6-67fd-423f-ae57-3fb9adb65f37#acc.AfKOWQoz',
    },
  ];
}
