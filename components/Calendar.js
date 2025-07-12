import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useTranslation } from 'react-i18next';
import { saveEventToSolidPod } from '../modules/calendar';

const Calendar = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from SolidOS pod
    async function fetchEvents() {
      const fetchedEvents = await fetch('/solid-pod/events');
      const eventsData = await fetchedEvents.json();
      setEvents(eventsData);
    }
    fetchEvents();
  }, []);

  const handleDateClick = (info) => {
    const title = prompt(t('Enter event title:'));
    if (title) {
      const newEvent = {
        title,
        start: info.dateStr,
      };
      setEvents([...events, newEvent]);
      saveEventToSolidPod(newEvent);
    }
  };

  return (
    <div aria-label={t('Calendar')}>
      <h1>{t('Event Calendar')}</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
    </div>
  );
};

export default Calendar;
