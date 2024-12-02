import { format, addMinutes, isBefore, isAfter, differenceInMinutes, parse, set, addDays } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

const TIMEZONE = 'America/Chicago';

interface PeriodTime {
  start: string;
  end: string;
}

interface DaySchedule {
  [key: number]: PeriodTime;
}

const SCHEDULES: { [key: string]: DaySchedule } = {
  'mon-fri': {
    4: { start: '10:36', end: '11:26' },
    5: { start: '11:32', end: '12:22' },
    6: { start: '12:28', end: '13:18' }
  },
  'tue-thu': {
    4: { start: '11:05', end: '11:50' },
    5: { start: '11:55', end: '12:40' },
    6: { start: '12:45', end: '13:30' }
  },
  'wed': {
    4: { start: '11:21', end: '12:03' },
    5: { start: '12:08', end: '12:49' },
    6: { start: '12:54', end: '13:36' }
  }
};

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

export function isAfter2PM(): boolean {
  const now = getCurrentDate();
  const twoPM = set(now, { hours: 14, minutes: 0, seconds: 0, milliseconds: 0 });
  return isAfter(now, twoPM);
}

export function canModifySelection(): boolean {
  const now = getCurrentDate();
  const midnight = set(addDays(now, 1), { 
    hours: 0, 
    minutes: 0, 
    seconds: 0, 
    milliseconds: 0 
  });
  return isBefore(now, midnight);
}

export function getTomorrowDate(): string {
  const tomorrow = addDays(getCurrentDate(), 1);
  return format(tomorrow, 'yyyy-MM-dd');
}

export function getTimeUntilNextPeriod(period: number): number {
  if (isWeekend()) return 0;
  
  const schedule = getDayType();
  const now = getCurrentDate();
  const today = format(now, 'yyyy-MM-dd');
  
  const periodTime = SCHEDULES[schedule]?.[period];
  if (!periodTime) return 0;

  const periodStart = zonedTimeToUtc(`${today} ${periodTime.start}`, TIMEZONE);
  const periodEnd = zonedTimeToUtc(`${today} ${periodTime.end}`, TIMEZONE);
  
  if (isBefore(now, periodStart)) {
    return differenceInMinutes(periodStart, now);
  } else if (isBefore(now, periodEnd)) {
    return differenceInMinutes(periodEnd, now);
  }
  
  return 0;
}

export function formatTimeRemaining(minutes: number): string {
  if (minutes <= 0) return '0m';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  
  return `${remainingMinutes}m`;
}