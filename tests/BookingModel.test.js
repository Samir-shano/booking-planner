
import test from 'node:test'
import assert from 'node:assert/strict'
import { BookingModel } from '../src/models/BookingModel.js'

/**
 * Tests that a booking can be created on a Swedish workday.
 */
test('should create a booking on a Swedish workday', () => {
  const model = new BookingModel()

  const booking = model.createBooking('2026-10-20', '10:00', 60)

  assert.equal(booking.date, '2026-10-20')
  assert.equal(booking.startTime, '10:00')
  assert.equal(booking.duration, 60)
  assert.equal(model.getBookings().length, 1)
})

/**
 * Tests that bookings are rejected on weekends.
 */
test('should reject bookings on weekends', () => {
  const model = new BookingModel()

  assert.throws(
    () => model.createBooking('2026-10-25', '10:00', 60),
    {
      message: 'Bookings are only allowed on Swedish workdays.'
    }
  )

  assert.equal(model.getBookings().length, 0)
})

/**
 * Tests that bookings are rejected on Swedish public holidays.
 */
test('should reject bookings on Swedish public holidays', () => {
  const model = new BookingModel()

  assert.throws(
    () => model.createBooking('2026-12-25', '10:00', 60),
    {
      message: 'Bookings are only allowed on Swedish workdays.'
    }
  )

  assert.equal(model.getBookings().length, 0)
})


/**
 * Tests that an existing booking can be cancelled.
 */
test('should cancel an existing booking', () => {
  const model = new BookingModel()

  const booking = model.createBooking('2026-10-20', '10:00', 60)

  const cancelled = model.cancelBooking(booking.id)

  assert.equal(cancelled, true)
  assert.equal(model.getBookings().length, 0)
})

/**
 * Tests that cancelling a non-existing booking returns false.
 */
test('should return false when cancelling a non-existing booking', () => {
  const model = new BookingModel()

  const cancelled = model.cancelBooking(999)

  assert.equal(cancelled, false)
})
