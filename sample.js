#!/usr/bin/env node

"user strict";



import pkg from "minimist";

//console.log(process.argv);

const args = pkg(process.argv.slice(2))
console.log(args)