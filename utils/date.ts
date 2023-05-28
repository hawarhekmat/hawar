export function getDayOfWeek(dayNumber: string) {
    const correctDay = parseInt(dayNumber) - 1;
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date();
    date.setDate(date.getDate() + correctDay);
    const dayOfWeekNumber = date.getDay();
    return daysOfWeek[dayOfWeekNumber];
}