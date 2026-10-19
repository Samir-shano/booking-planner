/**
 * Represents a booking with a date, start time, and duration.
 */
export class Booking {
  /**
   * Creates a new booking.
   *
   * @param {number} id - The unique identifier of the booking.
   * @param {string} date - The booking date in YYYY-MM-DD format.
   * @param {string} startTime - The booking start time in HH:MM format.
   * @param {number} duration - The booking duration in minutes.
   */
  constructor(id, date, startTime, duration) {
    this.id = id
    this.date = date
    this.startTime = startTime
    this.duration = duration
  }

  /**
   * Calculates the booking end time.
   *
   * @returns {string} The end time in HH:MM format.
   */
  getEndTime() {
    const [hours, minutes] = this.startTime.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes + this.duration

    const endHours = Math.floor(totalMinutes / 60)
    const endMinutes = totalMinutes % 60

    return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`
  }

  /**
   * Converts the booking start time to minutes from midnight.
   *
   * @returns {number} The start time in minutes.
   */
  getStartTimeMinutes() {
    const [hours, minutes] = this.startTime.split(':').map(Number)
    return hours * 60 + minutes
  }

  /**
   * Calculates the booking end time in minutes from midnight.
   *
   * @returns {number} The end time in minutes.
   */
  getEndTimeMinutes() {
    return this.getStartTimeMinutes() + this.duration
  }

  /**
   * Checks whether the booking start time is valid.
   *
   * @returns {boolean} True if the time is valid, otherwise false.
   */
  isValidTime() {
    const parts = this.startTime.split(':')

    if (parts.length !== 2) {
      return false
    }

    const hours = Number(parts[0])
    const minutes = Number(parts[1])

    if (!Number.isInteger(hours) || !Number.isInteger(minutes)) {
      return false
    }

    if (hours < 0 || hours > 23) {
      return false
    }

    if (minutes < 0 || minutes > 59) {
      return false
    }

    return true
  }

  /**
   * Checks whether the booking duration is valid.
   *
   * @returns {boolean} True if the duration is a positive integer.
   */
  isValidDuration() {
    if (!Number.isInteger(this.duration)) {
      return false
    }

    if (this.duration <= 0) {
      return false
    }

    return true
  }

  /**
   * Checks whether the booking date is a valid calendar date.
   *
   * @returns {boolean} True if the date is valid, otherwise false.
   */
  isValidDate() {
    const parts = this.date.split('-')

    if (parts.length !== 3) {
      return false
    }

    if (
      parts[0].length !== 4 ||
      parts[1].length !== 2 ||
      parts[2].length !== 2
    ) {
      return false
    }

    const year = Number(parts[0])
    const month = Number(parts[1])
    const day = Number(parts[2])

    if (
      !Number.isInteger(year) ||
      !Number.isInteger(month) ||
      !Number.isInteger(day)
    ) {
      return false
    }

    if (month < 1 || month > 12) {
      return false
    }

    if (day < 1 || day > 31) {
      return false
    }

    const date = new Date(Date.UTC(year, month - 1, day))

    if (
      date.getUTCFullYear() !== year ||
      date.getUTCMonth() !== month - 1 ||
      date.getUTCDate() !== day
    ) {
      return false
    }

    return true
  }
}