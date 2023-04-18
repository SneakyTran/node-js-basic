import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./router/web";
import initAPIRoute from "./router/apis";

require("dotenv").config();

var morgan = require("morgan");
const app = express();
const port = process.env.PORT || 8080;

//setup viewEngine
configViewEngine(app);

//middleware
app.use((req, res, next) => {
    console.log("CHECKOUT >>> customize middleware");
    console.log(req.method);
    next();
});
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//init web route
initWebRoute(app);

//init api route
initAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
    return res.render("404.ejs");
});

console.log(">>> CHECKOUT PORT", port);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
