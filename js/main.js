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
}

function renderEntries(entry) {
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

window.addEventListener('DOMContentLoaded', appendDomContent);

function appendDomContent(event) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i] !== null) {
      ul.appendChild(renderEntries((data.entries[i])));
    }
  }
}

var noEntry = document.querySelector('.no-entry');

if (data.entries.length === 0) {
  noEntry.className = 'no-entry';
}

var display = document.querySelectorAll('.display');

window.addEventListener('click', click);

var inputCheck = document.querySelectorAll('input');
var textarea = document.querySelector('textarea');

function click(event) {
  var dataView = event.target.getAttribute('data-view');
  if (event.target.matches('.view-entries')) {
    for (var i = 0; i < display.length; i++) {
      display[i].className = 'display hidden';
      if (display[i].getAttribute('data-view') === dataView) {
        display[i].className = 'display';
      }
    }
  } else if (event.target.matches('.new-button')) {
    for (i = 0; i < display.length; i++) {
      display[i].className = 'display hidden';
      if (display[i].getAttribute('data-view') === dataView) {
        display[i].className = 'display';
      }
    }
  } else if (event.target.matches('.submit')) {
    for (i = 0; i < 1; i++) {
      for (var j = 0; j < inputCheck.length; j++) {
        if (inputCheck[j].value.length === 0 || textarea.value.length === 0) {
          return;
        }
      }
    }
    for (i = 0; i < display.length; i++) {
      display[i].className = 'display hidden';
      if (display[i].getAttribute('data-view') === dataView) {
        display[i].className = 'display';
      }
    }
  }
}
