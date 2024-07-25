const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function showNotes() {
    const notes = JSON.parse(localStorage.getItem("notes"));
    if (notes) {
        notes.forEach(noteData => {
            createNoteElement(noteData.title, noteData.content);
        });
    }
}

function updateStorage() {
    const notes = [];
    const noteElements = document.querySelectorAll(".note");
    noteElements.forEach(noteElement => {
        const title = noteElement.querySelector(".note-title").value;
        const content = noteElement.querySelector(".input-box").innerHTML;
        notes.push({ title, content });
    });
    localStorage.setItem("notes", JSON.stringify(notes));
}

function createNoteElement(title = "", content = "") {
    let note = document.createElement("div");
    let titleInput = document.createElement("input");
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    let minimizeBtn = document.createElement("button");

    note.className = "note";
    titleInput.className = "note-title";
    titleInput.placeholder = "Title...";
    titleInput.value = title; // Set the title value
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.innerHTML = content; // Set the content value

    img.src = "journal/delete.jpg";
    img.style.width = "25px"; // Set width directly
    img.style.height = "25px"; // Set height directly

    minimizeBtn.textContent = "-";
    minimizeBtn.className = "minimize-btn";
    minimizeBtn.addEventListener("click", () => {
        if (inputBox.style.display === "none") {
            inputBox.style.display = "block";
            img.style.display = "block";
            minimizeBtn.textContent = "-";
        } else {
            inputBox.style.display = "none";
            img.style.display = "none";
            minimizeBtn.textContent = "+";
        }
    });

    note.appendChild(titleInput);
    note.appendChild(inputBox);
    note.appendChild(img);
    note.appendChild(minimizeBtn);
    notesContainer.appendChild(note);
}

createBtn.addEventListener("click", () => {
    createNoteElement();
    updateStorage();
});

notesContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    } else if (e.target.tagName === "P") {
        const notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function() {
                updateStorage();
            };
        });
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

// Initial load
showNotes();
