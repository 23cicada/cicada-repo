// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#global-augmentation
declare global {
  interface Array<T> {
    myReduce<U>(
      callbackFn: (
        previousValue: U,
        currentValue: T,
        currentIndex: number,
        array: T[],
      ) => U,
      initialValue?: U,
    ): U
  }
}

// Array.prototype.myReduce = function (callbackFn, initialValue) {
//   let previousValue = initialValue
//   return this.map((...args) => {
//     previousValue = {
//       callbackFn(previousValue, ...args),
//       previousValue
//     }
//   })
// };
