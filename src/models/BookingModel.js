import { BookingScheduler } from 'booking-scheduler'
import { HolidayCalendar } from 'js-cli-template'

/**
 * Manages bookings and Swedish workday validation.
 */
export class BookingModel {
  constructor() {
    this.scheduler = new BookingScheduler()
    this.calendar = new HolidayCalendar(new Date().getFullYear())

    // Configure opening hours for weekdays.
    const weekdays = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday'
    ]

    for (const day of weekdays) {
      this.scheduler.setOpeningHours(day, '09:00', '17:00')
    }
  }

}