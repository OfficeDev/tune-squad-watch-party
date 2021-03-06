import graphClient from './graphClient.js';

export function getSelectedUserId() {
  if (location.hash.length < 2) {
    return undefined;
  }
  return location.hash.substr(1);
}

export function setSelectedUserId(id) {
  location.hash = `#${id}`;
}

export async function getUser(userId) {
  return await graphClient
    .api(userId ? `/users/${userId}` : '/me')
    .select('id,displayName,jobTitle,mail')
    .get();
}

export async function getUserPhoto(userId) {
  return graphClient
    .api(`/users/${userId}/photo/$value`)
    .get();
}

export async function getProfile() {
  const selectedUserId = getSelectedUserId();
  return getUserProfile(selectedUserId);
}

export async function getUserProfile(userId) {
  const userQueryPart = userId ? `/users/${userId}` : '/me';

  const profile = await graphClient
    .api(`${userQueryPart}`)
    .select('displayName,jobTitle,department,mail,aboutMe,city,state,country')
    .get();

  return profile;
}