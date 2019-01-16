const m = require('./memory')
const memory = new m()

class Array {
  constructor() {
    this.length = 0
    this.capacity = 10
    this.ptr = memory.allocate(this.capacity)
  }
  _resize(size) {
    const oldPtr = this.ptr
    this.ptr = memory.allocate(size)
    if (this.ptr === null) {
      throw new Error('Out of memory')
    }
    memory.copy(this.ptr, oldPtr, this.length)
    memory.free(oldPtr)
    this.capacity = size
  }

  push(item) {
    if (this.length >= this.capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO)
    }
    memory.set(this.ptr + this.length, item)
    this.length++
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error')
    }
    return memory.get(this.ptr + index)
  }
  pop() {
    if (this.length == 0) {
      throw new Error('Index error')
    }
    const value = memory.get(this.ptr + this.length - 1)
    this.length--
    return value
  }
}

Array.SIZE_RATIO = 3

const URLify = string => {
  //replace space with %20
  let strArr = string.split('')
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i] === ' ') {
      strArr[i] = '%20'
    }
  }

  return strArr.join('')
}

const filterArray = string => {
  let strArr = string.split(',')
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i] < 5) {
      strArr.splice(i, 1)
      //confused on why this isnt working
    }
  }
  return strArr.join('')
}

function main() {
  Array.SIZE_RATIO = 3
  let arr = new Array()
  arr.push('3')
  // filterArray('1,4,5,67,7,8,10')
  console.log(filterArray('1, 4, 5, 67, 7, 8, 10'))
}

main()
