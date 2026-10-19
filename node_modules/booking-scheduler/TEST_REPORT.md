# Test Report

<!--
    Commit this file to the root of your GitHub repository, alongside your module's code.
-->

## Summary

I tested the module using both manual and automated tests.

During development, I manually tested the module by running the program and checking the output in the terminal. I tested different booking times, dates, durations, overlapping bookings, cancellations, rescheduling, opening hours and available time slots.

I also created automated tests using Node.js's built-in test runner (`node:test`) together with the `assert` module. I chose automated tests because they make it easy to check that the module still works correctly after changes to the code.

The automated tests are located in the `test` directory. They can be run from the root of the project with:

`npm test`

The final test run contained 17 automated tests, and all 17 tests passed.

## Test Results

| What was tested | How it was tested | Result |
| ---------------- | ------------------ | ------- |
| Booking end time calculation | Automated test: created a booking at `10:00` with a duration of 60 minutes and checked that the end time was `11:00`. | ✅ Passed |
| Valid booking time | Automated test: tested `10:00` and checked that it was accepted as a valid time. | ✅ Passed |
| Invalid booking time | Automated test: tested `27:80` and checked that it was rejected. | ✅ Passed |
| Valid booking date | Automated test: tested `2026-09-28` and checked that it was accepted. | ✅ Passed |
| Invalid booking date | Automated test: tested the impossible date `2026-02-31` and checked that it was rejected. | ✅ Passed |
| Valid booking duration | Automated test: tested a duration of 60 minutes and checked that it was accepted. | ✅ Passed |
| Invalid booking duration | Automated test: tested a duration of -30 minutes and checked that it was rejected. | ✅ Passed |
| Adding a booking | Automated test: added a valid booking and checked that it was stored in the scheduler. | ✅ Passed |
| Overlapping bookings | Automated test: added a booking at `10:00` and attempted to add another overlapping booking at `10:30`. | ✅ Passed |
| Cancelling an existing booking | Automated test: added a booking, cancelled it using its ID and checked that it was removed. | ✅ Passed |
| Cancelling a non-existing booking | Automated test: attempted to cancel booking ID `99` and checked that the method returned `false`. | ✅ Passed |
| Rescheduling a booking | Automated test: added a booking at `10:00`, rescheduled it to `11:00` and checked the new start time. | ✅ Passed |
| Available booking slots | Automated test: booked `10:00` and checked that `09:00` and `11:00` were available while `10:00` was excluded. | ✅ Passed |
| Zero duration for available slots | Automated test: called `getAvailableSlots()` with a duration of `0` and checked that an `Invalid booking duration` error was thrown. | ✅ Passed |
| Booking within opening hours | Automated test: tested a 60-minute booking at `10:00` with opening hours `08:00–17:00`. | ✅ Passed |
| Booking before opening hours | Automated test: tested a booking at `07:00` when opening time was `08:00` and checked that it was rejected. | ✅ Passed |
| Booking ending after closing hours | Automated test: tested a 60-minute booking at `16:30` when closing time was `17:00` and checked that it was rejected. | ✅ Passed |
| Booking functionality during development | Manual testing in `src/index.js`: created bookings with different dates, times and durations and inspected the terminal output. | ✅ Worked as expected |
| Cancellation and booking IDs during development | Manual testing in `src/index.js`: created bookings, inspected their IDs and tested cancelling bookings. | ✅ Worked as expected |
| Rescheduling during development | Manual testing in `src/index.js`: changed the date/time of existing bookings and inspected the result in the terminal. | ✅ Worked as expected |
| Opening hours during development | Manual testing in `src/index.js`: attempted bookings inside and outside the configured opening hours. | ✅ Worked as expected |
| Available slots during development | Manual testing in `src/index.js`: generated available time slots and checked that already booked times were excluded. | ✅ Worked as expected |