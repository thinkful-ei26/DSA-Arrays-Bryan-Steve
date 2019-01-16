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
  for (var i = 0; i < strArr.length; i++) {
    if (strArr[i] < 5) {
      delete strArr[i]
    }
  }
  return strArr.join('')
}

// Max sum in the array
// You are given an array containing positive and negative integers. Write an algorithm which will find the largest sum in a continuous sequence.

// Input: [4,6,-3,5,-2,1]
// Output: 12

function maxSum(array) {
  let maxSumSoFar = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] + array[i + 1] > maxSumSoFar) {
    }
  }
  return maxSumSoFar
}

// Merge Arrays
// Imagine you have two arrays which have already been sorted. Write an algorithm to merge the two arrays into a single array, which should also be sorted.

// Input:[1, 3, 6, 8, 11] and [2, 3, 5, 8, 9, 10]
// Output:[1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11]

function merge(ar1, ar2) {
  let mergedArr = []
  let i = 0
  let j = 0
  while (i < ar1.length && j < ar2.length) {
    if (ar1[i] <= ar2[i]) {
      mergedArr.push(ar1[i])
      i += 1
    } else {
      mergedArr.push(ar2[j])
      j += 1
    }
  }
  while (i < ar1.length) {
    mergedArr.push(ar1[i])
    i += 1
  }

  while (j < ar2.length) {
    mergedArr.push(ar2[j])
    j += 1
  }

  return mergedArr
}
function main() {
  Array.SIZE_RATIO = 3
  let arr = new Array()
  arr.push('3')
  // maxSum([4, 6, -3, 5, -2, 1])
  console.log(merge([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]))
  // console.log(filterArray('1, 4, 5, 67, 7, 8, 10'))
}

main()
