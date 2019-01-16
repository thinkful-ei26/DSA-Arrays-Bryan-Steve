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

// const filterArray = array => {
//   let results = []
//   console.log(array)
//   for (let i = 0; i < array.length; i++) {
//     if (array[i] >= 5) {
//       results.push(array[i])
//     }
//   }
//   return results
// }

// You are given an array containing positive and negative integers.
// Write an algorithm which will find the largest sum in a continuous sequence.

// const largestSum = array => {
//   let result = 0
//   let maxResult = 0
//   for (let i = 0; i < array.length; i++) {
//     result += array[i]
//     if (maxResult < result) maxResult = result
//     else if (result < 0) result = 0
//   }
//   return maxResult
// }

// Input: [4,6,-3,5,-2,1]
// Output: 12

// Imagine you have two arrays which have already been sorted.
// Write an algorithm to merge the two arrays into a single array,
// which should also be sorted.

// Input:[1, 3, 6, 8, 11] and [2, 3, 5, 8, 9, 10]
// Output:[1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11]

const mergeArr = (arr1, arr2) => {
  let arr3 = arr1.concat(arr2)
  return arr3.sort((a, b) => a - b)
}

function main() {
  Array.SIZE_RATIO = 3
  let arr = new Array()
  arr.push(3)
  arr.push(5)
  arr.push(15)
  arr.push(19)
  arr.push(45)
  arr.push(10)
  console.log(mergeArr([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]))
}

main()
