# Booking Planner

## Project Overview

Booking Planner is a command-line application built with JavaScript and Node.js. It allows users to manage bookings while ensuring that bookings can only be made on Swedish workdays.

The application integrates two independently developed JavaScript modules:

- **booking-scheduler:** Manages bookings, opening hours, cancellations, rescheduling, and available time slots.
- **js-cli-template:** Provides the `HolidayCalendar` class, which determines whether a date is a Swedish workday or holiday.

The project follows the Model-View-Controller (MVC) architectural pattern.

## Vision

The vision of Booking Planner is to provide a simple and reliable way for users to manage appointments through a command-line interface.

The application aims to prevent invalid bookings by considering opening hours, existing reservations, and Swedish public holidays.

By integrating two reusable JavaScript modules, the project also demonstrates how independently developed software components can work together to create a functional application.

## Features

The application provides the following functionality:

1. Create a booking on a Swedish workday.
2. View existing bookings.
3. Cancel an existing booking.
4. Reschedule an existing booking.
5. View available booking slots.
6. Check whether a date is a Swedish workday.

Bookings are restricted to Monday through Friday, between 09:00 and 17:00, excluding Swedish public holidays.

## Functional Requirements

- **FR1:** The user shall be able to create a booking by entering a date, start time, and duration.
- **FR2:** The application shall only allow bookings on Swedish workdays.
- **FR3:** The application shall reject bookings outside the configured opening hours.
- **FR4:** The application shall prevent overlapping bookings.
- **FR5:** The user shall be able to view existing bookings.
- **FR6:** The user shall be able to cancel an existing booking.
- **FR7:** The user shall be able to reschedule an existing booking.
- **FR8:** The user shall be able to view available booking slots for a selected date and duration.
- **FR9:** The user shall be able to check whether a date is a Swedish workday.
- **FR10:** The application shall provide an interactive command-line menu.

## Architecture

The application follows the MVC pattern to separate responsibilities.

- **Model (`src/models/BookingModel.js`):** Integrates the booking scheduler and holiday calendar and handles booking operations and workday validation.
- **View (`src/views/BookingView.js`):** Handles the terminal interface, user input, and displayed messages.
- **Controller (`src/controllers/BookingController.js`):** Processes user input and coordinates interactions between the model and view.
- **Entry point (`src/index.js`):** Initializes the MVC components and starts the application.

## Technical Requirements

To install and run the application, the following tools are required:

- Node.js with ES module support
- npm
- Git (for cloning the repository)

## Installation

Clone the repository:

```bash
git clone https://github.com/Samir-shano/booking-planner.git
```

Navigate to the project directory:

```bash
cd booking-planner
```

Install dependencies:

```bash
npm install
```

## Usage

Start the application:

```bash
npm start
```

The application displays an interactive menu:

```text
=== Booking Planner ===
1. Create Booking
2. View Bookings
3. Cancel booking
4. Reschedule booking
5. View available slots
6. Check workday
0. Exit
```

Users can create, view, cancel, and reschedule bookings, check available slots, and verify Swedish workdays.

Follow the terminal prompts to use the application. Select `0` to exit.

### Example

A user can create a booking by entering:

```text
Choose an option: 1
Enter date (YYYY-MM-DD): 2026-10-20
Enter start time (HH:MM): 10:00
Enter duration (minutes): 60
Booking created successfully! ID: 1
```

The booking can then be viewed, rescheduled, or cancelled using the menu.

## Testing

The application uses Node.js built-in test runner for automated testing.

Run the tests:

```bash
npm test
```

The automated tests cover:

- Creating bookings on Swedish workdays.
- Rejecting bookings on weekends.
- Rejecting bookings on Swedish public holidays.
- Cancelling existing bookings.
- Handling cancellation of non-existing bookings.
- Rescheduling bookings.
- Rejecting rescheduling to weekends.
- Displaying available booking slots.
- Returning no available slots on weekends.

The application currently contains nine automated tests, all of which passed during development.

Manual testing can be performed using:

```bash
npm start
```

The full test documentation is available in [TEST_REPORT.md](TEST_REPORT.md).

## Dependencies

The application uses two independently developed JavaScript modules:

- [booking-scheduler](https://github.com/Samir-shano/booking-scheduler) — My reusable booking management module from Laboratory 2.
- [js-cli-template (HolidayCalendar)](https://github.com/ellalovisaj/1dv610-laboration-2) — Another student's module for checking Swedish workdays and public holidays.

## Limitations

- Bookings are stored in memory and are not persisted between application sessions.
- The application provides a terminal-based interface only.
- Opening hours are currently fixed to 09:00–17:00 on weekdays.
- The application does not currently support user accounts or authentication.

## Future Improvements

Possible future improvements include:

- Adding persistent storage for bookings.
- Developing a graphical user interface.
- Improving input validation and error messages.
- Expanding automated test coverage.
- Allowing opening hours to be configured by the user.