# Test Report – Booking Planner

## 1. Introduction

This report documents the testing performed on Booking Planner, a command-line application developed using JavaScript and Node.js.

The application integrates two independently developed modules:

- `booking-scheduler` – manages bookings, opening hours, cancellations, rescheduling, and available time slots.
- `js-cli-template` – provides the `HolidayCalendar` class for checking Swedish workdays and public holidays.

The purpose of testing is to verify that the application meets its functional requirements and that the two modules work correctly together.

## 2. Test Environment

- **Runtime:** Node.js v24.22.0
- **Test framework:** Node.js built-in test runner (`node:test`)
- **Operating system:** macOS
- **Application type:** Command-line application
- **Automated test file:** `tests/BookingModel.test.js`
- **Automated test command:** `npm test`
- **Manual test command:** `npm start`

## 3. Functional Requirements

The following requirements are defined in the application's `README.md`.

| ID | Requirement |
|---|---|
| FR1 | The user shall be able to create a booking by entering a date, start time, and duration. |
| FR2 | The application shall only allow bookings on Swedish workdays. |
| FR3 | The application shall reject bookings outside the configured opening hours. |
| FR4 | The application shall prevent overlapping bookings. |
| FR5 | The user shall be able to view existing bookings. |
| FR6 | The user shall be able to cancel an existing booking. |
| FR7 | The user shall be able to reschedule an existing booking. |
| FR8 | The user shall be able to view available booking slots for a selected date and duration. |
| FR9 | The user shall be able to check whether a date is a Swedish workday. |
| FR10 | The application shall provide an interactive command-line menu. |

## 4. Automated Tests

Automated tests were executed using `npm test`.

| Test ID | Requirement | Test Name | Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| AT-01 | FR1, FR2 | Create a booking on a Swedish workday | 2026-10-20, 10:00, 60 minutes | Booking is created | Booking created successfully | PASS |
| AT-02 | FR2 | Reject weekend booking | 2026-10-25, 10:00, 60 minutes | Booking is rejected | Booking rejected | PASS |
| AT-03 | FR2 | Reject public holiday booking | 2026-12-25, 10:00, 60 minutes | Booking is rejected | Booking rejected | PASS |
| AT-04 | FR6 | Cancel an existing booking | Existing booking | Booking is removed | Booking removed | PASS |
| AT-05 | FR6 | Cancel a non-existing booking | Non-existing booking ID | Returns false | Returned false | PASS |
| AT-06 | FR7 | Reschedule an existing booking | Existing booking and valid new date/time | Booking is updated | Booking updated | PASS |
| AT-07 | FR2, FR7 | Reject rescheduling to a weekend | Existing booking, weekend date | Rescheduling is rejected | Rescheduling rejected | PASS |
| AT-08 | FR8 | Retrieve available slots on a workday | 2026-10-20, 60 minutes | Available time slots are returned | Eight slots returned | PASS |
| AT-09 | FR2, FR8 | Retrieve available slots on a weekend | 2026-10-25, 60 minutes | No available slots | Empty array returned | PASS |

**Automated test results:** 9 passed, 0 failed.

## 5. Manual Tests

Manual testing was performed by starting the application with `npm start` and interacting with the terminal interface.

| Test ID | Requirement | Test Name | Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| MT-01 | FR10 | Start application | `npm start` | Interactive menu appears | Menu displayed with options 0–6 | PASS |
| MT-02 | FR1 | Create a booking | 2026-10-20, 10:00, 60 minutes | Booking created | Booking ID 1 created | PASS |
| MT-03 | FR5 | View existing bookings | Menu option 2 after creating booking ID 1 | Booking details displayed | ID, date, time, and duration displayed | PASS |
| MT-04 | FR8 | View available slots after booking | 2026-10-20, 60 minutes | Booked time 10:00 is unavailable | 10:00 excluded from available slots | PASS |
| MT-05 | FR6 | Cancel a booking | Booking ID 1 | Booking cancelled | Booking cancelled successfully | PASS |
| MT-06 | FR8 | View available slots after cancellation | 2026-10-20, 60 minutes | 10:00 becomes available again | 10:00 included in available slots | PASS |
| MT-07 | FR2 | Reject Sunday booking | 2026-10-25, 10:00, 60 minutes | Booking rejected | Booking rejected | PASS |
| MT-08 | FR2 | Reject Christmas booking | 2026-12-25, 10:00, 60 minutes | Booking rejected | Booking rejected | PASS |
| MT-09 | FR10 | Exit application | Menu option 0 | Application exits | Goodbye message displayed and application closed | PASS |
| MT-10 | FR7 | Reschedule booking | Booking ID 1, 2026-10-20, 11:00, 60 minutes | Booking updated to 11:00 | Booking rescheduled and displayed at 11:00 | PASS |
| MT-11 | FR9 | Check Swedish public holiday | Menu option 6, 2026-12-25 | Date identified as a non-workday | Application displayed that the date is not a Swedish workday | PASS |

