import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IEvent } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly http = inject(HttpClient)

  API_URL = `${environment.apiUrl}/activities`
  getAllActivities(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.API_URL)
  }
  
  createEvent(event: IEvent): Observable<IEvent> {
    return this.http.post<IEvent>(this.API_URL, event)
  }
}
