import pool from "../configs/DBConnection";

let getAllUser = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM users");
    return res.status(200).json({
        message: "OK",
        data: rows,
    });
};

let createNewUser = async (req, res) => {
    try {
        let { firstName, lastName, email, address } = req.body;
        if (!firstName || !lastName || !email || !address)
            return res.status(400).json({
                message: "Missing required body",
            });
        await pool.execute(
            "INSERT INTO users(firstName, lastName, email, address) VALUES(?,?,?,?)",
            [firstName, lastName, email, address]
        );
        return res.status(200).json({
            message: "OK",
        });
    } catch (error) {
        console.log(error);
    }
};

let updateUser = async (req, res) => {
    try {
        let { firstName, lastName, email, address, id } = req.body;
        if (!firstName || !lastName || !email || !address || !id)
            return res.status(400).json({
                message: "Missing required body",
            });
        await pool.execute(
            "UPDATE users SET firstName = ?,lastName = ?,email = ?,address = ? WHERE id = ?",
            [firstName, lastName, email, address, id]
        );
        return res.status(200).json({
            message: "OK",
        });
    } catch (error) {
        console.log(error);
    }
};

let deleteUser = async (req, res) => {
    try {
        let userId = req.params.id;
        console.log(userId);
        if (!userId) {
            return res.status(400).json({
                message: "Missing required body",
            });
        }
        await pool.execute("DELETE FROM users WHERE id = ?", [userId]);
        return res.status(200).json({
            message: "OK",
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
};
