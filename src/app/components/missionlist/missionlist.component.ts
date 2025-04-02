import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SpaceXDataService } from '../../services/space-xdata.service';
import { Mission } from '../../models/mission.model';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MissionfilterComponent } from '../missionfilter/missionfilter.component';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-missionlist',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatToolbarModule,
    MissionfilterComponent,
    TruncatePipe
  ],
  templateUrl: './missionlist.component.html',
  styleUrl: './missionlist.component.css'
})
export class MissionlistComponent implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];
  launchYears: string[] = [];
  selectedYear: string = '';
  isLoading: boolean = true;
  error: string | null = null;

  private spaceXService = inject(SpaceXDataService);
  private router = inject(Router);

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions(): void {
    this.isLoading = true;
    this.error = null;
    this.spaceXService.getLaunches().subscribe({
      next: (data) => {
        this.missions = data;
        this.filteredMissions = data; // Initially show all
        this.extractLaunchYears(data);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching missions:', err);
        this.error = 'Failed to load missions. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  extractLaunchYears(missions: Mission[]): void {
    const years = new Set(missions.map(m => m.launch_year));
    this.launchYears = Array.from(years).sort((a, b) => parseInt(b) - parseInt(a)); // Sort descending
  }

  onYearSelected(year: string): void {
    this.selectedYear = year;
    this.isLoading = true;
    this.error = null;
    
    if (!this.selectedYear) {
      this.filteredMissions = this.missions; // Show all if no year selected
      this.isLoading = false;
      return;
    }

    // Note: The API supports filtering by year directly.
    // Calling the specific service method is more efficient than client-side filtering.
    this.spaceXService.getLaunchesByYear(this.selectedYear).subscribe({
      next: (data) => {
        this.filteredMissions = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(`Error fetching missions for year ${this.selectedYear}:`, err);
        this.error = `Failed to load missions for year ${this.selectedYear}.`;
        this.isLoading = false;
      }
    });
  }

  viewDetails(flightNumber: number): void {
    this.router.navigate(['/missiondetails', flightNumber]);
  }
}
