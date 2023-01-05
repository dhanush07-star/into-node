#!/usr/bin/env node

"user strict";


console.log("***********hi! there**************");


//console.log(process.argv);
//[ '/usr/bin/node', '/home/dhanush/Desktop/nodejs/index.js' ]

//console.log(process.argv.slice(2));
// ./index.js --hello=world -c9
//[ '--hello=world', '-c9' ]


// var args = require("minimist")(process.argv.slice(2));
// console.log(args);
//terminal:$ ./index.js --hello=world -c9
//output : { _: [], hello: 'world', c: 9 }


//_ means overflow,MINIMIST buffer for unkown args 
// var args = require("minimist")(process.argv.slice(2));
// console.log(args);
//terminal:$ ./index.js --hello=world -c9 - foobar
//output : { _: [], hello: 'world', c: 9 }


//we can control the args by overriding 
// var args = require("minimist")(process.argv.slice(2),{
//     boolean:["help"],
//     string:["file"]
// });
// console.log(args);
//terminal: ./index.js --help=foobar --file
//output : { _: [], help: true, file: '' }



//this code looks up on the command and if it finds a help then return a guide, file means file or if dosnet find any it just returns an error 
// var args = require("minimist")(process.argv.slice(2),{
//     boolean:["help"],
//     string:["file"]
// });


// if(args.help){
//     printHelp();
// }else if (args.file){
//     console.log(args.file)
// }else{
//     error("incorrect usage.",true);
// }


// var path = require("path")
// var fs = require("fs")
// var args = require("minimist")(process.argv.slice(2),{
//     boolean:["help"],
//     string:["file"]
// });


// if(args.help){
//     printHelp();
// }else if (args.file){
//     processFile(path.resolve(args.file));
// }else{
//     error("incorrect usage.",true);
// }


//async way of filesystem
import util from "util";
import getStdin from "get-stdin";
import { resolve } from "path";
import { readFile } from "fs";
import pkg from "minimist";

var args = pkg(process.argv.slice(2),{
    boolean:["help","in"],
    string:["file"]
});

//console.log("args: ",args)

var BASE_PATH = resolve(process.env.BASE_PATH || __dirname);

if(args.help){
    printHelp();
}else if(args.in || args._.includes("-") ){
    getStdin().then(processFile).catch(error);

}else if (args.file){
    readFile(resolve(BASE_PATH,args.file),(err,contents)=>{
        if(err){
            console.log(err.toString());
        }else{
            processFile(contents.toString());
        }
    });
}else{
    error("incorrect usage.",true);
}


//************************************************ */



// function processFile(filePath){
//     var contents = readFile(filePath,(err,contents)=>{
//         if(err){
//             console.log(err.toString());
//         }else{
//             console.log(contents.toString()) 
//         }
//     });
//     //var contents = fs.readFileSync(filePath);
//     //var contents = fs.readFileSync(filePath,"utf8"); //slightly less effecient becoz of processed file using encoding.
//     // normal converts buffer stream to string format
//     //process.stdout.write(contents); //prints on console with no /n
//     //console.log(contents) // buffer . brcz fs by default all ways take in buffer. most IO uses buffer
// }

function processFile(info){
 info = info.toUpperCase();
 console.log(info)    
}


function error(msg,includeHelp =false){
    console.log(msg);
    if(includeHelp){
        console.log("");
        printHelp();
    }
}


function printHelp(){
    console.log("index.js usage manual");
    console.log("./index.js --file={FILENAME}");
    console.log("");
    console.log("--help                          will print the helper guide");
    console.log("--file={FILENAME}                          process the file");
    console.log("--in,-                          process stdin");
}