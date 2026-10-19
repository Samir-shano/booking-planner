import test from 'node:test'
import assert from 'node:assert/strict'
import { Booking } from '../src/Booking.js'

test('calculates the correct end time', () => {
  const booking = new Booking(
    1,
    '2026-09-28',
    '10:00',
    60
  )

  assert.equal(booking.getEndTime(), '11:00')
})

test('validates a correct booking time', () => {
  const booking = new Booking(
    1,
    '2026-09-28',
    '10:00',
    60
  )

  assert.equal(booking.isValidTime(), true)
})

test('rejects an invalid booking time', () => {
  const booking = new Booking(
    1,
    '2026-09-28',
    '27:80',
    60
  )

  assert.equal(booking.isValidTime(), false)
})

test('validates a correct booking date', () => {
  const booking = new Booking(
    1,
    '2026-09-28',
    '10:00',
    60
  )

  assert.equal(booking.isValidDate(), true)
})

test('rejects an invalid booking date', () => {
  const booking = new Booking(
    1,
    '2026-02-31',
    '10:00',
    60
  )

  assert.equal(booking.isValidDate(), false)
})

test('validates a correct booking duration', () => {
  const booking = new Booking(
    1,
    '2026-09-28',
    '10:00',
    60
  )

  assert.equal(booking.isValidDuration(), true)
})

test('rejects an invalid booking duration', () => {
  const booking = new Booking(
    1,
    '2026-09-28',
    '10:00',
    -30
  )

  assert.equal(booking.isValidDuration(), false)
})