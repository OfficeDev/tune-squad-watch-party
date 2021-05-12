import { getMyColleagues } from '../graph/colleagues.js';

export async function loadColleagues() {
  const { myColleagues } = await getMyColleagues();
  document.querySelector('#newWatchParty mgt-people-picker').people = myColleagues.value;

  document.querySelector('#colleagues .loading').style = 'display: none';

  const colleaguesList = document.querySelector('#colleagues ul');
  myColleagues.value.forEach(person => {
    const colleagueLi = document.createElement('li');

    const mgtPerson = document.createElement('mgt-person');
    mgtPerson.personDetails = person;
    mgtPerson.line2Property = '';
    mgtPerson.line3Property = '';
    mgtPerson.view = mgt.PersonViewType.threelines;

    colleagueLi.append(mgtPerson);
    colleaguesList.append(colleagueLi);
  });
}
