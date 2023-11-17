const fs = require("fs");
fs.readFile("test-file.txt", () => {
  console.log("reading i/o finished");
  console.log("----------------------------------");
  setTimeout(() => {
    console.log("timer3 finished");
  }, 3000); //phase 1
  setImmediate(() => {
    console.log("immediate2 finished");
  }); //phase 2
    // but inside this call back this is executed first even before setTimeout 0because after entering into the i/o poll phase (reading file here) it will waits in the same face until the next timeout expiry to start the cycle agin but here because the immediate is called after i/o (reading file) the "SETIMMEDIATE" takes the priority ove set timeout because it ii the next phase after I/O
    setTimeout(() => {
    console.log("timer2 finished");
    }, 0); //phase 1
    process.nextTick(() => console.log('im am the mvp here')) // this is the micro task which will executed immediately after every phase hence this will take more priority than setImmediate
}); //phase 3
setImmediate(() => {
  console.log("immediate1 finished");
}); //phase 2
setTimeout(() => {
  console.log("timer1 finished");
}, 0); //phase 1
console.log("hi from top level code"); //top level outside event loop
