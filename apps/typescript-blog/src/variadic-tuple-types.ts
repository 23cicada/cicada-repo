// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types
// 当泛型展开被实例化（或替换为实际类型）到这些元组类型中时，它们可以生成其他一组数组和元组类型。
function tail<T extends any[]>(arr: readonly [any, ...T]) {
  const [_ignored, ...rest] = arr
  return rest
}
const myTuple = [1, 2, 3, 4] as const
const myArray = ["hello", "world"]
const r1 = tail(myTuple)
const r2 = tail([...myTuple, ...myArray] as const)

type Arr = readonly unknown[]
function concat<T extends Arr, U extends Arr>(arr1: T, arr2: U): [...T, ...U] {
  return [...arr1, ...arr2]
}
const r3 = concat(myTuple, myArray)

// function partialCall(f, ...headArgs) {
//     return (...tailArgs) => f(...headArgs, ...tailArgs);
// }
function partialCall<T extends Arr, U extends Arr, R>(
  f: (...args: [...T, ...U]) => R,
  ...headArgs: T
) {
  return (...tailArgs: U) => f(...headArgs, ...tailArgs)
}

// ---cut---
const foo = (x: string, y: number, z: boolean) => {}

// Argument of type number is not assignable to parameter of type string
// const f1 = partialCall(foo, 100);

// Expected 4 arguments, but got 5
// const f2 = partialCall(foo, "hello", 100, true, "oops");

// This works!
const f3 = partialCall(foo, "hello")
//    ^?

// What can we do with f3 now?

// Works!
f3(123, true)

//  Expected 2 arguments, but got 0
// f3();

//  Argument of type string is not assignable to parameter of type boolean
// f3(123, "hello");

const test: Record<string, string> = {}

const t = test.asdf
