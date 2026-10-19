
import { BookingScheduler } from 'booking-scheduler'
import { HolidayCalendar } from 'js-cli-template'
import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

// Initialize the booking and holiday modules.
const scheduler = new BookingScheduler()
const calendar = new HolidayCalendar(new Date().getFullYear())

// Configure opening hours for weekdays.
const weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
]

for (const day of weekdays) {
  scheduler.setOpeningHours(day, '09:00', '17:00')
}

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
    // Check whether the date is a Swedish workday.
    const year = Number(date.slice(0, 4))
    const holidayCalendar = year === new Date().getFullYear()
      ? calendar
      : new HolidayCalendar(year)

    if (!holidayCalendar.isWorkday(date)) {
      console.log('Bookings are only allowed on Swedish workdays.')
      return
    }

    // Create the booking using BookingScheduler.
    scheduler.addBooking(date, startTime, duration)

    const bookings = scheduler.getBookings()
    const booking = bookings[bookings.length - 1]

    console.log(`Booking created successfully! ID: ${booking.id}`)
  } catch (error) {
    console.log(`Booking failed: ${error.message}`)
  }
}

/**
 * Displays all existing bookings.
 */
function viewBookings() {
  const bookings = scheduler.getBookings()

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

main().catch(error => {
  console.error(error.message)
  rl.close()
})
