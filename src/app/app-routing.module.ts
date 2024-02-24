import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CreateTicketComponent } from './pages/create-ticket/create-ticket.component';
import { ViewTicketsComponent } from './pages/view-tickets/view-tickets.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login - Fault Ticket Service',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login - Fault Ticket Service',
  },
  {
    path: 'create-ticket',
    component: CreateTicketComponent,
    title: 'Create Ticket - Fault Ticket Service',
    canActivate: [AuthGuard],
  },
  {
    path: 'view-tickets',
    component: ViewTicketsComponent,
    title: 'View Tickets - Fault Ticket Service',
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: 'update-ticket/:ticketId',
  //   component: UpdateTicketComponent,
  //   title: 'Update - Fault Ticket Service',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
