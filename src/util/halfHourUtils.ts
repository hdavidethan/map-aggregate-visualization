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
