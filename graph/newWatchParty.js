
import { refresh } from '../ui/newWatchParty.js';
import graphClient from './graphClient.js';

export async function createNewEvent() {
  // Get the user's input
  const subject = document.getElementById('ev-subject').value;
  const attendees = document.querySelector('#newWatchParty mgt-people-picker').selectedPeople;
  const start = document.getElementById('ev-start').value;
  const end = document.getElementById('ev-end').value;
  const body = document.getElementById('ev-body').value;

  // Build the JSON payload of the event
  const newEvent = {
    subject: subject,
    start: {
      dateTime: start,
      timeZone: 'UTC'
    },
    end: {
      dateTime: end,
      timeZone: 'UTC'
    },
    isOnlineMeeting: true,
    onlineMeetingProvider: "teamsForBusiness",
    categories: ["Red category"]
  };

  if (attendees) {
    newEvent.attendees = attendees.map(attendee => {
      return {
        type: 'required',
        emailAddress: {
          address: attendee.mail
        }
      };
    });
  }

  if (body) {
    newEvent.body = {
      contentType: 'text',
      content: body
    };
  }

  // POST the JSON to the /me/events endpoint
  await graphClient
    .api('groups/15e4817c-1662-426f-a1c3-0a275424b851/events')
    .post(newEvent);

  refresh();
}
