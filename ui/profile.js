import { getProfile } from '../graph/user.js';

export async function loadProfile() {
  const profile = await getProfile();

  // Fill in the data
  const aboutMe = profile.aboutMe ? profile.aboutMe : "";
  const profileDetail = document.querySelector('#profile div');
  if (profileDetail) {
    const html = `
      <table>
        <tr><td colspan="2">${aboutMe}</td></tr>
        <tr><td>Mail</td><td>${profile.mail}</td></tr>
      </table>
    `;
    profileDetail.innerHTML = html;
  }
}

