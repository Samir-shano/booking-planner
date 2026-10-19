/**
 * Coordinates booking operations between the model and view.
 */
export class BookingController {
  /**
   * @param {BookingModel} model - The booking model.
   * @param {BookingView} view - The terminal view.
   */
  constructor(model, view) {
    this.model = model
    this.view = view
  }

  /**
   * Creates a booking on a Swedish workday.
   */
  async createBooking() {
    const date = await this.view.ask('Enter date (YYYY-MM-DD): ')
    const startTime = await this.view.ask('Enter start time (HH:MM): ')
    const duration = Number(
      await this.view.ask('Enter duration (minutes): ')
    )

    try {
      const booking = this.model.createBooking(date, startTime, duration)

      this.view.showMessage(
        `Booking created successfully! ID: ${booking.id}`
      )
    } catch (error) {
      this.view.showMessage(`Booking failed: ${error.message}`)
    }
  }
}