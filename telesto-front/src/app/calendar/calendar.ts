import { Component } from '@angular/core';
import { FullCalendarModule, CalendarOptions } from "@fullcalendar/angular";

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
    calendarOptions: CalendarOptions = {
    initialView: "dayGridMonth",
  }
}
