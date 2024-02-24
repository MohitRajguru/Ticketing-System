import { Component, OnInit } from '@angular/core';
import { Tickets } from 'src/app/model/tickets';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.css'],
})
export class CreateTicketComponent {
  ticket = new Tickets();

  constructor(private apiService: ApiService) {}

  submitForm(event: SubmitEvent) {
    event.preventDefault();
    console.log(event);
    console.log(this.ticket);
    this.apiService.createTicket(this.ticket).subscribe({
      next: (data) => {
        console.log(data);
        alert('Ticket Created');
        this.ticket = new Tickets();
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('request completed');
      },
    });
  }
}
