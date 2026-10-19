
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


main().catch(error => {
  console.error(error.message)
  rl.close()
})
