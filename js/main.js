var picture = document.querySelector('.picture');
var photoUrl = document.querySelector('.photoUrl');

photoUrl.addEventListener('input', photoPreview);

function photoPreview(event) {
  picture.src = event.target.value;
  if (event.target.value.length === 0) {
    picture.src = 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640';
  }
}

var formValues = document.querySelector('#entry-form');

formValues.addEventListener('submit', save);

function save(event) {
  event.preventDefault();
  if (data.editing === null) {
    var entry = {
      title: document.querySelector('#title').value,
      notes: document.querySelector('#notes').value,
      photoUrl: document.querySelector('.photoUrl').value,
      id: data.nextEntryId
    };
    data.entries.unshift(entry);
    data.nextEntryId++;
    picture.src = 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640';
    ul.prepend(renderEntries(entry));
  } else {
    var updatedTitle = document.querySelector('#title').value;
    var updatedNotes = document.querySelector('#notes').value;
    var updatedPhotoUrl = document.querySelector('.photoUrl').value;
    var updatedEntryId = data.editing.id;
    var updatedEntry = {
      title: updatedTitle,
      notes: updatedNotes,
      photoUrl: updatedPhotoUrl,
      id: updatedEntryId
    };
    data.entries[data.entries.length - updatedEntry.id] = updatedEntry;
    var savedEntries = document.querySelectorAll('[data-entry-id]');
    for (var i = 0; i < savedEntries.length; i++) {
      if (Number(savedEntries[i].getAttribute('data-entry-id')) === data.editing.id) {
        var renderedUpdatedEntry = renderEntries(updatedEntry);
        savedEntries[i].replaceWith(renderedUpdatedEntry);
      }
    }
    data.editing = null;
  }
  formValues.reset();
}

var ul = document.querySelector('ul');

function renderEntries(entry) { // Creates DOM tree
  var li = document.createElement('li');
  li.setAttribute('data-entry-id', entry.id);
  var rowDiv = document.createElement('div');
  rowDiv.className = 'row';
  li.appendChild(rowDiv);
  var imgColumnDiv = document.createElement('div');
  imgColumnDiv.className = 'column-half';
  rowDiv.appendChild(imgColumnDiv);
  var img = document.createElement('img');
  imgColumnDiv.appendChild(img);
  img.src = entry.photoUrl;
  var textColumnDiv = document.createElement('div');
  textColumnDiv.className = 'column-half';
  rowDiv.appendChild(textColumnDiv);
  var title = document.createElement('span');
  var text = document.createElement('p');
  var editButton = document.createElement('i');
  textColumnDiv.appendChild(title);
  textColumnDiv.appendChild(editButton);
  textColumnDiv.appendChild(text);
  editButton.className = 'fa-solid fa-pen';
  editButton.setAttribute('data-view', 'entry-form');
  var entryTitle = document.createTextNode(entry.title);
  title.appendChild(entryTitle);
  var entryNotes = document.createTextNode(entry.notes);
  text.appendChild(entryNotes);
  noEntry.classList.add('hidden');
  return li;
}

window.addEventListener('DOMContentLoaded', appendDomContent); // Appends DOM trees for new entries

function appendDomContent(event) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i] !== null) {
      ul.appendChild(renderEntries(data.entries[i]));
    }
  }
}

var noEntry = document.querySelector('.no-entry'); // Displays no entry text when no entries have been entered

if (data.entries.length === 0) {
  noEntry.classList.remove('hidden');
}

var display = document.querySelectorAll('.display');
var inputCheck = document.querySelectorAll('input');
var textarea = document.querySelector('textarea');

window.addEventListener('click', clickEntries); // switches view when entries is clicked

function clickEntries(event) {
  var dataView = event.target.getAttribute('data-view');
  if (event.target.matches('.view-entries')) {
    for (var i = 0; i < display.length; i++) {
      display[i].className = 'display hidden';
      if (display[i].getAttribute('data-view') === dataView) {
        display[i].className = 'display';
        data.view = 'entries';
      }
    }
  }
}

