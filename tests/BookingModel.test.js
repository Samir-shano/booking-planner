
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
