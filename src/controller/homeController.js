import pool from "../configs/DBConnection";

let getHomePage = async (req, res) => {
    let data = [];
    // connection.query("SELECT * FROM `users`", function (err, results, fields) {
    //     console.log(">>> Check mysql");
    //     results.map((row) => {
    //         data = [...data, row];
    //     });
    // return res.render("test/index.ejs", {
    //     dataUsers: data,
    // });
    // });
    const [rows, fields] = await pool.execute("SELECT * FROM `users`");
    return res.render("test/index.ejs", {
        dataUsers: rows,
    });
};

let getDetailUser = async (req, res) => {
    try {
        let userId = req.params.userId;
        let [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [
            userId,
        ]);
        return res.send(JSON.stringify(user));
    } catch (error) {
        console.log(error);
    }
};

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;
    await pool.execute(
        "INSERT INTO users(firstName, lastName, email, address) VALUES(?,?,?,?)",
        [firstName, lastName, email, address]
    );
    console.log("CHECKOUT >>> req", req.body);
    return res.redirect("/");
};

let deleteUser = async (req, res) => {
    await pool.execute("DELETE FROM users WHERE id = ?", [req.body.userId]);
    return res.redirect("/");
};

let editUser = async (req, res) => {
    let { userId } = req.params;
    let [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [
        userId,
    ]);
    return res.render("update.ejs", { dataUser: user[0] });
};

let updateUser = async (req, res) => {
    try {
        let { firstName, lastName, email, address, id } = req.body;
        await pool.execute(
            "UPDATE users SET firstName = ?,lastName = ?,email = ?,address = ? WHERE id = ?",
            [firstName, lastName, email, address, id]
        );
        return res.redirect("/");
    } catch (error) {
        console.log(error);
    }
};

let handleUploadFile = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getHomePage,
    getDetailUser,
    createNewUser,
    deleteUser,
    editUser,
    updateUser,
    handleUploadFile,
};
