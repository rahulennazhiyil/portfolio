import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-education',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {}
