import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tickets } from 'src/app/model/tickets';
import { ApiService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.css'],
})
export class ViewTicketsComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 10;

  isAdminLoggedIn = new BehaviorSubject<boolean>(false);

  selectedTickets: Tickets[] = [];

  tickets: Tickets[] = [];
  @Input() ticket: Tickets = new Tickets();
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.viewTickets().subscribe({
      next: (data) => {
        console.log(data);
        this.tickets = data;
      },
      error: (error) => {},
      complete: () => {},
    });
    this.isAdminLoggedIn.next(true);
  }

  deleteTicket(ticketId: string) {
    if (confirm('Delete Ticket with ID: ' + ticketId)) {
      this.apiService.deleteTicket(ticketId).subscribe({
        next: (data) => {
          this.deleteEvent.next(ticketId);
          alert('ticket deleted');
        },
        error: (error) => {
          console.log(error);

          alert('ticket deleted');
          window.location.reload();
        },
      });
    }
  }

  deleteEventFromChild(ticketId: string) {
    this.tickets = this.tickets.filter((ticket) => ticket.ticketId != ticketId);
  }

  toggleCheckbox(ticket: Tickets): void {
    if (this.isSelected(ticket)) {
      this.selectedTickets = this.selectedTickets.filter(
        (t) => t.ticketId !== ticket.ticketId
      );
    } else {
      this.selectedTickets.push(ticket);
    }
  }

  isSelected(ticket: Tickets): boolean {
    return this.selectedTickets.includes(ticket);
  }
}
