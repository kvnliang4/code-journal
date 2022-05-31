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
  data.entries.push(entry);
  entry.nextEntryId++;
  formValues.reset();
  picture.src = 'https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640';
}

window.addEventListener('beforeunload', stringify);

function stringify(event) {
  var entriesJSON = JSON.stringify(data.entries);
  localStorage.setItem('javascript-local-storage', entriesJSON);
}
