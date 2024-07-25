document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('reminder-form');
  const input = document.getElementById('reminder-input');
  const list = document.getElementById('reminder-list');

  // Load reminders from local storage if available
  let reminders = JSON.parse(localStorage.getItem('reminders')) || [];

  // Function to render reminders
  function renderReminders() {
    list.innerHTML = '';

    reminders.forEach(function(reminder, index) {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = reminder.text;

      const deleteBtn = document.createElement('span');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = '❌';
      deleteBtn.addEventListener('click', function() {
        reminders.splice(index, 1);
        localStorage.setItem('reminders', JSON.stringify(reminders));
        renderReminders();
      });

      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }

  // Event listener for form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const text = input.value.trim();
    if (text) {
      reminders.push({ text });
      localStorage.setItem('reminders', JSON.stringify(reminders));
      renderReminders();
      input.value = '';
    } else {
      alert('Please enter a reminder.');
    }
  });

  // Initial render of reminders
  renderReminders();
});
