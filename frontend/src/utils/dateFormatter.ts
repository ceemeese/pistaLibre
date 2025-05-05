import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { Formatted } from '@/types/dates';

export function formatReservationDates(start: Date, end: Date) : Formatted {
    return {
      dateFormatted: format(start, 'd MMMM yyyy', { locale: es }),
      initialHourFormatted: format(start, 'HH:mm'),
      endHourFormatted: format(end, 'HH:mm'),
    };
  }