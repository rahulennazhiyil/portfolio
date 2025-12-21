import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TiltDirective } from '../../directives/tilt.directive';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, MatCardModule, MatChipsModule, TiltDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  coreFrontend = [
    'Angular (v14–v18)',
    'React',
    'JavaScript (ES6+)',
    'RxJS',
    'HTML5',
    'SCSS',
    'Bootstrap',
    'Angular Material',
    'PrimeNG',
  ];

  devOpsTools = ['Git', 'Azure DevOps', 'Docker', 'Kubernetes (basic)', 'REST APIs'];

  collaboration = ['Agile methodologies', 'Mentoring juniors'];

  softSkills = [
    'Team leadership',
    'Problem solving',
    'Agile collaboration',
    'Cross-functional communication',
  ];
}
