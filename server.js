// Import Express
const express = require("express");
// Create an Express app
const app = express();

function isNumericUrl(url) {
  const numericRegex = /^\d+$/;
  return numericRegex.test(url);
}

app.get("/", (req, res) => {
  res.send("hello");
});

// 1. Be Polite, Greet the User
app.get("/greetings/:name", (req, res) => {
  res.send("Hello there," + req.params.name);
});

// 2. Rolling the Dice
app.get("/roll/:num", (req, res) => {
  let num = req.params.num;

  if (isNumericUrl(num)) {
    res.send("You rolled a " + num);
  } else {
    res.send("You must specify a number.");
  }
});

// 3. I Want THAT One!
app.get("/collectibles/:index", (req, res) => {

  const collectibles = [
    { name: "shiny ball", price: 5.95 },
    { name: "autographed picture of a dog", price: 10 },
    { name: "vintage 1970s yogurt SOLD AS-IS", price: 0.99 },
  ];

  let index = req.params.index;
  if(index>collectibles.length){
    res.send("This item is not yet in stock. Check back soon!");
}else{
    res.send(`So, you want the ${collectibles[index].name}? For ${collectibles[index].price}, it can be yours!`);
}
});

// 4. Filter Shoes by Query Parameters

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];
app.get("/shoes", (req, res) => {

    let filteredShoes = shoes;
    console.log(req.query.minprice);

    // 检查是否有查询参数 check if there is a query parameter
    if (Object.keys(req.query).length > 0) {
        // 按最低价格筛选 filter by min price
        if (req.query.minprice) {
            filteredShoes = filteredShoes.filter(shoe => shoe.price >= Number(req.query.minprice));
        }

        // 按最高价格筛选 filter by max price
        if (req.query.maxprice) {
            filteredShoes = filteredShoes.filter(shoe => shoe.price <= Number(req.query.maxprice));
        }

        // 按类型筛选
        if (req.query.type) {
            filteredShoes = filteredShoes.filter(shoe => shoe.type === req.query.type);
        }
    }

    res.json(filteredShoes);
});

// Listen for requests on port 3000
app.listen(3000, () => {
  console.log("Listening on port: 127.0.0.1:3000");
});
