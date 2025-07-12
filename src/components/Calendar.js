import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  const handleEventCreation = (eventDetails) => {
    console.log('Creating event:', eventDetails);
    // Example: Add event to state
    setEvents([...events, eventDetails]);
  };

  return (
    <div role="main" aria-labelledby="calendar-section" className="p-4 border rounded">
      <h1 id="calendar-section" className="text-2xl font-bold mb-4">Event Calendar</h1>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />

      <button
        onClick={() => handleEventCreation({ title: 'New Event', date: '2025-07-15' })}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
      >
        Add Event
      </button>
    </div>
  );
};

export default Calendar;
