
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
          await bookingController.cancelBooking()
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

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
