import graphClient from './graphClient.js';
import { getAccount } from '../auth.js';
import { getUserPhoto } from './user.js';

export async function getMyColleagues() {
  // get my colleagues
  const colleagues = await graphClient
    .api(`groups/f80f9131-e52d-4402-91e3-d558cf1f393a/members`)
    .select('id,displayName,mail,jobTitle,department,city,state,country')
    .get();

  // exclude the current user, since this is not supported in Graph, we need to
  // do it locally
  const account = getAccount();
  const currentUserId = account.homeAccountId.substr(0, account.homeAccountId.indexOf('.'));
  colleagues.value = colleagues.value.filter(c => c.id !== currentUserId);

  colleagues.value.forEach((colleague, i) => {
    colleague.jobTitleAndDepartment = `${colleague.jobTitle || ''} (${colleague.department || ''})`;
    colleague.localTime = [colleague.city, colleague.state, colleague.country].join(', ');
  });

  // get colleagues' photos
  const colleaguesPhotosRequests = colleagues.value.map(
    colleague => getUserPhoto(colleague.mail));
  const colleaguesPhotos = await Promise.allSettled(colleaguesPhotosRequests);
  colleagues.value.forEach((colleague, i) => {
    if (colleaguesPhotos[i].status === 'fulfilled') {
      colleague.personImage = URL.createObjectURL(colleaguesPhotos[i].value);
    }
  });

  return ({ myColleagues: colleagues });
}

function toShortTimeString(date) {
  const timeString = date.toLocaleTimeString();
  const match = timeString.match(/(\d+\:\d+)\:\d+(.*)/);
  if (!match) {
    return timeString;
  }

  return `${match[1]}${match[2]}`;
}
