import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

export class BookingView {
  constructor() {
    this.rl = createInterface({input, output})
  }
}
