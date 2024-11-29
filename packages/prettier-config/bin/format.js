#! /usr/bin/env node
const child_process = require('child_process')
const process = require('process')

console.log('process.argv', process.argv)
const type = process.argv.slice(2)[0]
let command = 'prettier --ignore-unknown --cache-location=.prettiercache '
switch (type) {
    case 'write': command += '--write **/*'; break;
    case 'check': command += '--check **/*'; break;
    case 'staged': command += '--check'; break;
    default: {
        console.error(`Error: Invalid argument '${type}'.`);
        console.error("Valid arguments are: write, check, staged.");
        process.exit(1)
    }
}
try {
    child_process.execSync(command);
} catch (e) {

}

