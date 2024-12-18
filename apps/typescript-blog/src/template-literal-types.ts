// Template Literal Types

type World = "world"

type Greeting = `hello ${World}`

type EmailLocaleIDs = "welcome_email" | "email_heading"
type FooterLocaleIDs = "footer_title" | "footer_sendoff"

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`

type Lang = "en" | "ja" | "pt"

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`

// Inference with Template Literals

// Why use 'string & keyof T'
// https://github.com/microsoft/TypeScript/pull/40336#issue-689531932
// Because keyof T could contain symbol types that cannot be transformed using template literal types.

// Why use 'U extends string & keyof T'?
// https://stackoverflow.com/a/53099153/14512702
// declare function makeWatchedObject<T>(obj: T): {
//   on: (eventName: `${string & keyof T}Changed`, callback: (newValue: T[string & keyof T]) => void) => void
// };

declare function makeWatchedObject<T>(obj: T): {
  on: <U extends string & keyof T>(
    eventName: `${U}Changed`,
    callback: (newValue: T[U]) => void,
  ) => void
} & T

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26,
})

person.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`)
})

person.on("lastNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`)
})

person.on("ageChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`)
})

type ShoutyGreeting = Uppercase<Greeting>
type QuietGreeting = Lowercase<Greeting>
type LowercaseGreeting = Capitalize<QuietGreeting>
type UncomfortableGreeting = Uncapitalize<QuietGreeting>
