// Selecting DOM elements
const inputs = document.querySelectorAll('.header input');
const addBtn = document.querySelector('.header .add-bt');
const clearBtn = document.querySelector('.header .clear-bt');
const notesSection = document.querySelector('.notes');
 let counter = 0;
 // Event listener for clearing all notes and localStorage
clearBtn.addEventListener('click', () => {
  window.localStorage.clear();
  notesSection.innerHTML = '';
});
 // Function to delete a note
function deleteNote (e) {
  window.localStorage.removeItem(e.offsetParent.id);
  notesSection.removeChild(e.offsetParent);
  counter--;
}
 // Function to add a note
function addNote (titleEntered, descriptionEntered) {
  let title = titleEntered;
  let description = descriptionEntered;
   // Exit function if title and description are empty or null
  if (!title || !description) return;
   let note = document.createElement('div');
  note.className = 'note';
   let delBtn = document.createElement('button');
  let xLetter = document.createTextNode('X');
  delBtn.appendChild(xLetter);
  delBtn.addEventListener('click', () => deleteNote(delBtn));
  note.appendChild(delBtn);
   let textDiv = document.createElement('div');
  textDiv.className = 'text';
   let noteTitle = document.createElement('h1');
  noteTitle.textContent = title;
  textDiv.appendChild(noteTitle);
   let noteDescription = document.createElement('p');
  noteDescription.textContent = description;
  textDiv.appendChild(noteDescription);
   note.style.backgroundColor = `RGB(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  note.style.transform = `rotateZ(${Math.floor(Math.random() * 21) - 10}deg)`;
   note.setAttribute('id', counter);
  counter++;
  note.appendChild(textDiv);
   notesSection.prepend(note);
}
 // Function to add a note to localStorage
function addNoteToLocalStorage (title, description) {
  // Exit function if title and description are empty or null
  if (!title || !description) return;
   window.localStorage.setItem(window.localStorage.length, [title, description]);
  inputs.forEach(input => input.value = '');
}
 // Event listener for adding a note
addBtn.addEventListener('click', () => {
  addNote(
    document.querySelector('[data-title]').value,
    document.querySelector('[data-description]').value
  );
  addNoteToLocalStorage(
    document.querySelector('[data-title]').value,
    document.querySelector('[data-description]').value
  );
});
 // Function to reset input field
function resetInput (input) {
  input.value = '';
}
 // Event listeners for resetting input fields
inputs.forEach(input => {
  input.addEventListener('click', () => resetInput(input));
  input.addEventListener('keypress', () => resetInput(input));
});
 // Function to load notes from localStorage on page load
function loadNotes () {
  if (window.localStorage.length > 0) {
    for (let i = 0; i < window.localStorage.length; i++) {
      addNote(
        window.localStorage.getItem(i).split(',')[0],
        window.localStorage.getItem(i).split(',')[1]
      );
    }
  }
}
 window.addEventListener('load', loadNotes);