document.addEventListener('DOMContentLoaded', function() {
  const calendarContainer = document.getElementById('calendar');
  const modal = document.getElementById('modal');
  const closeModal = document.querySelector('.close');
  const saveButton = document.getElementById('save-event');
  const eventNameInput = document.getElementById('event-name');
  const eventDateInput = document.getElementById('event-date');
  const monthTitle = document.createElement('h2'); // Create month title element
  const calendarEventList = document.getElementById('calendar-event-list'); // New container for calendar events

  // Mock data storage (in reality, you would use a database or API)
  let events = JSON.parse(localStorage.getItem('events')) || [];

  // Function to render calendar
  function renderCalendar() {
    if (calendarContainer) {
      calendarContainer.innerHTML = ''; // Clear the calendar

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.toLocaleString('default', { month: 'long' }); // Get current month name

      monthTitle.textContent = `${month} ${year}`; // Set month title
      calendarContainer.appendChild(monthTitle); // Append month title to calendar container

      const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();

      for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;
        dayElement.classList.add('day');

        const eventForDay = events.find(event => {
          const eventDate = new Date(event.date);
          return eventDate.getDate() === i &&
                 eventDate.getMonth() === currentDate.getMonth() &&
                 eventDate.getFullYear() === currentDate.getFullYear();
        });

        if (eventForDay) {
          dayElement.classList.add('has-event');
        }

        dayElement.addEventListener('click', function() {
          showModal(i);
        });

        calendarContainer.appendChild(dayElement);
      }
    }
  }

  function renderCalendarEvents() {
    if (calendarEventList) {
      calendarEventList.innerHTML = ''; // Clear the event list

      events.forEach(event => {
        const eventItem = document.createElement('li');
        eventItem.textContent = `${event.name} - ${new Date(event.date).toLocaleDateString()}`;
        eventItem.classList.add('list-group-item');
        calendarEventList.appendChild(eventItem);
      });
    }
  }

  function showModal(day) {
    modal.style.display = 'block';
    eventDateInput.value = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${day}`;
  }

  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  saveButton.addEventListener('click', function() {
    const eventName = eventNameInput.value.trim();
    const eventDate = eventDateInput.value;

    if (eventName && eventDate) {
      events.push({ name: eventName, date: eventDate });
      localStorage.setItem('events', JSON.stringify(events)); // Save events to local storage
      renderCalendar();
      renderCalendarEvents(); // Render events in the new container
      modal.style.display = 'none';
      eventNameInput.value = '';
      eventDateInput.value = '';
    } else {
      alert('Please fill out all fields');
    }
  });

  renderCalendar(); // Initial render of the calendar
  renderCalendarEvents(); // Initial render of the events
});
