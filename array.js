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

const filterArray = array => {
  let results = []
  console.log(array)
  for (let i = 0; i < array.length; i++) {
    if (array[i] >= 5) {
      results.push(array[i])
    }
  }
  return results
}

// You are given an array containing positive and negative integers.
// Write an algorithm which will find the largest sum in a continuous sequence.

const largestSum = array => {
  let result = 0
  let maxResult = 0
  for (let i = 0; i < array.length; i++) {
    result += array[i]
    if (maxResult < result) maxResult = result
    else if (result < 0) result = 0
  }
  return maxResult
}

// Input: [4,6,-3,5,-2,1]
// Output: 12

// Imagine you have two arrays which have already been sorted.
// Write an algorithm to merge the two arrays into a single array,
// which should also be sorted.

// Input:[1, 3, 6, 8, 11] and [2, 3, 5, 8, 9, 10]
// Output:[1, 2, 3, 3, 5, 6, 8, 8, 9, 10, 11]

// const mergeArr = (arr1, arr2) => {
//   let arr3 = arr1.concat(arr2)
//   return arr3.sort((a, b) => a - b)
// }

// **Without sort and concat**
const mergeArr = (arr1, arr2) => {
  let results = []
  let currentPos = {
    arr1: 0,
    arr2: 0
  }
  while (currentPos.arr1 < arr1.length || currentPos.arr2 < arr2.length) {
    if (typeof arr1[currentPos.arr1] === 'undefined') {
      results.push(arr2[currentPos.arr2++])
    } else if (arr1[currentPos.arr1] > arr2[currentPos.arr2]) {
      results.push(arr2[currentPos.arr2++])
    } else {
      results.push(arr1[currentPos.arr1++])
    }
  }
  return results
}

// Write an algorithm that deletes given characters from a string.
// For example, given a string of "Battle of the Vowels: Hawaii vs. Grozny"
// and characters to be removed are "aeiou", the algorithm should transform
//  the original string to "Bttl f th Vwls: Hw vs. Grzny". Do not use
//  Javascript's filter, split, or join methods.

// Input:'Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'
// Output: 'Bttl f th Vwls: Hw vs. Grzny'

const deleteChars = (input, separator) => {
  let stringArray = ['']
  let j = 0
  for (let i = 0; i < input.length; i++) {
    if (input.charAt(i) == separator) {
      stringArray.push('')
    } else {
      stringArray[j] += input.charAt(i)
    }
    result.push(product / araryOfNums[i])
  }
  return stringArray.join('')
}

function rotate(s1, s2) {
  if (s1.length !== s2.length) {
    return false
  }
  return (s1 + s2).includes(s2)
}

function main() {
  Array.SIZE_RATIO = 3
  let arr = new Array()
  console.log(deleteChars('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'))
}

main()
