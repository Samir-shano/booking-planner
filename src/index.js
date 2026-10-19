
import { BookingModel } from './models/BookingModel.js'
import { BookingView } from './views/BookingView.js'
import { BookingController } from './controllers/BookingController.js'

// Initialize the model and view.
const bookingModel = new BookingModel()
const bookingView = new BookingView()

// Initialize the booking controller.
const bookingController = new BookingController(bookingModel, bookingView)

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
          await bookingController.createBooking()
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
