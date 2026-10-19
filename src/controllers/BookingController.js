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

  /**
 * Cancels an existing booking by its ID.
 */
  async cancelBooking() {
    const id = Number(await this.view.ask('Enter booking ID: '))

    if (!Number.isInteger(id) || id <= 0) {
      this.view.showMessage('Invalid booking ID.')
      return
    }

    const cancelled = this.model.cancelBooking(id)

    if (cancelled) {
      this.view.showMessage(`Booking ${id} cancelled successfully!`)
    } else {
      this.view.showMessage(`Booking ${id} was not found.`)
    }
  }


  /**
   * Starts the interactive booking application.
   */
  async start() {
    let running = true

    try {
      while (running) {
        this.view.showMenu()

        const choice = await this.view.ask('\nChoose an option: ')

        switch (choice) {
          case '1':
            await this.createBooking()
            break

          case '2':
            this.view.showBookings(this.model.getBookings())
            break

          case '3':
            await this.cancelBooking()
            break

          case '4':
            await this.rescheduleBooking()
            break

          case '5':
            await this.viewAvailableSlots()
            break

          case '0':
            running = false
            this.view.showMessage('Goodbye!')
            break

          default:
            this.view.showMessage('This feature is not implemented yet.')
        }
      }
    } finally {
      this.view.close()
    }
  }


  /**
   * Reschedules an existing booking.
   */
  async rescheduleBooking() {
    const id = Number(await this.view.ask('Enter booking ID: '))

    if (!Number.isInteger(id) || id <= 0) {
      this.view.showMessage('Invalid booking ID.')
      return
    }

    const date = await this.view.ask('Enter new date (YYYY-MM-DD): ')
    const startTime = await this.view.ask('Enter new start time (HH:MM): ')
    const duration = Number(
      await this.view.ask('Enter new duration (minutes): ')
    )

    try {
      const rescheduled = this.model.rescheduleBooking(
        id,
        date,
        startTime,
        duration
      )

      if (rescheduled) {
        this.view.showMessage(`Booking ${id} rescheduled successfully!`)
      } else {
        this.view.showMessage(`Booking ${id} was not found.`)
      }
    } catch (error) {
      this.view.showMessage(`Rescheduling failed: ${error.message}`)
    }
  }

  /**
 * Displays available booking slots for a selected date.
 */
  async viewAvailableSlots() {
    const date = await this.view.ask('Enter date (YYYY-MM-DD): ')
    const duration = Number(
      await this.view.ask('Enter duration (minutes): ')
    )

    try {
      const slots = this.model.getAvailableSlots(date, duration)

      if (slots.length === 0) {
        this.view.showMessage('No available slots found.')
        return
      }

      this.view.showMessage('\n=== Available Slots ===')

      for (const slot of slots) {
        this.view.showMessage(String(slot))
      }
    } catch (error) {
      this.view.showMessage(`Failed to get available slots: ${error.message}`)
    }
  }
} 