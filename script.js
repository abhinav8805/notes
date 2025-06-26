const notesContainer = document.getElementById('notes-container');
const noteInput = document.getElementById('note-input');
const quoteElement = document.getElementById('quote');
const audio = document.getElementById('note-sound');
const themeToggle = document.getElementById('theme-toggle');
const background = document.getElementById('background');
const lofiToggle = document.getElementById('lofi-toggle');
const lofiAudio = document.getElementById('lofi-audio');
const wishPull = document.getElementById('wish-pull');
const wishPanel = document.getElementById('wish-panel');
const wishToggle = document.getElementById('wish-toggle');
const wishAudio = document.getElementById('wish-audio');
const appreciateBtn = document.getElementById('appreciate-btn');
const appreciateCount = document.getElementById('appreciation-count');

// === Notes Handling ===
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notesContainer.innerHTML = '';
  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.textContent = note;
    noteDiv.contentEditable = true;
    noteDiv.addEventListener('input', () => updateNote(index, noteDiv.textContent));
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => deleteNote(index);
    noteDiv.appendChild(deleteBtn);
    notesContainer.appendChild(noteDiv);
  });
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

function updateNote(index, text) {
  const notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes[index] = text;
  localStorage.setItem('notes', JSON.stringify(notes));
}

// === Add note with Enter ===
noteInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    const text = noteInput.value.trim();
    if (text !== '') {
      addNote(text);
      noteInput.value = '';
      audio.currentTime = 0;
      audio.play();
    }
  }
});

// === Dark Mode ===
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️ Light Mode';
}

// === Lofi Toggle ===
lofiToggle.addEventListener('click', () => {
  if (lofiAudio.paused) {
    lofiAudio.play();
    lofiToggle.classList.add('active');
    lofiToggle.textContent = '🔇 Stop Lofi';
  } else {
    lofiAudio.pause();
    lofiToggle.classList.remove('active');
    lofiToggle.textContent = '🎵 Lofi';
  }
});

// === Wish Tab Logic ===
wishPull.addEventListener('click', () => {
  wishPanel.style.display = wishPanel.style.display === 'flex' ? 'none' : 'flex';
});

wishToggle.addEventListener('change', () => {
  if (wishToggle.checked) {
    wishAudio.currentTime = 0;
    wishAudio.play();
  } else {
    wishAudio.pause();
  }
});

// === Appreciation Logic ===
if (!localStorage.getItem('hasAppreciated')) {
  localStorage.setItem('hasAppreciated', 'false');
}
if (!localStorage.getItem('appreciationCount')) {
  localStorage.setItem('appreciationCount', '0');
}
appreciateCount.textContent = localStorage.getItem('appreciationCount');

appreciateBtn.addEventListener('click', () => {
  if (localStorage.getItem('hasAppreciated') === 'false') {
    let count = parseInt(localStorage.getItem('appreciationCount'), 10);
    count++;
    localStorage.setItem('appreciationCount', count);
    localStorage.setItem('hasAppreciated', 'true');
    appreciateCount.textContent = count;
    alert('Thanks for appreciating the developer 💚');
  } else {
    alert('You have already appreciated the developer 💚');
  }
});

// === Init ===
window.onload = loadNotes;
