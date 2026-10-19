
import { BookingScheduler } from 'booking-scheduler'
import { HolidayCalendar } from 'js-cli-template'

// Create instances of both modules.
const scheduler = new BookingScheduler()
const calendar = new HolidayCalendar(2026)

// Check whether a date is a Swedish workday.
const date = '2026-10-20'

console.log('=== Booking Planner ===')
console.log(`Date: ${date}`)
console.log(`Is holiday: ${calendar.isHoliday(date)}`)
console.log(`Is workday: ${calendar.isWorkday(date)}`)
console.log('Booking Scheduler initialized:', scheduler instanceof BookingScheduler)
