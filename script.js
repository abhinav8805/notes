// === ELEMENT REFERENCES ===
const notesContainer = document.getElementById('notes-container');
const noteInput = document.getElementById('note-input');
const quoteElement = document.getElementById('quote');
const audio = document.getElementById('note-sound');
const themeToggle = document.getElementById('theme-toggle');
const background = document.getElementById('background');


// === MOTIVATIONAL QUOTES ===
const quotes = [
  "Believe in yourself and all that you are.",
  "Progress, not perfection.",
  "You are stronger than you think.",
  "Every day is a second chance.",
  "Small steps every day lead to big results.",
  "Don't watch the clock; do what it does: keep going.",
  "Push yourself, because no one else is going to do it for you."
];

function setMotivationalQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  quoteElement.textContent = quotes[index];
}

setMotivationalQuote();
setInterval(setMotivationalQuote, 30 * 60 * 1000); // every 30 minutes


// === NOTES ===
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notesContainer.innerHTML = '';

  notes.forEach((note, index) => {
    const noteDiv = createNoteElement(note, index);
    notesContainer.appendChild(noteDiv);
  });
}

function createNoteElement(text, index) {
  const noteDiv = document.createElement('div');
  noteDiv.className = 'note';
  noteDiv.textContent = text;
  noteDiv.contentEditable = true;

  noteDiv.addEventListener('input', () => updateNote(index, noteDiv.textContent));

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => deleteNote(index);

  noteDiv.appendChild(deleteBtn);
  return noteDiv;
}

function addNote(text) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push(text);
  localStorage.setItem('notes', JSON.stringify(notes));
  loadNotes();
}

function deleteNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  loadNotes();
}

function updateNote(index, newText) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes[index] = newText;
  localStorage.setItem('notes', JSON.stringify(notes));
}


// === EVENT: ENTER KEY TO ADD NOTE ===
noteInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    const text = noteInput.value.trim();
    if (text !== '') {
      addNote(text);
      noteInput.value = '';

      // Play sound
      audio.currentTime = 0;
      audio.play();
    }
  }
});


// === DARK MODE TOGGLE ===
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Load theme on page load
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggle.textContent = '☀️ Light Mode';
  } else {
    themeToggle.textContent = '🌙 Dark Mode';
  }
});


// === FALLING OBJECTS (LEAVES + STARS) ===
const images = ['star.png', 'leaf.jpg'];


function createFallingObject() {
  const img = document.createElement('div');
  img.classList.add('falling-object');
  img.style.left = Math.random() * 100 + 'vw';
  img.style.animationDuration = (5 + Math.random() * 5) + 's';
  img.style.backgroundImage = `url(${images[Math.floor(Math.random() * images.length)]})`;
  background.appendChild(img);
  setTimeout(() => img.remove(), 10000);
}

setInterval(createFallingObject, 500);


// === INITIAL LOAD ===
window.onload = loadNotes;
