const database = require("../database.js");
const getAllUsers = (req, res) => {
    database.query(`SELECT * FROM USERS`, (err, result) => {
        if (err) {
            res.status(500).json({ err: "Something wrong" })
            throw err
        }
        console.log(result);
        res.json({ result });
    });
};
const getUserById = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            error: "silahkan isi field id users!",
        });
    }
    database.query(`SELECT * FROM users WHERE id = ?`, [id], (err, results) => {
        if (err) {
            console.error(err)
            return res.status(500).json({
                error: "Error while getting user with ID"
            })
        }
        if (results.length === 0) {
            return res.json({
                message: "User not found",
                results: []
            })
        }
        res.json({ results });
    });
};

const createNewUser = (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Silahkan isi field name, email, dan password!",
        });
    }
    database.query(`INSERT INTO users(name, email, password) VALUES (?, ?, ?)`,
        [name, email, password],
        (err, results) =>  {
            if(err){
                console.error(err)
                return res.status(500).json({
                    error: "Error while inserting new user!"
                })
            }
            if(results.affectedRows > 0){
                console.log(results)
                return res.json({
                    message: "New Users Create"
                })
            }
            return res.status(500).json({
                error: "No user created!"
            })
        }
    );
}
const updateUserById = (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    if(!id || !name || !email || !password){
        return res.status(400).json({
            error: "Silahkan isi field id, name, email, dan password!",
        });
    }
    console.log(id);
    database.query(`UPDATE users set name = ?, email = ?, password = ?
    WHERE id = ?`, [name, email, password, id], (err, results) => {
        if(err){
            console.error(err);
            res.status(500).json({
                error: "Error While Updating user!",
            });
        }
        if(results.affectedRows === 0){
            return res.status(400).json({
                error: "User dengan ID " + id + " tidak ditemukan, gagal update"
            });
        }
        return res.json({
            users: results,
            message: "Data user dengan ID " + id + " telah diubah"
        })
    })
};
const deleteUserById = (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            error: "silahkan isi field id users!",
        });
    }
    database.query(`DELETE FROM users WHERE id = ?`, [id], (err, results) => {
        if(err){
            console.error(err)
            return res.status(500).json({
                error: "Error while deleting user!",
            });
        }
        if(results.affectedRows === 0){
            return res.status(400).json({
                error: `User dengan ID ${id} telah dihapus!`,
            });
        }
        res.json({ message: `user dengan ID ${id} telah dihapus!` });
    });
};
module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    createNewUser,
};