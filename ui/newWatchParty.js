import { createNewEvent } from '../graph/newWatchParty.js';
import { loadWatchParties } from './watchParties.js';

export function loadWatchPartyForm() {
  const newWatchParty = document.getElementById('newWatchParty');
  newWatchParty
    .querySelectorAll('.ms-Grid, .createButton, .cancelButton')
    .forEach(e => e.style = 'display: none');
  newWatchParty.querySelector('.button').addEventListener('click', getWatchPartyForm);
}

export function getWatchPartyForm() {
  const newWatchParty = document.getElementById('newWatchParty');
  newWatchParty
    .querySelectorAll('.ms-Grid, .createButton, .cancelButton')
    .forEach(e => e.style = 'display: block');
  newWatchParty.querySelector('.button').style = 'display: none';
  newWatchParty.querySelector('.createButton').addEventListener('click', async function() {
    await createNewEvent();
    await loadWatchParties();
  });
  newWatchParty.querySelector('.cancelButton').addEventListener('click', refresh);
}

export function refresh() {
  const newWatchParty = document.getElementById('newWatchParty');
  newWatchParty
    .querySelectorAll('.ms-Grid, .createButton, .cancelButton')
    .forEach(e => e.style = 'display: none');
  newWatchParty.querySelector('.button').style = 'display: block';
}
