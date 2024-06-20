export class Project {
  Id?: string | null;
  Title: string;
  Description: string;
  StartDate?: Date;
  EndDate?: Date;
  constructor() {
    this.Description = "";
    this.Title = "";
  }
}