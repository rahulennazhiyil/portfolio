import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Certificate {
  title: string;
  description: string;
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
    },
  ];
}
