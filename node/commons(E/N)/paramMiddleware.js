router.param("paramName", (req, res, next, parm) => {
  console.log(`the param passed in url is ${parm}`);
  next();
});

//in handler function
exports.checkId = (req, res, next, val) => {
  console.log(val);
  next();
};
//replace the handler function as a callback by exporting only id check separately from all handlers

//task
const middleWare = (req, res, next) => {
  //   req.body.name && req.body.price
  //     ? res.status(201).send("created")
  //     : res.status(400).send("error");
  //     next();
  // or
  if (!req.body.name || !req.body.price) {
    return res.status(400).send("error");//return is mandatory to break the middleware chain here due to error
  }
};
tourRouter.post(middleWare, controller); //this is how we chain the middleware we will add all the value before the controller
