/* eslint-disable */

// https://blog.logrocket.com/understanding-infer-typescript/
/******************************** infer ********************************/

// function describePerson(person: {
//     name: string;
//     age: number;
//     hobbies: [string, string]; // tuple
// }) {
//     return `${person.name} is ${person.age} years old and loves ${person.hobbies.join(" and  ")}.`;
// }
//
// const alex = {
//     name: 'Alex',
//     age: 20,
//     hobbies: ['walking', 'cooking']
// }
//
// describePerson(alex) // Type string[] is not assignable to type [string, string
//
// type GetFirstArgumentOfAnyFunction<T> = T extends (first: infer FirstArgument, ...args: any[]) => any
//     ? FirstArgument
//     : never;
//
// const alex2: GetFirstArgumentOfAnyFunction<typeof describePerson> = {
//     name: "Alex",
//     age: 20,
//     hobbies: ["walking", "cooking"],
// };
//
// describePerson(alex2);

/******************************** infer ********************************/

/******************************** The extends keyword ********************************/

// type StringFromType<T> = T extends string ? 'string' : never
// type lorem = StringFromType<'lorem ipsum'> // 'string'
// type ten = StringFromType<10> // never

type StringFromType<T> = T extends string
  ? 'string'
  : T extends boolean
    ? 'boolean'
    : T extends Error
      ? 'error'
      : never
type lorem = StringFromType<'lorem ipsum'> // 'string'
type isActive = StringFromType<false> // 'boolean'
type unassignable = StringFromType<TypeError> // 'error'

/******************************** The extends keyword ********************************/

/******************************** Conditional types and unions ********************************/
type NullableString = string | null | undefined
type NonNullable<T> = T extends null | undefined ? never : T
type CondUnionType = NonNullable<NullableString> // evalutes to `string`
// string | never => string
// string ∪ ∅ => string
// string | any => any
// string ∪ U => any

type stringLoop = string extends null | undefined ? never : string // string
type nullLoop = null extends null | undefined ? never : null // never
type undefinedLoop = undefined extends null | undefined ? never : undefined // never
type ReturnUnion = stringLoop | nullLoop | undefinedLoop // string
// string ∪ ∅ ∪ ∅ => string

type Extract<T, U> = T extends U ? T : never
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'> // "a"
type T1 = Extract<'a' | 'b' | 'c', 'a' | 'f' | 'c'> // "a" | "c"
/******************************** Conditional types and unions ********************************/

/**
 * infer 关键字是对条件类型的补充，不能在 extends 子句之外使用。
 * 在条件类型中，infer 用于在约束中声明一个类型变量，以便在条件类型的 extends 子句中动态捕获类型。
 *
 * 它首先通过检查类型参数 (T) 是否是一个函数，在检查过程中，
 * 将返回类型赋值为一个变量 infer R，如果检查通过，就返回这个变量。
 *
 * 这主要用于访问和使用无法直接获取的类型。
 */
type a = ReturnType<() => void> // void
type b = ReturnType<() => string | number> // string | number
type c = ReturnType<() => any> // any

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any

type ExtractStringType<T> = T extends `${infer U}` ? U : never
type ActualString = ExtractStringType<'cicada'> // 'cicada'
