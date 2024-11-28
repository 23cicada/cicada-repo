#! /usr/bin/env node
var child_process = require('child_process');

child_process.execSync('prettier --ignore-unknown --cache-location=.prettiercache --check **/*');

