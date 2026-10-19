import { Booking } from './Booking.js'
import { OpeningHours } from './OpeningHours.js'

/**
 * Manages bookings, opening hours, and available booking slots.
 */
export class BookingScheduler {
  /**
   * Creates a new booking scheduler.
   */
  constructor() {
    this.bookings = []
    this.nextBookingId = 1
    this.openingHours = []
  }

  /**
   * Sets the opening hours for a specific day.
   *
   * @param {string} day - The day of the week.
   * @param {string} openTime - The opening time in HH:MM format.
   * @param {string} closeTime - The closing time in HH:MM format.
   */
  setOpeningHours(day, openTime, closeTime) {
    const hours = new OpeningHours(day, openTime, closeTime)
    this.openingHours.push(hours)
  }

  /**
   * Gets the opening hours for a specific day.
   *
   * @param {string} day - The day of the week.
   * @returns {OpeningHours|undefined} The opening hours for the day.
   */
  getOpeningHours(day) {
    return this.openingHours.find(
      hours => hours.day === day
    )
  }

  /**
   * Gets the day of the week from a date.
   *
   * @param {string} date - The date in YYYY-MM-DD format.
   * @returns {string} The name of the day.
   */
  getDayFromDate(date) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]

    const dayNumber = new Date(date).getUTCDay()

    return days[dayNumber]
  }

  /**
   * Checks whether a booking fits within the opening hours.
   *
   * @param {string} date - The booking date in YYYY-MM-DD format.
   * @param {string} startTime - The booking start time in HH:MM format.
   * @param {number} duration - The booking duration in minutes.
   * @returns {boolean} True if the booking is within the opening hours.
   */
  isWithinOpeningHours(date, startTime, duration) {
    const day = this.getDayFromDate(date)
    const openHours = this.getOpeningHours(day)

    if (!openHours) {
      return false
    }

    return openHours.isWithinOpeningHours(startTime, duration)
  }

  /**
   * Adds a new booking.
   *
   * @param {string} date - The booking date in YYYY-MM-DD format.
   * @param {string} startTime - The booking start time in HH:MM format.
   * @param {number} duration - The booking duration in minutes.
   * @throws {Error} If the booking data is invalid, outside opening hours,
   * or the requested time is unavailable.
   */
  addBooking(date, startTime, duration) {
    const booking = new Booking(
      this.nextBookingId,
      date,
      startTime,
      duration
    )

    if (!booking.isValidDate()) {
      throw new Error('Invalid booking date')
    }

    if (!booking.isValidTime()) {
      throw new Error('Invalid booking time')
    }

    if (!booking.isValidDuration()) {
      throw new Error('Invalid booking duration')
    }

    if (!this.isWithinOpeningHours(date, startTime, duration)) {
      throw new Error('Booking is outside of opening hours')
    }

    if (!this.isAvailable(date, startTime, duration)) {
      throw new Error('Booking time is not available')
    }

    this.bookings.push(booking)
    this.nextBookingId++
  }

  /**
   * Checks whether a booking time is available.
   *
   * @param {string} date - The booking date in YYYY-MM-DD format.
   * @param {string} startTime - The booking start time in HH:MM format.
   * @param {number} duration - The booking duration in minutes.
   * @returns {boolean} True if the requested time is available.
   */
  isAvailable(date, startTime, duration) {
    const newBooking = new Booking(
      this.nextBookingId,
      date,
      startTime,
      duration
    )

    for (const booking of this.bookings) {
      if (booking.date !== date) {
        continue
      }

      const newStart = newBooking.getStartTimeMinutes()
      const newEnd = newBooking.getEndTimeMinutes()

      const existingStart = booking.getStartTimeMinutes()
      const existingEnd = booking.getEndTimeMinutes()

      if (newStart < existingEnd && newEnd > existingStart) {
        return false
      }
    }

    return true
  }

  /**
   * Gets the available booking start times for a date.
   *
   * @param {string} date - The booking date in YYYY-MM-DD format.
   * @param {number} duration - The requested booking duration in minutes.
   * @returns {string[]} The available start times in HH:MM format.
   * @throws {Error} If the duration is not a positive integer.
   */
  getAvailableSlots(date, duration) {
    if (!Number.isInteger(duration) || duration <= 0) {
      throw new Error('Invalid booking duration')
    }

    const day = this.getDayFromDate(date)
    const openHours = this.getOpeningHours(day)

    if (!openHours) {
      return []
    }

    const [openHour, openMinute] = openHours.openTime.split(':').map(Number)
    const openingTime = openHour * 60 + openMinute

    const [closeHour, closeMinute] = openHours.closeTime.split(':').map(Number)
    const closeTime = closeHour * 60 + closeMinute

    const availableSlots = []

    for (
      let currentTime = openingTime;
      currentTime + duration <= closeTime;
      currentTime += duration
    ) {
      const hours = Math.floor(currentTime / 60)
      const minutes = currentTime % 60

      const startTime =
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`

      if (this.isAvailable(date, startTime, duration)) {
        availableSlots.push(startTime)
      }
    }

    return availableSlots
  }

  /**
   * Cancels a booking by its ID.
   *
   * @param {number} id - The ID of the booking to cancel.
   * @returns {boolean} True if the booking was cancelled, otherwise false.
   */
  cancelBooking(id) {
    const bookingIndex = this.bookings.findIndex(
      booking => booking.id === id
    )

    if (bookingIndex === -1) {
      return false
    }

    this.bookings.splice(bookingIndex, 1)
    return true
  }

  /**
   * Reschedules an existing booking.
   *
   * @param {number} id - The ID of the booking to reschedule.
   * @param {string} newDate - The new date in YYYY-MM-DD format.
   * @param {string} newStartTime - The new start time in HH:MM format.
   * @param {number} newDuration - The new duration in minutes.
   * @returns {boolean} True if the booking was rescheduled, otherwise false.
   * @throws {Error} If the new booking data is invalid or outside opening hours.
   */
  rescheduleBooking(id, newDate, newStartTime, newDuration) {
    const booking = this.bookings.find(
      booking => booking.id === id
    )

    if (!booking) {
      return false
    }

    const updatedBooking = new Booking(
      id,
      newDate,
      newStartTime,
      newDuration
    )

    if (!updatedBooking.isValidDate()) {
      throw new Error('Invalid booking date')
    }

    if (!updatedBooking.isValidTime()) {
      throw new Error('Invalid booking time')
    }

    if (!updatedBooking.isValidDuration()) {
      throw new Error('Invalid booking duration')
    }

    if (!this.isWithinOpeningHours(newDate, newStartTime, newDuration)) {
      throw new Error('Booking is outside of opening hours')
    }

    for (const existingBooking of this.bookings) {
      if (existingBooking.id === id) {
        continue
      }

      if (existingBooking.date !== newDate) {
        continue
      }

      const newStart = updatedBooking.getStartTimeMinutes()
      const newEnd = updatedBooking.getEndTimeMinutes()

      const existingStart = existingBooking.getStartTimeMinutes()
      const existingEnd = existingBooking.getEndTimeMinutes()

      if (newStart < existingEnd && newEnd > existingStart) {
        return false
      }
    }

    booking.date = newDate
    booking.startTime = newStartTime
    booking.duration = newDuration

    return true
  }

  /**
   * Gets all current bookings.
   *
   * @returns {Booking[]} A copy of the current bookings.
   */
  getBookings() {
    return [...this.bookings]
  }
}