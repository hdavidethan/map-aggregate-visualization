export function jsDateToHalfHour(date: Date): number {
  const timeMs =
    date.getHours() * 60 * 60 * 1000 +
    date.getMinutes() * 60 * 1000 +
    date.getSeconds() * 1000 +
    date.getMilliseconds();
  const totalDayMs = 24 * 60 * 60 * 1000;
  return timeRangeToHalfHour((100 * timeMs) / totalDayMs);
}

export function halfHourToTimeString(halfHourIndex: number): string {
  const half = halfHourIndex % 2 === 1;
  const hour = Math.floor(halfHourIndex / 2);
  if (hour < 10) {
    return `0${hour}:${half ? "30" : "00"}`;
  } else {
    return `${hour}:${half ? "30" : "00"}`;
  }
}

export function timeRangeToHalfHour(timeRange: number): number {
  const n = 24 * 2 - 1;
  return Math.floor((timeRange / 100) * n);
}

export function getNextTimeOffset(date: Date): number {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  console.log(hours, minutes);
  const halfHour = Math.ceil(minutes / 30);
  return (hours * 2 + halfHour) % 48;
}
