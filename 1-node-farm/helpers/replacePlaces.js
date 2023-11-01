module.exports = (temp, val) => {
  let outX = temp.replace(/{%PRODUCT_NAME%}/g, val.productName);
  outX = outX.replace(/{%IMG%}/g, val.image);
  outX = outX.replace(/{%NUTRIENTS%}/g, val.nutrients);
  outX = outX.replace(/{%FROM%}/g, val.from);
  outX = outX.replace(/{%DESCRIPTION%}/g, val.description);
  outX = outX.replace(/{%PRICE%}/g, val.price);
  outX = outX.replace(/{%QTY%}/g, val.quantity);
  outX = outX.replace(/{%ID%}/g, val.id);
  if (val.organic === false) {
    outX = outX.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return outX;
};
