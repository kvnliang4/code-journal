/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', stringify);

function stringify(event) {
  var entriesJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', entriesJSON);
}

var previousEntriesJSON = localStorage.getItem('javascript-local-storage');

if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}
