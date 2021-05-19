import graphClient from './graphClient.js';
import { getAccount } from '../auth.js';
import { getUserPhoto } from './user.js';

export async function getFans() {
  // get fans
  const fans = await graphClient
    .api(`groups/f80f9131-e52d-4402-91e3-d558cf1f393a/members`)
    .select('id,displayName,mail,jobTitle,department,city,state,country')
    .get();

  // exclude the current user, since this is not supported in Graph, we need to
  // do it locally
  const account = getAccount();
  const currentUserId = account.homeAccountId.substr(0, account.homeAccountId.indexOf('.'));
  fans.value = fans.value.filter(c => c.id !== currentUserId);

  fans.value.forEach(fan => {
    fan.jobTitleAndDepartment = `${fan.jobTitle || ''} (${fan.department || ''})`;
    fan.localTime = [fan.city, fan.state, fan.country].join(', ');
  });

  // get fans' photos
  const fansPhotosRequests = fans.value.map(
    fan => getUserPhoto(fan.mail));
  const fansPhotos = await Promise.allSettled(fansPhotosRequests);
  fans.value.forEach((fan, i) => {
    if (fansPhotos[i].status === 'fulfilled') {
      fan.personImage = URL.createObjectURL(fansPhotos[i].value);
    }
  });

  return ({ fans: fans });
}
