import { getUpcomingWatchParties } from '../graph/watchParties.js';

export async function loadWatchParties() {
    const watchPartiesContainer = document.getElementById('watchParties');
    watchPartiesContainer.querySelector('.loading').style = 'display: block';
    watchPartiesContainer.querySelector('.noContent').style = 'display: none';
    watchPartiesContainer.querySelector('mgt-agenda').events = [];
    watchPartiesContainer.querySelector('h2').innerHTML = 'Upcoming watch parties';

    const watchParties = await getUpcomingWatchParties();
    watchParties.forEach(watchParty => {
        watchParty.attendees = watchParty.attendees.map(a => {
            return {
                displayName: a.emailAddress.name,
                mail: a.emailAddress.address,
                personImage: a.personImage
            };
        });
    });

    watchPartiesContainer.querySelector('mgt-agenda').events = watchParties;
    watchPartiesContainer.querySelector('.loading').style = 'display: none';

    if (watchParties.length === 0) {
        watchPartiesContainer.querySelector('.noContent').style = 'display: block';
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

