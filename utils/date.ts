export function getDayOfWeek(dayNumber: string) {
    const correctDay = parseInt(dayNumber) - 1;
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    date.setDate(date.getDate() + correctDay);
    const dayOfWeekNumber = date.getDay();
    return daysOfWeek[dayOfWeekNumber];
}

export const convertTo12HourFormat = (timeString: string) => {
    const timeParts = timeString.split(':');
    const hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);
    const seconds = parseInt(timeParts[2]);

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    const formattedTime = date.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: '2-digit', second: '2-digit' });
    return formattedTime;
};