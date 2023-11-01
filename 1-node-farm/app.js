const http = require("http");
const url = require("url");
const fs = require("fs");
const { json } = require("stream/consumers");
const data = fs.readFileSync(
  `${__dirname}/dev-data/data.json`,
  "utf-8",
  (err, data) => {
    console.log(err);
    console.log(data);
  }
); // this will always fetch initial the server starts and doesn't block the code even it is sync
const productData = JSON.parse(data);
const cards = fs.readFileSync(`${__dirname}/templates/cards.html`, "utf-8");
const home = fs.readFileSync(`${__dirname}/templates/overview.html`, "utf-8");
const info = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");
const replacePlaces = require(`${__dirname}/helpers/replacePlaces`);
const app = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/" || pathname === "/HOME") {
    res.writeHead(200, {
      statusCode: 200,
      "content-type": "text/html",
    });
    const cardReplace = productData.map(e => replacePlaces(cards, e));
    console.log(cardReplace);
    const finalHTML = home.replace(/{%CARDS%}/g, cardReplace.join(""));
    res.end(finalHTML);
  } else if (pathname === "/products") {
    res.writeHead(200, {
      statusCode: 200,
      "content-type": "text/html",
    });
    const productInfo = replacePlaces(info, productData[query?.id]);
    res.end(productInfo);
  } else if (pathname === "/name") {
    res.end("Tiger menoj kumar 🐅");
  } else if (pathname === "/Api") {
    res.end(data);
  } else if (pathname === "/place") {
    res.end("welcome to Melavalli 🏡");
  } else {
    res.writeHead(404, {
      statusCode: 404,
      "content-type": "text/html",
    });
    res.end("<h3>page not found</h3>");
  }
});

app.listen("5000", "127.0.0.1", () => {
  console.log("Server is up");
});
