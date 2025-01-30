import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import React from 'react';

export default function CalendarComponent({ events, onDateClick }) {
  return (
    <div className="container p-6 mx-auto">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={onDateClick}
        events={events}
        height="auto"
      />
    </div>
  );
}
