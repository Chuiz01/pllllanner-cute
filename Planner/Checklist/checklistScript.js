// Accessing elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById("add-Button");
const newChecklistButton = document.getElementById("new-checklist");

// Add task functionality
addButton.addEventListener("click", addTask);

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

// Event delegation for list items
listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

// Create new checklist functionality
newChecklistButton.addEventListener('click', () => createNewChecklist());

function createNewChecklist(savedData = null) {
    const mainContainer = document.getElementById('check');
    const checklistDiv = document.createElement('div');
    checklistDiv.className = 'checklist';

    const checklistHeader = document.createElement('h2');
    checklistHeader.innerText = 'To-Do List';
    checklistDiv.appendChild(checklistHeader);

    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';

    const newInputBox = document.createElement('input');
    newInputBox.type = 'text';
    newInputBox.placeholder = 'Add your text';
    rowDiv.appendChild(newInputBox);

    const newAddButton = document.createElement('button');
    newAddButton.innerText = 'Add';
    rowDiv.appendChild(newAddButton);

    checklistDiv.appendChild(rowDiv);

    const newListContainer = document.createElement('ul');
    const uniqueId = `list-container-${Date.now()}`;
    newListContainer.id = uniqueId;
    checklistDiv.appendChild(newListContainer);

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete Checklist';
    deleteButton.className = 'delete-checklist';
    checklistDiv.appendChild(deleteButton);

    mainContainer.appendChild(checklistDiv);

    newAddButton.addEventListener('click', () => addTaskToSpecificList(newInputBox, newListContainer));

    newListContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            e.target.classList.toggle('checked');
            saveData();
        } else if (e.target.tagName === 'SPAN') {
            e.target.parentElement.remove();
            saveData();
        }
    });

    deleteButton.addEventListener('click', () => {
        checklistDiv.remove();
        saveData();
    });

    if (savedData) {
        newListContainer.innerHTML = savedData;
    }

    saveData();
}

// Add event listener for delete button in the original checklist
document.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.querySelector('.delete-checklist');
    if (deleteButton) {
        deleteButton.addEventListener('click', () => {
            const checklist = deleteButton.closest('.checklist');
            if (checklist) {
                checklist.remove();
                saveData();
            }
        });
    }
});

function addTaskToSpecificList(inputBox, listContainer) {
    if (inputBox.value === '') {
        alert('You must write something!');
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

function saveData() {
    const mainContainer = document.getElementById('check');
    const checklists = mainContainer.getElementsByClassName('checklist');
    const data = [];
    for (let checklist of checklists) {
        const listContainer = checklist.querySelector('ul');
        data.push({
            id: listContainer.id,
            html: listContainer.innerHTML
        });
    }
    localStorage.setItem('checklists', JSON.stringify(data));
}

function showTasks() {
    const savedData = JSON.parse(localStorage.getItem('checklists'));
    if (savedData) {
        for (let checklistData of savedData) {
            createNewChecklist(checklistData.html);
        }
    } else {
        createNewChecklist(); // Create an initial checklist if none exist in local storage
    }
}

// Load tasks on page load
document.addEventListener('DOMContentLoaded', showTasks);