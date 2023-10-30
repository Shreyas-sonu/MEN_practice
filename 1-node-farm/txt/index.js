const fs = require('fs');

const read = fs.readFileSync('./txt/start.txt', 'utf-8');
const write = `${read}\nnew line`;
fs.writeFileSync('./txt/start.txt', write, 'utf-8');
const readNow = fs.readFileSync("./txt/start.txt", "utf-8");
console.log(readNow);
