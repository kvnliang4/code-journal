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
  var entry = {
    title: document.querySelector('#title').value,
    notes: document.querySelector('#notes').value,
    photoUrl: document.querySelector('.photoUrl').value,
    id: data.nextEntryId
  };
  data.entries[entry.id] = entry;
  formValues.reset();
  data.nextEntryId++;
  picture.src = 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640';

  location.reload();
}

function renderEntries(entry) { // Creates DOM tree
  var li = document.createElement('li');
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
  textColumnDiv.appendChild(title);
  textColumnDiv.appendChild(text);
  var entryTitle = document.createTextNode(entry.title);
  title.appendChild(entryTitle);
  var entryNotes = document.createTextNode(entry.notes);
  text.appendChild(entryNotes);
  return li;
}

var ul = document.querySelector('ul');

window.addEventListener('DOMContentLoaded', appendDomContent); // Appends DOM trees for new entries

function appendDomContent(event) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i] !== null) {
      ul.insertBefore(renderEntries((data.entries[i])), ul.firstChild);
    }
  }
}

var noEntry = document.querySelector('.no-entry'); // Displays no entry text when no entries have been entered

if (data.entries.length === 0) {
  noEntry.className = 'no-entry';
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

window.addEventListener('click', clickNewButton); // switches view with new button is clicked

function clickNewButton(event) {
  var dataView = event.target.getAttribute('data-view');
  if (event.target.matches('.new-button')) {
    for (var i = 0; i < display.length; i++) {
      display[i].className = 'display hidden';
      if (display[i].getAttribute('data-view') === dataView) {
        display[i].className = 'display';
        data.view = 'entry-form';
      }
    }
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
