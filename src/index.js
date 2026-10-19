
import { BookingModel } from './models/BookingModel.js'
import { BookingView } from './views/BookingView.js'

// Initialize the model and view.
const bookingModel = new BookingModel()
const bookingView = new BookingView()

/**
 * Starts the interactive application.
 */
async function main() {
  let running = true

  try {
    while (running) {
      bookingView.showMenu()

      const choice = await bookingView.ask('\nChoose an option: ')

      switch (choice) {
        case '1':
          await createBooking()
          break

        case '2':
          bookingView.showBookings(bookingModel.getBookings())
          break

        case '3':
          await cancelBooking()
          break

        case '0':
          running = false
          bookingView.showMessage('Goodbye!')
          break

        default:
          bookingView.showMessage('This feature is not implemented yet.')
      }
    }
  } finally {
    bookingView.close()
  }
}

/**
 * Creates a booking on a Swedish workday.
 */
async function createBooking() {
  const date = await bookingView.ask('Enter date (YYYY-MM-DD): ')
  const startTime = await bookingView.ask('Enter start time (HH:MM): ')
  const duration = Number(
    await bookingView.ask('Enter duration (minutes): ')
  )

  try {
    const booking = bookingModel.createBooking(date, startTime, duration)

    bookingView.showMessage(
      `Booking created successfully! ID: ${booking.id}`
    )
  } catch (error) {
    bookingView.showMessage(`Booking failed: ${error.message}`)
  }
}

/**
 * Cancels an existing booking by its ID.
 */
async function cancelBooking() {
  const id = Number(await bookingView.ask('Enter booking ID: '))

  if (!Number.isInteger(id) || id <= 0) {
    bookingView.showMessage('Invalid booking ID.')
    return
  }

  const cancelled = bookingModel.cancelBooking(id)

  if (cancelled) {
    bookingView.showMessage(`Booking ${id} cancelled successfully!`)
  } else {
    bookingView.showMessage(`Booking ${id} was not found.`)
  }
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
