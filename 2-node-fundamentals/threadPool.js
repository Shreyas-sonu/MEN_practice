const crypto = require("crypto");
const start = Date.now();

//? 1 Intro
// // we know there are 4 thread pool available in node js by libuv will demonstrate here with some heavy task
// // thread1
// crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
//     console.log(
//       "Password encrypted in",
//       Date.now() - start,
//       " ms from thread 1"
//     );
// })
// // thread2
// crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
//     console.log('Password encrypted in', Date.now() - start,' ms from thread 2');
// })
// // thread3
// crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
//     console.log(
//       "Password encrypted in",
//       Date.now() - start,
//       " ms from thread 3"
//     );
// })
// // thread4
// crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
//     console.log('Password encrypted in', Date.now() - start,' ms from thread 4');
// })

// so these 4 threads are executed in almost same or negligible time differences

//? 2 to change or thread pool size (Deprecated)

// const fs = require("fs");
// process.env.UV_THREADPOOL_SIZE = 1; // isn't supported anymore in latest node js

// fs.readFile("test-file.txt", () => {
//   crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
//     console.log(
//       "Password encrypted in",
//       Date.now() - start,
//       " ms from thread alt thread pool size 1"
//     );
//   });
//   crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
//     console.log(
//       "Password encrypted in",
//       Date.now() - start,
//       " ms from thread alt thread pool size 2"
//     );
//   });
//   crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
//     console.log(
//       "Password encrypted in",
//       Date.now() - start,
//       " ms from thread alt thread pool size 3"
//     );
//   });
//       crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
//         console.log(
//           "Password encrypted in",
//           Date.now() - start,
//           " ms from thread alt thread pool size 4"
//         );
//       });
//       crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
//         console.log(
//           "Password encrypted in",
//           Date.now() - start,
//           " ms from thread alt thread pool size 5"
//         );
//       });
//       crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
//         console.log(
//           "Password encrypted in",
//           Date.now() - start,
//           " ms from thread alt thread pool size 6"
//         );
//       });
//       crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
//         console.log(
//           "Password encrypted in",
//           Date.now() - start,
//           " ms from thread alt thread pool size 7"
//         );
//       });
// });

//? blocking code (to be avoided in real time)

crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
console.log(
  "Password encrypted in",
  Date.now() - start,
  " ms outside thread pool1"
);
crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
console.log(
  "Password encrypted in",
  Date.now() - start,
  " ms outside thread pool2"
);
crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
console.log(
  "Password encrypted in",
  Date.now() - start,
  " ms outside thread pool3"
);
crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
console.log(
  "Password encrypted in",
  Date.now() - start,
  " ms outside thread pool4"
);
console.log('i will be blocked forever even i am top level code')
setTimeout(() => {
    console.log("Time is up", Date.now() - start -2000 ,"ms wasted in blocking");
},2000)
