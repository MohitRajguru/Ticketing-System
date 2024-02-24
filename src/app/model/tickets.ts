export class Tickets {
  constructor(
    public ticketId: string = '',
    public createdBy: string = '',
    public createdOn: string = '',
    public description: string = '',
    public type: string = '',
    public status: string = ''
  ) {}
}
