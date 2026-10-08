import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';

// 2. Tipos desde @fullcalendar/core
import { CalendarOptions } from '@fullcalendar/core';

// 3. Plugins e Idioma (Sintaxis Estándar v6)
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';


@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar {
calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    editable: true,
    selectable: true,
    
    // Eventos de prueba
    events: [
      { title: 'Evento 1', date: '2026-10-10' },
      { title: 'Evento 2', date: '2026-10-15' }
    ],

    // Manejadores de eventos del usuario
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this)
  };

  handleDateClick(arg: any) {
    alert('Clic en la fecha: ' + arg.dateStr);
  }

  handleEventClick(arg: any) {
    alert('Evento seleccionado: ' + arg.event.title);
  }
}
