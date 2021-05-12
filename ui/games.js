import { getUpcomingGames } from '../graph/games.js';

export async function loadGames() {
    const gamesContainer = document.getElementById('games');
    gamesContainer.querySelector('.loading').style = 'display: block';
    gamesContainer.querySelector('.noContent').style = 'display: none';
    gamesContainer.querySelector('mgt-agenda').events = [];
    gamesContainer.querySelector('h2').innerHTML = 'Upcoming NBA games';

    const games = await getUpcomingGames();
    games.forEach(meeting => {
        meeting.attendees = meeting.attendees.map(a => {
            return {
                displayName: a.emailAddress.name,
                mail: a.emailAddress.address,
                personImage: a.personImage
            };
        });
    });

    gamesContainer.querySelector('mgt-agenda').events = games;
    gamesContainer.querySelector('.loading').style = 'display: none';

    if (games.length === 0) {
        gamesContainer.querySelector('.noContent').style = 'display: block';
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

