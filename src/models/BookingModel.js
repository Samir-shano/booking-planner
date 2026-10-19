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

  /**
   * Checks whether a date is a Swedish workday.
   *
   * @param {string} date - Date in YYYY-MM-DD format.
   * @returns {boolean} True if the date is a workday.
   */
  isWorkday(date) {
    const year = Number(date.slice(0, 4))
    const calendar = year === new Date().getFullYear()
      ? this.calendar
      : new HolidayCalendar(year)

    return calendar.isWorkday(date)
  }

  /**
   * Creates a booking on a Swedish workday.
   */
  createBooking(date, startTime, duration) {
    if (!this.isWorkday(date)) {
      throw new Error('Bookings are only allowed on Swedish workdays.')
    }

    this.scheduler.addBooking(date, startTime, duration)

    const bookings = this.scheduler.getBookings()
    return bookings[bookings.length - 1]
  }


}