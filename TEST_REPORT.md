# Test Report – Booking Planner

## 1. Introduction

This report documents the testing performed on Booking Planner, a command-line application that integrates the `booking-scheduler` and `js-cli-template` modules.

The purpose of testing is to verify that booking operations work correctly and that bookings are restricted to Swedish workdays.

## 2. Test Environment

- Runtime: Node.js v24.22.0
- Test framework: Node.js built-in test runner (`node:test`)
- Operating system: macOS
- Application type: Command-line application
- Automated test file: `tests/BookingModel.test.js`

## 3. Automated Tests

The automated tests were executed using:

`npm test`

| Test ID | Test Description | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| AT-01 | Create a booking on a Swedish workday | Booking is created successfully | Booking created | PASS |
| AT-02 | Create a booking on a weekend | Booking is rejected | Booking rejected | PASS |
| AT-03 | Create a booking on a Swedish public holiday | Booking is rejected | Booking rejected | PASS |
| AT-04 | Cancel an existing booking | Booking is removed | Booking removed | PASS |
| AT-05 | Cancel a non-existing booking | Returns false | Returned false | PASS |
| AT-06 | Reschedule an existing booking | Booking date and time are updated | Booking updated | PASS |
| AT-07 | Reschedule a booking to a weekend | Rescheduling is rejected | Rescheduling rejected | PASS |
| AT-08 | Retrieve available slots on a workday | Available time slots are returned | Eight slots returned | PASS |
| AT-09 | Retrieve available slots on a weekend | No available slots | Empty array returned | PASS |

**Automated test results:** 9 passed, 0 failed.

## 4. Manual Tests

Manual testing was performed by starting the application with `npm start` and interacting with its terminal menu.

| Test ID | Test Description | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| MT-01 | Start the application using `npm start` | Application menu appears | Menu displayed | PASS |
| MT-02 | Create a booking for 2026-10-20 at 10:00 | Booking created | Booking ID 1 created | PASS |
| MT-03 | View existing bookings | Booking details displayed | Correct details displayed | PASS |
| MT-04 | View available slots after creating a booking | 10:00 is unavailable | 10:00 excluded | PASS |
| MT-05 | Cancel booking ID 1 | Booking cancelled | Booking cancelled | PASS |
| MT-06 | View available slots after cancellation | 10:00 is available again | 10:00 included | PASS |
| MT-07 | Attempt to book on a Sunday | Booking rejected | Booking rejected | PASS |
| MT-08 | Attempt to book on Christmas Day | Booking rejected | Booking rejected | PASS |
| MT-09 | Exit the application | Application closes | Application closed | PASS |

**Manual test results:** 9 passed, 0 failed.

## 5. Integration Testing

The application integrates two independently developed modules.

The `booking-scheduler` module manages bookings and available time slots, while `HolidayCalendar` from `js-cli-template` determines whether a date is a Swedish workday.

Integration was verified by creating bookings on valid workdays and rejecting bookings on weekends and Swedish public holidays.

Additional integration testing confirmed that a booked time slot becomes unavailable and becomes available again after cancellation.

## 6. Known Limitations

- Bookings are stored in memory and disappear when the application is restarted.
- Opening hours are fixed to 09:00–17:00, Monday through Friday.
- The application has no graphical interface.
- Automated tests primarily cover the model and do not directly test terminal input and output.

## 7. Conclusion

All nine automated tests and nine documented manual tests passed.

The results indicate that the tested booking operations and workday restrictions function as expected. Additional tests for invalid inputs, overlapping bookings, and other edge cases would improve test coverage.