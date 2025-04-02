import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-missionfilter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './missionfilter.component.html',
  styleUrl: './missionfilter.component.css'
})
export class MissionfilterComponent {
  @Input() launchYears: string[] = [];
  @Output() yearSelected = new EventEmitter<string>();
  
  selectedYear: string = '';

  filterByYear(): void {
    this.yearSelected.emit(this.selectedYear);
  }

  clearFilter(): void {
    this.selectedYear = '';
    this.yearSelected.emit('');
  }
}
