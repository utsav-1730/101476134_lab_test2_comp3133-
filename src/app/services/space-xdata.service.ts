import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from '../models/mission.model'; // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class SpaceXDataService {
  private apiUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) { }

  // Fetch all launches
  getLaunches(): Observable<Mission[]> {
    return this.http.get<Mission[]>(this.apiUrl);
  }

  // Fetch launches filtered by year
  getLaunchesByYear(year: string): Observable<Mission[]> {
    let params = new HttpParams();
    if (year) {
      params = params.set('launch_year', year);
    }
    return this.http.get<Mission[]>(this.apiUrl, { params });
  }

  // Fetch details for a specific mission by flight number
  getMissionDetails(flightNumber: string): Observable<Mission> {
    const detailsUrl = `${this.apiUrl}/${flightNumber}`;
    return this.http.get<Mission>(detailsUrl);
  }
}
