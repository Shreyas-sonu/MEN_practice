const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //Solution 1- ending saving and sending the data at once (not streaming)
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     res.end(data);
  //   }
  // });
  //Solution 2- using fs module steam function
  // const readable = fs.createReadStream("tet-file.txt");
  // readable.on("data", chunk => {
  //   //send/write data each time there is a new chunk ready
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  //   //sends a signal that stream ended (all chunks loaded)
  // });
  // readable.on("error", err => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("file not found");
  // });
  //? even the solution solves all the previous problems of sending a large data we have a problem
  //? Back Pressure- when the data read is more faster than the response sent
  //? i.e if the data chunks are received quickly but the response write takes a time (which is slow comparatively) creates back pressure
  //Solution 3- Piping
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
  //readableSource.pipe(writeableDestination)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening...");
});
