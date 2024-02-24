import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tickets } from '../model/tickets';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:9090';
  private isLoggedIn: boolean = false;

  // Method to check if the user is logged in
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  constructor(private httpService: HttpClient) {}

  createTicket(ticket: Tickets) {
    return this.httpService.post<Tickets>(
      `${this.baseUrl}/fault-ticket/tickets`,
      ticket
    );
  }

  viewTickets() {
    return this.httpService.get<Tickets[]>(
      `${this.baseUrl}/fault-ticket/tickets/`
    );
  }

  viewFilteredTickets(
    type: string,
    status: string,
    startDate: string,
    endDate: string
  ): Observable<Tickets[]> {
    let params = new HttpParams();

    // Add filters to the params object if they are provided
    if (type) {
      params = params.append('type', type);
    }
    if (status) {
      params = params.append('status', status);
    }
    if (startDate && endDate) {
      params = params.append('startDate', startDate);
      params = params.append('endDate', endDate);
    }

    return this.httpService.get<Tickets[]>(
      `${this.baseUrl}/fault-ticket/tickets`,
      {
        params,
      }
    );
  }

  deleteTicket(ticketId: String) {
    return this.httpService.delete(
      `${this.baseUrl}/fault-ticket/tickets/${ticketId}`
    );
  }

  // login(username: string, password: string): Observable<any> {
  //   const loginData = { username, password };
  //   return this.httpService.post<any>(`${this.baseUrl}/login`, loginData);
  // }

  login(user: User): Observable<object> {
    console.log(user);
    this.isLoggedIn = true;
    return this.httpService.post(`${this.baseUrl}/login`, user);
  }
}
