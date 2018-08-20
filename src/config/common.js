export function twoIntegers (num) {
  return num > 9 ? num : `0${num}`
}

// 添加类名
export function addClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  if (reg.test(el.className)) {
    return
  }
  el.className += ' ' + className
}

// 把一个数组平均分割成n个数组块
export function arrayChunk (arr, n) {
  let newArr = []
  for (let i = 0, len = arr.length; i < len; i += len / n) {
    let j = i + len / n
    newArr.push(arr.slice(i, j))
  }
  return newArr
}

// 把一个数组按照1,2,3个元素分别分割成若干个数组块
// export function arrayIncrementChunk (arr) {
//   let newArr = []
//   for (let i = 0; i < arr.length; 2 * i + 1) {
//     newArr.push(arr.slice(i, 2 * i + 1))
//   }
//   return newArr
// }
