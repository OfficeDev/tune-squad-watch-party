import { getUserPhoto, getUser } from './user.js';
import graphClient from './graphClient.js';

//get calendar events for upcoming week
export async function getMyUpcomingMeetings() {

  const dateNow = new Date();
  const dateNextWeek = new Date();
  dateNextWeek.setDate(dateNextWeek.getDate() + 7);
  const query = `startDateTime=${dateNow.toISOString()}&endDateTime=${dateNextWeek.toISOString()}`;
  var meetings = [];
  const response = await graphClient
    .api(`/groups/15e4817c-1662-426f-a1c3-0a275424b851/events?$filter=categories/any(a:a+eq+'Red+Category')`)
    .query(query)
    .orderby(`start/DateTime`)
    .get();
  meetings = response.value;
  
  //photos of attendees
  var photoRequests = [];
  meetings.forEach(meeting => {
    // get attendees' photos
    meeting.attendees.forEach(
      attendee => photoRequests.push(getUserPhoto(attendee.emailAddress.address)));
  });
  const attendeePhotos = await Promise.allSettled(photoRequests);
  var count = 0;
  meetings.forEach(meeting => {
    meeting.attendees.forEach((attendee) => {
      if (count < attendeePhotos.length) {
        attendee.personImage = attendeePhotos[count].status === 'fulfilled' ? URL.createObjectURL(attendeePhotos[count].value) : null;
        count += 1;
      }
    });
  });
  return meetings;
}
