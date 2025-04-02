import { Routes } from '@angular/router';
import { MissionlistComponent } from './components/missionlist/missionlist.component';
import { MissiondetailsComponent } from './components/missiondetails/missiondetails.component';

export const routes: Routes = [
  { path: 'missions', component: MissionlistComponent },
  { path: 'missiondetails/:flightNumber', component: MissiondetailsComponent },
  { path: '',   redirectTo: '/missions', pathMatch: 'full' } // Redirect to missions list
];
