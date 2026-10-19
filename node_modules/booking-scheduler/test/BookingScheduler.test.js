import test from 'node:test'
import assert from 'node:assert/strict'
import { BookingScheduler } from '../src/BookingScheduler.js'

test('adds a booking', () => {
  const scheduler = new BookingScheduler()

  scheduler.setOpeningHours('Monday', '08:00', '17:00')

  scheduler.addBooking(
    '2026-09-28',
    '10:00',
    60
  )

  const bookings = scheduler.getBookings()

  assert.equal(bookings.length, 1)
})

test('rejects an overlapping booking', () => {
  const scheduler = new BookingScheduler()

  scheduler.setOpeningHours('Monday', '08:00', '17:00')

  scheduler.addBooking(
    '2026-09-28',
    '10:00',
    60
  )

  assert.throws(() => {
    scheduler.addBooking(
      '2026-09-28',
      '10:30',
      60
    )
  })
})

test('cancels an existing booking', () => {
  const scheduler = new BookingScheduler()

  scheduler.setOpeningHours('Monday', '08:00', '17:00')

  scheduler.addBooking(
    '2026-09-28',
    '10:00',
    60
  )

  const result = scheduler.cancelBooking(1)

  assert.equal(result, true)
  assert.equal(scheduler.getBookings().length, 0)
})

test('returns false when cancelling a booking that does not exist', () => {
  const scheduler = new BookingScheduler()

  const result = scheduler.cancelBooking(99)

  assert.equal(result, false)
})

test('reschedules an existing booking', () => {
  const scheduler = new BookingScheduler()

  scheduler.setOpeningHours('Monday', '08:00', '17:00')

  scheduler.addBooking(
    '2026-09-28',
    '10:00',
    60
  )

  const result = scheduler.rescheduleBooking(
    1,
    '2026-09-28',
    '11:00',
    60
  )

  const bookings = scheduler.getBookings()

  assert.equal(result, true)
  assert.equal(bookings[0].startTime, '11:00')
})

test('returns available booking slots', () => {
  const scheduler = new BookingScheduler()

  scheduler.setOpeningHours('Monday', '08:00', '17:00')

  scheduler.addBooking(
    '2026-09-28',
    '10:00',
    60
  )

  const slots = scheduler.getAvailableSlots(
    '2026-09-28',
    60
  )

  assert.equal(slots.includes('09:00'), true)
  assert.equal(slots.includes('10:00'), false)
  assert.equal(slots.includes('11:00'), true)
})

test('rejects zero duration when getting available slots', () => {
  const scheduler = new BookingScheduler()

  scheduler.setOpeningHours('Monday', '09:00', '17:00')

  assert.throws(
    () => scheduler.getAvailableSlots('2026-09-28', 0),
    /Invalid booking duration/
  )
})