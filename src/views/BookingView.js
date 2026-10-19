import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

export class BookingView {
  constructor() {
    this.rl = createInterface({ input, output })
  }

  /**
   * Displays the main menu.
   */
  showMenu() {
    console.log('\n=== Booking Planner ===')
    console.log('1. Create Booking')
    console.log('2. View Bookings')
    console.log('3. Cancel booking')
    console.log('4. Reschedule booking')
    console.log('5. View available slots')
    console.log('6. Check workday')
    console.log('0. Exit')
  }

  /**
 * Asks the user a question.
 *
 * @param {string} question - The question to ask.
 * @returns {Promise<string>} The user's answer.
 */
  async ask(question) {
    return (await this.rl.question(question)).trim()
  }

  /**
   * Displays a message.
   *
   * @param {string} message - The message to display.
   */
  showMessage(message) {
    console.log(message)
  }

  /**
   * Displays all bookings.
   *
   * @param {Array} bookings - The bookings to display.
   */
  showBookings(bookings) {
    if (bookings.length === 0) {
      this.showMessage('No bookings found.')
      return
    }

    this.showMessage('\n=== Your Bookings ===')

    for (const booking of bookings) {
      this.showMessage(`ID: ${booking.id}`)
      this.showMessage(`Date: ${booking.date}`)
      this.showMessage(`Start time: ${booking.startTime}`)
      this.showMessage(`Duration: ${booking.duration} minutes`)
      this.showMessage('------------------------')
    }
  }

  /**
   * Closes the terminal interface.
   */
  close() {
    this.rl.close()
  }
}
