import { getBuddyInfo, saveBuddyInfo } from '../graph/buddy.js';
import { getMyColleagues } from '../graph/colleagues.js';
import { getUserProfile } from '../graph/user.js';

export async function loadBuddy() {
  const settings = await getBuddyInfo();
  if (!settings) {
    const buddySection = document.getElementById('buddy');
    buddySection.querySelector('.loading').style = 'display: none';
    buddySection.querySelector('.noContent').style = 'display: block';
    buddySection.querySelector('button').addEventListener('click', findBuddy);
    return;
  }
  else {
    showBuddy(settings.buddy);
  }
}

function showBuddy(buddy, buddySection, loading, button) {
  if (!buddySection) {
    buddySection = document.getElementById('buddy');
  }
  if (!loading) {
    loading = buddySection.querySelector('.loading');
  }
  if (!button) {
    button = buddySection.querySelector('button');
  }

  loading.style = 'display: none';
  button.style = 'display: none';

  const mgtPerson = document.createElement('mgt-person');
  mgtPerson.personDetails = buddy;
  mgtPerson.view = mgt.PersonViewType.threelines;
  buddySection.appendChild(mgtPerson);
}

export async function findBuddy() {
  const buddySection = document.getElementById('buddy');
  buddySection.querySelector('p').style = 'display: none';
  const loading = buddySection.querySelector('.loading');
  loading.innerHTML = 'Matching buddies...';
  loading.style = 'display: block';
  const button = buddySection.querySelector('button');
  button.disabled = true;

  const fans = await getMyColleagues();
  const me = await getUserProfile();
  const fansInMyLocation = fans.myColleagues.value.filter(c => c.country === me.country);

  const numFans = fansInMyLocation.length;
  if (numFans === 0) {
    loading.innerHTML = `Sorry, didn't find anyone near you. Call someone on Teams maybe?`;
    button.style = 'display: none';
    return false;
  }

  const buddy = fansInMyLocation[Math.floor(Math.random() * numFans)];
  await saveBuddyInfo(buddy);

  showBuddy(buddy, buddySection, loading, button);

  return false;
}