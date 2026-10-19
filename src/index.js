
import { BookingModel } from './models/BookingModel.js'
import { BookingView } from './views/BookingView.js'
import { BookingController } from './controllers/BookingController.js'

// Initialize the MVC components.
const model = new BookingModel()
const view = new BookingView()
const controller = new BookingController(model, view)

// Start the application.
controller.start().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})
