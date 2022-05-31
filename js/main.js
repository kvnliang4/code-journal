var picture = document.querySelector('.picture');
var photoUrl = document.querySelector('.photoUrl');

photoUrl.addEventListener('input', photoPreview);

function photoPreview(event) {
  picture.src = event.target.value;
}

var formValues = document.querySelector('#entry-form');

formValues.addEventListener('submit', save);

function save(event) {
  event.preventDefault();
  /*  var entry = {
    title: document.querySelector('#title').value,
    notes: document.querySelector('#notes').value,
    photoUrl: document.querySelector('.photoUrl').value
  };
  console.log(entry); */
  formValues.reset();
}
