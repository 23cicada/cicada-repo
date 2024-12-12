#! /usr/bin/env node
const child_process = require('child_process')
const process = require('process')

const type = process.argv.slice(2)[0]
let command = 'prettier --ignore-unknown '
switch (type) {
    case 'write': command += '--write **/*'; break;
    case 'check': command += '--check **/*'; break;
    // https://github.com/lint-staged/lint-staged?tab=readme-ov-file#using-js-configuration-files
    case 'staged': command += `--write ${process.argv.slice(3)?.join(' ')}`; break;
    default: {
        console.error(`Error: Invalid argument '${type}'.`);
        console.error("Valid arguments are: write, check, staged.");
        process.exit(1)
    }
}
try {
    child_process.execSync(command);
} catch (e) {
    process.exit(1)
}

