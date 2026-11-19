import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IEvent, IList } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly http = inject(HttpClient);

  private readonly ACTIVITY_URL = `${environment.apiUrl}/activities`;
  private readonly LIST_URL = `${environment.apiUrl}/lists`;

  getAllActivities(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.ACTIVITY_URL);
  }

  getOneActivity(eventId: string): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.ACTIVITY_URL}/${eventId}`);
  }

  createEvent(event: IEvent): Observable<IEvent> {
    return this.http.post<IEvent>(this.ACTIVITY_URL, event);
  }

  deleteEvent(eventId: string): Observable<string> {
    return this.http.delete<string>(`${this.ACTIVITY_URL}/${eventId}`);
  }

  getAllLists(): Observable<IList[]> {
    return this.http.get<IList[]>(this.LIST_URL);
  }

  getOneList(listId: string): Observable<IList> {
    return this.http.get<IList>(`${this.LIST_URL}/${listId}`);
  }

  createList(list: IList): Observable<IList> {
    return this.http.post<IList>(this.LIST_URL, list);
  }

  deleteList(listId: string): Observable<string> {
    return this.http.delete<string>(`${this.LIST_URL}/${listId}`);
  }
}
