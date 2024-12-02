import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { TIMEZONE } from './scheduleConfig';

export function getCurrentDate(): Date {
  return utcToZonedTime(new Date(), TIMEZONE);
}

export function formatDate(date: Date = getCurrentDate()): string {
  return format(date, 'EEE, MMMM do');
}

export function getCurrentTime(): string {
  return format(getCurrentDate(), 'h:mm a');
}

export function getDayType(): string {
  const day = format(getCurrentDate(), 'EEEE').toLowerCase();
  
  if (day === 'wednesday') return 'wed';
  if (day === 'tuesday' || day === 'thursday') return 'tue-thu';
  if (day === 'monday' || day === 'friday') return 'mon-fri';
  return 'weekend';
}

export function isWeekend(): boolean {
  const day = format(getCurrentDate(), 'EEEE').toLowerCase();
  return day === 'saturday' || day === 'sunday';
}