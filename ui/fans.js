import { getFans } from '../graph/fans.js';

export async function loadFans() {
  const { fans } = await getFans();
  document.querySelector('#newWatchParty mgt-people-picker').people = fans.value;

  document.querySelector('#fans .loading').style = 'display: none';

  const fansList = document.querySelector('#fans ul');
  fans.value.forEach(person => {
    const fanLi = document.createElement('li');

    const mgtPerson = document.createElement('mgt-person');
    mgtPerson.personDetails = person;
    mgtPerson.line2Property = 'country';
    mgtPerson.line3Property = '';
    mgtPerson.view = mgt.PersonViewType.threelines;

    fanLi.append(mgtPerson);
    fansList.append(fanLi);
  });
}
