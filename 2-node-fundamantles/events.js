// to demonstrate event based architecture
const EventEmitter = require("events");

//?t const myEmitter = new EventEmitter(); // can be replaced by the class like below

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();
myEmitter.on("newSale", () => {
  console.log("Hurry a new sale is started");
});
myEmitter.on("newSale", discount => {
  console.log(`Flat ${discount}% off`);
});
myEmitter.on("newSale", () => {
  console.log("offer closes soon");
});

myEmitter.emit("newSale", 10);
