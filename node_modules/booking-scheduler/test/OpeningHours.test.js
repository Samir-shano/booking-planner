import test from 'node:test'
import assert from 'node:assert/strict'
import { OpeningHours } from '../src/OpeningHours.js'

test('accepts a booking within opening hours', () => {
  const openingHours = new OpeningHours(
    'Monday',
    '08:00',
    '17:00'
  )

  assert.equal(
    openingHours.isWithinOpeningHours('10:00', 60),
    true
  )
})

test('rejects a booking before opening hours', () => {
  const openingHours = new OpeningHours(
    'Monday',
    '08:00',
    '17:00'
  )

  assert.equal(
    openingHours.isWithinOpeningHours('07:00', 60),
    false
  )
})

test('rejects a booking that ends after closing hours', () => {
  const openingHours = new OpeningHours(
    'Monday',
    '08:00',
    '17:00'
  )

  assert.equal(
    openingHours.isWithinOpeningHours('16:30', 60),
    false
  )
})