const express = require('express');
const app = express();
const handle = require("./router/handle");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', (req, res, next) => {
    console.log(`requireUrl:[${req.url}] fromServe`);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use("/handle", handle);
app.listen(9012, () => {
    console.log("✈serve run successful");
})
// module.exports = app;
