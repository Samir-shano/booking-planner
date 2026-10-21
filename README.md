 
# Booking Planner

## Project Overview

Booking Planner is a command-line application built with JavaScript and Node.js. It allows users to manage bookings while ensuring that bookings can only be made on Swedish workdays.

The application integrates two independently developed JavaScript modules:

- **booking-scheduler:** Manages bookings, opening hours, cancellations, rescheduling, and available time slots.
- **js-cli-template:** Provides the `HolidayCalendar` class, which determines whether a date is a Swedish workday or holiday.

The project follows the Model-View-Controller (MVC) architectural pattern.

## Features

The application provides the following functionality:

1. Create a booking on a Swedish workday.
2. View existing bookings.
3. Cancel an existing booking.
4. Reschedule an existing booking.
5. View available booking slots.
6. Check whether a date is a Swedish workday.

Bookings are restricted to Monday through Friday, between 09:00 and 17:00, excluding Swedish public holidays.

## Architecture

The application follows the MVC pattern to separate responsibilities.

- **Model (`src/models/BookingModel.js`):** Integrates the booking scheduler and holiday calendar and handles booking operations and workday validation.
- **View (`src/views/BookingView.js`):** Handles the terminal interface, user input, and displayed messages.
- **Controller (`src/controllers/BookingController.js`):** Processes user input and coordinates interactions between the model and view.
- **Entry point (`src/index.js`):** Initializes the MVC components and starts the application.

## Requirements

- Node.js with ES module support
- npm
- Git

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

The application displays an interactive menu where users can create, view, cancel, and reschedule bookings, check available slots, and verify Swedish workdays.

Follow the terminal prompts to use the application. Select `0` to exit.

## Testing

The application uses Node.js built-in test runner for automated testing.

Run the tests:

```bash
npm test
```

The automated tests cover booking creation, weekend and public holiday restrictions, cancellation, rescheduling, and available booking slots.

Manual testing can be performed using `npm start`.

## Dependencies

- [booking-scheduler](https://github.com/Samir-shano/booking-scheduler)
- [js-cli-template (HolidayCalendar)](https://github.com/ellalovisaj/1dv610-laboration-2)

## Limitations

- Bookings are stored in memory and are not persisted between application sessions.
- The application provides a terminal-based interface only.
- Opening hours are currently fixed to 09:00–17:00 on weekdays.
