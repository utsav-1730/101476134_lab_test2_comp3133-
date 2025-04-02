import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Import ActivatedRoute, Router, RouterModule
import { SpaceXDataService } from '../../services/space-xdata.service';
import { Mission } from '../../models/mission.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list'; // For links list
import { MatIconModule } from '@angular/material/icon'; // For back button icon
import { MatToolbarModule } from '@angular/material/toolbar'; // For header

@Component({
  selector: 'app-missiondetails',
  standalone: true, // Make it standalone
  imports: [
    CommonModule,
    RouterModule, // Add RouterModule
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule
  ],
  templateUrl: './missiondetails.component.html',
  styleUrl: './missiondetails.component.css'
})
export class MissiondetailsComponent implements OnInit {
  mission: Mission | null = null;
  isLoading: boolean = true;
  error: string | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private spaceXService = inject(SpaceXDataService);

  ngOnInit(): void {
    const flightNumber = this.route.snapshot.paramMap.get('flightNumber');
    if (flightNumber) {
      this.loadMissionDetails(flightNumber);
    } else {
      this.error = 'Flight number not provided in the route.';
      this.isLoading = false;
      console.error('Flight number missing from route parameters.');
      // Optionally navigate back or show a more prominent error
      // this.router.navigate(['/']);
    }
  }

  loadMissionDetails(flightNumber: string): void {
    this.isLoading = true;
    this.error = null;
    this.spaceXService.getMissionDetails(flightNumber).subscribe({
      next: (data) => {
        this.mission = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(`Error fetching details for flight ${flightNumber}:`, err);
        this.error = `Failed to load details for flight #${flightNumber}. Please try again later.`;
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/missions']); // Navigate back to the list view route
  }
}
