
import { BookingModel } from './models/BookingModel.js'
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

// Initialize the booking model.
const bookingModel = new BookingModel()

// Create an interface for terminal input.
const rl = createInterface({ input, output })

/**
 * Displays the main menu.
 */
function showMenu() {
  console.log('\n=== Booking Planner ===')
  console.log('1. Create booking')
  console.log('2. View bookings')
  console.log('3. Cancel booking')
  console.log('4. Reschedule booking')
  console.log('5. View available slots')
  console.log('6. Check workday')
  console.log('0. Exit')
}

/**
 * Starts the interactive application.
 */
async function main() {
  let running = true

  while (running) {
    showMenu()

    const choice = await rl.question('\nChoose an option: ')

    switch (choice.trim()) {
      case '1':
        await createBooking()
        break

      case '2':
        viewBookings()
        break

      case '3':
        await cancelBooking()
        break

      case '0':
        running = false
        console.log('Goodbye!')
        break

      default:
        console.log('This feature is not implemented yet.')
    }
  }

  rl.close()
}

/**
 * Creates a booking on a Swedish workday.
 */
async function createBooking() {
  const date = (await rl.question('Enter date (YYYY-MM-DD): ')).trim()
  const startTime = (await rl.question('Enter start time (HH:MM): ')).trim()
  const duration = Number(await rl.question('Enter duration (minutes): '))

  try {
    const booking = bookingModel.createBooking(date, startTime, duration)

    console.log(`Booking created successfully! ID: ${booking.id}`)
  } catch (error) {
    console.log(`Booking failed: ${error.message}`)
  }
}

/**
 * Displays all existing bookings.
 */
function viewBookings() {
  const bookings = bookingModel.getBookings()

  if (bookings.length === 0) {
    console.log('No bookings found.')
    return
  }

  console.log('\n=== Your Bookings ===')

  for (const booking of bookings) {
    console.log(`ID: ${booking.id}`)
    console.log(`Date: ${booking.date}`)
    console.log(`Start time: ${booking.startTime}`)
    console.log(`Duration: ${booking.duration} minutes`)
    console.log('------------------------')
  }
}

async function cancelBooking() {
  const id = Number(await rl.question('Enter booking ID: '))

  if (!Number.isInteger(id) || id <= 0) {
    console.log('Invalid booking ID.')
    return
  }

  const cancelled = bookingModel.cancelBooking(id)

  if (cancelled) {
    console.log(`Booking ${id} cancelled successfully!`)
  } else {
    console.log(`Booking ${id} was not found.`)
  }
}

main().catch(error => {
  console.error(error.message)
  rl.close()
})
