# Booking Scheduler

Booking Scheduler is a reusable JavaScript module for managing bookings and available time slots.

The module can be used as the booking logic for different types of applications, such as a car workshop, hair salon, meeting room system, or other applications that need time-based bookings.

## Features

The module supports:

- Adding bookings
- Cancelling bookings
- Rescheduling bookings
- Checking if a time is available
- Setting opening hours
- Checking bookings against opening hours
- Finding available time slots
- Preventing overlapping bookings
- Validating dates, times, and booking durations
- Unique booking IDs

## Requirements

- Node.js
- JavaScript with ES modules

The module has been developed and tested with Node.js v24.7.0.

No external runtime dependencies are required.

## Installation

Clone the repository:

```bash
git clone git@github.com:Samir-shano/booking-scheduler.git
```

Enter the project directory:

```bash
cd booking-scheduler
```

Install the project:

```bash
npm install
```

## Usage

Import `BookingScheduler` from the module:

```js
import { BookingScheduler } from './src/index.js'

const scheduler = new BookingScheduler()
```

### Set opening hours

Opening hours are configured using the weekday name, opening time, and closing time.

```js
scheduler.setOpeningHours('Monday', '08:00', '17:00')
```

### Add a booking

A booking requires a date, start time, and duration in minutes.

```js
scheduler.addBooking('2026-09-28', '10:00', 60)
```

### Get all bookings

```js
console.log(scheduler.getBookings())
```

### Check availability

```js
const available = scheduler.isAvailable(
  '2026-09-28',
  '11:00',
  60
)

console.log(available)
```

### Get available time slots

```js
const slots = scheduler.getAvailableSlots(
  '2026-09-28',
  60
)

console.log(slots)
```

### Cancel a booking

Bookings receive a unique ID when they are created.

```js
const cancelled = scheduler.cancelBooking(1)

console.log(cancelled)
```

### Reschedule a booking

```js
const rescheduled = scheduler.rescheduleBooking(
  1,
  '2026-09-28',
  '13:00',
  60
)

console.log(rescheduled)
```

## Input Formats

Dates should use the following format:

```text
YYYY-MM-DD
```

Example:

```text
2026-09-28
```

Times should use the 24-hour format:

```text
HH:MM
```

Example:

```text
10:30
```

Booking duration is specified in minutes.

Example:

```js
scheduler.addBooking('2026-09-28', '10:30', 60)
```

## Public Interface

The main public interface is the `BookingScheduler` class.

### `setOpeningHours(day, openTime, closeTime)`

Sets opening hours for a weekday.

### `addBooking(date, startTime, duration)`

Adds a new booking if the input is valid, the booking is within opening hours, and the requested time does not overlap another booking.

### `cancelBooking(id)`

Cancels a booking using its booking ID.

Returns `true` if the booking was found and cancelled, otherwise `false`.

### `rescheduleBooking(id, newDate, newStartTime, newDuration)`

Changes the date, time, and duration of an existing booking.

### `isAvailable(date, startTime, duration)`

Checks whether the requested time overlaps an existing booking.

### `getAvailableSlots(date, duration)`

Returns available start times for the specified date and duration based on the configured opening hours and existing bookings.

### `getBookings()`

Returns the current bookings.

## Example

```js
import { BookingScheduler } from './src/index.js'

const scheduler = new BookingScheduler()

scheduler.setOpeningHours('Monday', '08:00', '17:00')

scheduler.addBooking('2026-09-28', '10:00', 60)
scheduler.addBooking('2026-09-28', '13:00', 60)

console.log(scheduler.getBookings())

console.log(
  scheduler.getAvailableSlots('2026-09-28', 60)
)

scheduler.rescheduleBooking(
  1,
  '2026-09-28',
  '11:00',
  60
)

scheduler.cancelBooking(2)
```

## Testing

The module has been tested using both manual and automated testing.

Automated tests use Node.js's built-in `node:test` test runner and the `assert` module.

The tests are located in:

```text
test/
```

Run all automated tests with:

```bash
npm test
```

The current automated test suite contains 16 tests.

See [TEST_REPORT.md](./TEST_REPORT.md) for more information about the tests and their results.

## Project Structure

```text
booking-scheduler/
├── src/
│   ├── Booking.js
│   ├── BookingScheduler.js
│   ├── OpeningHours.js
│   └── index.js
├── test/
│   ├── Booking.test.js
│   ├── BookingScheduler.test.js
│   └── OpeningHours.test.js
├── docs/
│   └── class-diagram.puml
├── README.md
├── TEST_REPORT.md
├── LICENSE
└── package.json
```

`BookingScheduler` is the main interface intended for users of the module. `Booking` and `OpeningHours` contain internal functionality used by the scheduler.

## Error Handling

Invalid booking data can result in errors. Examples include:

- Invalid date
- Invalid time
- Invalid duration
- Booking outside opening hours
- Overlapping booking

Applications using the module can handle these errors with `try...catch`.

Example:

```js
try {
  scheduler.addBooking('2026-09-28', '10:00', 60)
} catch (error) {
  console.error(error.message)
}
```

## Version

Current version: `1.0.0`

## Issues

Problems and suggestions can be reported using the GitHub repository's Issues section.

## Contributing

Contributions can be made by creating a branch, making the changes, and submitting a pull request.

Please make sure that the existing tests still pass after making changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.