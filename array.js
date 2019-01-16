const memory = require('./memory')

class Array {
  constructor() {
    this.length = 10
    this.ptr = memory.allocate(this.length)
  }
  _resize = () => {}
  push = item => {
    this._resize()
    memory.set(this.ptr + this.length, item)
  }
  pop = () => {}
}
