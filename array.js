const memory = require('./memory')

class Array {
  constructor() {
    this.length = 10
    this.capacity = 10
    this.ptr = memory.allocate(this.length)
    //[][][][][]
  }
  _resize = size => {
    const oldPtr = this.ptr
    this.ptr = memory.allocate(size)
    if (this.ptr === null) {
      throw new Error('Out of memory')
    }
    memory.copy(this.ptr, oldPtr, this.length)
    memory.free(oldPtr)
    this.capacity = size
  }

  push = item => {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO)
    }
    memory.set(this.ptr + this.length, item)
    this.length++
  }

  get = index => {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error')
    }
    return memory.get(this.ptr + index)
  }
  pop = () => {}
}
Array.SIZE_RATIO = 3
