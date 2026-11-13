import { Component, inject, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';

// 2. Tipos desde @fullcalendar/core
import { CalendarOptions } from '@fullcalendar/core';

// 3. Plugins e Idioma (Sintaxis Estándar v6)
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { IEvent } from '../services/interfaces';
import { states } from '../services/states';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/api';

@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule, FormsModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  private eventsService = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  showForm = false;
  errorMessage = '';
  states = states;
  selectedDate = '';
  eventData: IEvent = {
    title: '',
    description: '',
    startAt: new Date(),
    endAt: new Date(),
    state: states[0],
  };
  startAtHour = '';
  endAtHour = '';

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek',
    },
    editable: true,
    selectable: true,

    dateClick: (info) => {
      console.log('Fecha seleccionada:', info.dateStr);
      this.selectedDate = info.dateStr;
      this.showForm = true;
      this.cdr.detectChanges();
    },
  };

  ngOnInit(): void {
    this.eventsService.getAllActivities().subscribe({
      next: (activities) => {
        const calendarEvents = activities.map((activity) => ({
          id: String((activity as IEvent & { id?: string }).id ?? ''),
          title: activity.title,
          start: activity.startAt,
          end: activity.endAt,
          extendedProps: {
            description: activity.description,
            state: activity.state,
          },
        }));

        this.calendarOptions = {
          ...this.calendarOptions,
          events: calendarEvents,
        };
      },
      error: (err) => {
        console.error('Error loading activities:', err);
      },
    });
  }

  saveEvent(): void {
    this.errorMessage = '';

    const startAt = new Date(`${this.selectedDate}T${this.startAtHour}`);

    const endAt = new Date(`${this.selectedDate}T${this.endAtHour}`);

    if (!this.eventData.title.trim() || !this.eventData.description.trim()) {
      this.errorMessage = 'Completa el título y la descripción.';
      return;
    }

    if (
      !this.startAtHour ||
      !this.endAtHour ||
      Number.isNaN(startAt.getTime()) ||
      Number.isNaN(endAt.getTime())
    ) {
      this.errorMessage = 'Indica una hora de inicio y de fin válidas.';
      return;
    }

    if (endAt <= startAt) {
      this.errorMessage = 'La hora de fin debe ser posterior a la de inicio.';
      return;
    }

    const newEvent: IEvent = { ...this.eventData, startAt, endAt };

    this.eventsService.createEvent(newEvent).subscribe({
      next: (createdEvent) => {
        this.calendarComponent.getApi().addEvent({
          id: String((createdEvent as IEvent & { id?: string }).id ?? ''),
          title: createdEvent.title || newEvent.title,
          start: createdEvent.startAt || newEvent.startAt,
          end: createdEvent.endAt || newEvent.endAt,
          extendedProps: {
            description: createdEvent.description,
            state: createdEvent.state,
          },
        });
      },
      error: (err) => {
        console.error('Error saving activity:', err);
        this.errorMessage =
          'No se pudo guardar el evento. Revisa la conexión e inténtalo de nuevo.';
      },
    });
  }
}
