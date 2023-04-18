import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./router/web";

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

//setup viewEngine
configViewEngine(app);

//init web route
initWebRoute(app);

console.log(">>> CHECKOUT PORT", port);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
