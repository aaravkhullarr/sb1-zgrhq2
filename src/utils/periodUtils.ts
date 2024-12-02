import { addMinutes, isBefore, isAfter, differenceInMinutes } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { format } from 'date-fns';
import { TIMEZONE, SCHEDULES, PERIOD_ORDER_CUTOFFS } from './scheduleConfig';
import { getCurrentDate, getDayType, isWeekend } from './dateUtils';

export function getTimeUntilNextPeriod(period: number): number {
  if (isWeekend()) return 0;
  
  const schedule = getDayType();
  const now = getCurrentDate();
  const today = format(now, 'yyyy-MM-dd');
  
  const periodTime = SCHEDULES[schedule][period];
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

export function isPeriodActive(period: number): boolean {
  if (isWeekend()) return false;
  
  const schedule = getDayType();
  const now = getCurrentDate();
  const today = format(now, 'yyyy-MM-dd');
  
  const periodTime = SCHEDULES[schedule][period];
  if (!periodTime) return false;

  const periodStart = zonedTimeToUtc(`${today} ${periodTime.start}`, TIMEZONE);
  const periodEnd = zonedTimeToUtc(`${today} ${periodTime.end}`, TIMEZONE);
  
  return isAfter(now, periodStart) && isBefore(now, periodEnd);
}

export function getOrderCutoffTime(period: number): Date {
  const schedule = getDayType();
  const now = getCurrentDate();
  const today = format(now, 'yyyy-MM-dd');
  
  const cutoffTime = PERIOD_ORDER_CUTOFFS[schedule].start;
  return zonedTimeToUtc(`${today} ${cutoffTime}`, TIMEZONE);
}