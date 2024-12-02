import { PeriodSchedule, DaySchedule } from '../types/schedule';

export const TIMEZONE = 'America/Chicago';

export const SCHEDULES: { [key: string]: DaySchedule } = {
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

export const PERIOD_ORDER_CUTOFFS: { [key: string]: { start: string } } = {
  'mon-fri': { start: '10:30' },
  'tue-thu': { start: '11:00' },
  'wed': { start: '11:16' }
};