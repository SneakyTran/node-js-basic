import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();

const initWebRoute = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/detail/user/:userId/", homeController.getDetailUser);
    router.post("/create-new-user", homeController.createNewUser);
    router.post("/delete-user", homeController.deleteUser);
    router.get("/edit-user/:userId", homeController.editUser);
    router.post("/update-user/", homeController.updateUser);
    router.post("/handle-upload-filer/", homeController.handleUploadFile);

    router.get("/about", (req, res) => {
        //!tách ttheo MVC
        res.send("I'm EJS");
    });

    return app.use("/", router);
};

export default initWebRoute;
