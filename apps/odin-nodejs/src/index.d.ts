declare module 'formidable/src/helpers/firstValues.js' {
  // https://stackoverflow.com/a/51114250/14512702
  import { IncomingForm } from 'formidable'
  export function firstValues<T, U extends keyof T>(
    input: IncomingForm,
    fields: T,
    exceptions?: string[],
  ): Record<U, Extract<T[U], unknown[]> extends (infer Z)[] ? Z : never>
}
