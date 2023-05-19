#!/usr/bin/env node
const { proxy, gen } = require('./index.js');
const cpath = './config.json';
switch(process.argv[2]){
case 'go': proxy(cpath); break;
case 'gen': gen(cpath); break;
default: 
console.log(
`Usage: cfproxy <option>

Options:
  gen 		generate the config
  go 		start a socks5 proxy server

cfproxy v0.0.1
Copyright (c) 2023 DNetL <DNetL@pm.me>;
Join our group: https://t.me/DNetLab
Report cfproxy translation bugs to <https://github.com/DNetL/cfproxy/issues>`);
}