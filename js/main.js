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
