
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

/**
 * Tests that an existing booking can be rescheduled.
 */
test('should reschedule an existing booking', () => {
  const model = new BookingModel()

  const booking = model.createBooking('2026-10-20', '10:00', 60)

  const rescheduled = model.rescheduleBooking(
    booking.id,
    '2026-10-21',
    '13:00',
    60
  )

  assert.equal(rescheduled, true)

  const updatedBooking = model.getBookings()[0]

  assert.equal(updatedBooking.date, '2026-10-21')
  assert.equal(updatedBooking.startTime, '13:00')
  assert.equal(updatedBooking.duration, 60)
})

/**
 * Tests that rescheduling to a weekend is rejected.
 */
test('should reject rescheduling to a weekend', () => {
  const model = new BookingModel()

  const booking = model.createBooking('2026-10-20', '10:00', 60)

  assert.throws(
    () => model.rescheduleBooking(
      booking.id,
      '2026-10-25',
      '13:00',
      60
    ),
    {
      message: 'Bookings are only allowed on Swedish workdays.'
    }
  )

  const originalBooking = model.getBookings()[0]

  assert.equal(originalBooking.date, '2026-10-20')
  assert.equal(originalBooking.startTime, '10:00')
})

/**
 * Tests that available booking slots are returned on a workday.
 */
test('should return available slots on a Swedish workday', () => {
  const model = new BookingModel()

  const slots = model.getAvailableSlots('2026-10-20', 60)

  assert.deepEqual(slots, [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00'
  ])
})