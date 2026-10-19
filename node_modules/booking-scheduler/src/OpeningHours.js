/**
 * Represents the opening hours for a specific day.
 */
export class OpeningHours {
  /**
   * Creates opening hours for a specific day.
   *
   * @param {string} day - The day of the week.
   * @param {string} openTime - The opening time in HH:MM format.
   * @param {string} closeTime - The closing time in HH:MM format.
   */
  constructor(day, openTime, closeTime) {
    this.day = day
    this.openTime = openTime
    this.closeTime = closeTime
  }

  /**
   * Checks whether a booking fits within the opening hours.
   *
   * @param {string} startTime - The booking start time in HH:MM format.
   * @param {number} duration - The booking duration in minutes.
   * @returns {boolean} True if the booking is within the opening hours.
   */
  isWithinOpeningHours(startTime, duration) {
    const [openHours, openMinutes] = this.openTime.split(':').map(Number)
    const [closeHours, closeMinutes] = this.closeTime.split(':').map(Number)

    const openingTime = openHours * 60 + openMinutes
    const closingTime = closeHours * 60 + closeMinutes

    const [startHours, startMinutes] = startTime.split(':').map(Number)

    const bookingStart = startHours * 60 + startMinutes
    const bookingEnd = bookingStart + duration

    if (bookingStart < openingTime) {
      return false
    }

    if (bookingEnd > closingTime) {
      return false
    }

    return true
  }
}