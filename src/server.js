import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./router/web";
import initAPIRoute from "./router/apis";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

//setup viewEngine
configViewEngine(app);

//urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//init web route
initWebRoute(app);

//init api route
initAPIRoute(app);

console.log(">>> CHECKOUT PORT", port);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