// delete entry button functionality
var deleteEntry = document.querySelector('h4');
var modal = document.querySelector('.modal');
var cancelButton = document.querySelector('.cancel-button');

deleteEntry.addEventListener('click', clickDeleteEntry);

function clickDeleteEntry(event) {
  modal.className = 'modal';
}

cancelButton.addEventListener('click', clickCancelButton);

function clickCancelButton(event) {
  modal.className = 'modal hidden';
}

var formHeading = document.querySelector('.form-heading');

if (formHeading.textContent !== 'Edit Entry') {
  deleteEntry.className = 'hidden';
} else {
  deleteEntry.className = 'display';
}

window.addEventListener('click', clickNewButton); // switches view with new button is clicked

function clickNewButton(event) {
  var dataView = event.target.getAttribute('data-view');
  if (event.target.matches('.new-button')) {
    for (var i = 0; i < display.length; i++) {
      display[i].className = 'display hidden';
      if (display[i].getAttribute('data-view') === dataView) {
        display[i].className = 'display';
        data.view = 'entry-form';
        formHeading.textContent = 'New Entry';
        formValues.reset();
        picture.src = 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640';
      }
    }
  }
  if (formHeading.textContent !== 'Edit Entry') {
    deleteEntry.className = 'hidden';
  } else {
    deleteEntry.className = 'display';
  }
}

window.addEventListener('click', clickSaveButton); // switches view when entry is submitted

function clickSaveButton(event) {
  var dataView = event.target.getAttribute('data-view');
  if (event.target.matches('.submit')) { // checks if any inputs on the entry form are empty
    for (var i = 0; i < 1; i++) {
      for (var j = 0; j < inputCheck.length; j++) {
        if (inputCheck[j].value.length === 0 || textarea.value.length === 0) {
          return;
        }
      }
    }
    for (i = 0; i < display.length; i++) { // switches view when an entry is saved
      display[i].className = 'display hidden';
      if (display[i].getAttribute('data-view') === dataView) {
        display[i].className = 'display';
        data.view = 'entries';
      }
    }
  }
}

window.addEventListener('DOMContentLoaded', keepPage); // keeps the same view when page is reloaded

function keepPage(event) {
  if (data.view === 'entries') {
    for (var i = 0; i < display.length; i++) {
      display[i].className = 'display hidden';
      if (display[i].getAttribute('data-view') === data.view) {
        display[i].className = 'display';

      }
    }
  } else if (data.view === 'entry-form') {
    for (i = 0; i < display.length; i++) {
      display[i].className = 'display hidden';
      if (display[i].getAttribute('data-view') === data.view) {
        display[i].className = 'display';

      }
    }
  }
}

// creating edit button functions
ul.addEventListener('click', editEntry);

function editEntry(event) {
  if (event.target.tagName === 'I') {
    var dataView = event.target.getAttribute('data-view');
    for (var i = 0; i < display.length; i++) {
      display[i].className = 'display hidden';
      if (display[i].getAttribute('data-view') === dataView) {
        display[i].className = 'display';
        data.view = 'entry-form';
        formHeading.textContent = 'Edit Entry';
      }
    }
    var entryToEdit = event.target.closest('li');
    var entryId = entryToEdit.getAttribute('data-entry-id');
    for (i = 0; i < data.entries.length; i++) {
      if (data.entries[i] === data.entries[data.entries.length - entryId]) {
        data.editing = data.entries[i];
        var title = document.querySelector('#title');
        var notes = document.querySelector('#notes');
        var photoUrl = document.querySelector('.photoUrl');
        title.value = data.editing.title;
        notes.value = data.editing.notes;
        photoUrl.value = data.editing.photoUrl;
        picture.src = photoUrl.value;
      }
    }
  }
}
