

declare module "formidable/src/helpers/firstValues.js" {
    // https://stackoverflow.com/a/51114250/14512702
    import { IncomingForm, Fields, Files, File } from 'formidable'
    // export function firstValues <T = Fields | Files>(input: IncomingForm, fields: T, exceptions?: string[]): Record<string, T extends Fields ? string : File>;
    export function firstValues <T = Fields | Files>(input: IncomingForm, fields: T, exceptions?: string[]): Record<string, T[keyof T]>;
}