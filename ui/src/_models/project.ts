import { Moment } from "jalali-moment";

export class Project {
  Id?: string | null;
  Title: string;
  Description: string;
  StartDate?: Moment;
  EndDate?: Moment;
  constructor() {
    this.Description = "";
    this.Title = "";
  }
}