import { getMyUpcomingMeetings } from '../graph/events.js';

export async function loadMeetings() {
    const eventsContainer = document.getElementById('events');
    eventsContainer.querySelector('.loading').style = 'display: block';
    eventsContainer.querySelector('.noContent').style = 'display: none';
    eventsContainer.querySelector('mgt-agenda').events = [];
    eventsContainer.querySelector('h2').innerHTML = 'Upcoming watch parties';

    const events = await getMyUpcomingMeetings();
    events.forEach(meeting => {
        meeting.attendees = meeting.attendees.map(a => {
            return {
                displayName: a.emailAddress.name,
                mail: a.emailAddress.address,
                personImage: a.personImage
            };
        });
    });

    eventsContainer.querySelector('mgt-agenda').events = events;
    eventsContainer.querySelector('.loading').style = 'display: none';

    if (events.length === 0) {
        eventsContainer.querySelector('.noContent').style = 'display: block';
        return;
    }
}

// Function to format the meeting time - needs to be global for access from
// the MGT template in index.html
window.timeRangeFromEvent = function (event) {
    if (event.isAllDay) {
        return 'ALL DAY';
    }

    let prettyPrintTimeFromDateTime = date => {
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        let minutesStr = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutesStr + ' ' + ampm;
    };

    let start = prettyPrintTimeFromDateTime(new Date(event.start.dateTime));
    let end = prettyPrintTimeFromDateTime(new Date(event.end.dateTime));

    return start + ' - ' + end;
}

