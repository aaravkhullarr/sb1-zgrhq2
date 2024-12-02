export interface PeriodTime {
  start: string;
  end: string;
}

export interface DaySchedule {
  [key: number]: PeriodTime;
}

export interface PeriodStatus {
  period: number;
  isActive: boolean;
  timeRemaining: number;
}