**Documented manual test results:** 11 passed, 0 failed.

## 6. Additional Test Cases

The following test cases are included to document remaining verification work. They have not yet been executed as part of the documented manual testing.

| Test ID | Requirement | Test Name | Input | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|---|
| MT-12 | FR3 | Reject booking outside opening hours | 2026-10-20, 18:00, 60 minutes | Booking is rejected | Not tested | NOT RUN |
| MT-13 | FR4 | Reject overlapping bookings | Create two bookings for 2026-10-20 at 10:00, 60 minutes each | Second booking is rejected | Not tested | NOT RUN |

These test cases should be executed to verify the remaining functional requirements.

## 7. Requirements Traceability

This table connects every functional requirement to at least one documented test case.

| Requirement | Test Cases | Verification Status |
|---|---|---|
| FR1 – Create booking | AT-01, MT-02 | PASS |
| FR2 – Swedish workdays only | AT-01, AT-02, AT-03, AT-07, AT-09, MT-07, MT-08 | PASS |
| FR3 – Opening hours validation | MT-12 | NOT RUN |
| FR4 – Prevent overlapping bookings | MT-13 | NOT RUN |
| FR5 – View bookings | MT-03 | PASS |
| FR6 – Cancel booking | AT-04, AT-05, MT-05 | PASS |
| FR7 – Reschedule booking | AT-06, AT-07, MT-10 | PASS |
| FR8 – View available slots | AT-08, AT-09, MT-04, MT-06 | PASS |
| FR9 – Check workday | MT-11 | PASS |
| FR10 – Interactive menu | MT-01, MT-09 | PASS |

All ten functional requirements have at least one documented test case. Eight requirements have passed their documented tests, while FR3 and FR4 require additional verification.

## 8. Integration Testing

Booking Planner integrates two independently developed JavaScript modules.

The `booking-scheduler` module handles booking creation, cancellation, rescheduling, and available time slots. The `HolidayCalendar` class from `js-cli-template` determines whether a date is a Swedish workday.

Integration was verified through the following scenarios:

- Creating a booking on a valid Swedish workday.
- Rejecting bookings on weekends.
- Rejecting bookings on Swedish public holidays.
- Retrieving available booking slots.
- Confirming that an occupied time slot is excluded from available slots.
- Confirming that a cancelled booking releases its previously occupied time slot.
- Checking whether Christmas Day is a Swedish workday.

The results indicate that the tested integration between the two modules works as expected.

## 9. Issues in the Other Student's Module

No issues were identified in the `HolidayCalendar` functionality exercised during integration testing.

The module correctly handled the tested Swedish workdays, weekends, and public holidays.

However, not all possible dates or edge cases were tested. Therefore, these results do not guarantee that the module is free from defects.

## 10. Known Limitations

- Bookings are stored in memory and disappear when the application is restarted.
- Opening hours are fixed to 09:00–17:00, Monday through Friday.
- The application has no graphical user interface.
- Automated tests primarily cover the model and do not directly test terminal input and output.
- Additional automated tests for invalid inputs and overlapping bookings would improve coverage.

## 11. Conclusion

All nine automated tests passed successfully.

The documented manual testing also confirmed that booking creation, viewing, cancellation, rescheduling, available slots, workday validation, and terminal navigation function as expected.

Two additional test cases have been documented but not yet executed: booking outside opening hours and overlapping bookings.

Overall, the results show that the tested functionality works correctly and that the two independently developed modules can be integrated successfully into Booking Planner.