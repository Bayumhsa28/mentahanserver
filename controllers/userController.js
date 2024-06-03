const database = require("../database.js");
const getAllUsers = (req, res) => {
    database.query(`SELECT * FROM USERS`, (err, result) => {
        if(err){
            res.status(500).json({err: "Something wrong"})
            throw err
        }
        console.log(result);
        res.json({result});
    })
};
const getUserById = (req, res) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({
            error: "silahkan isi field id users!",
        });
    }
    res.json({
        data: {
            name: "pras",
            email: "pras@gmail.com",
            password: "pras1122",
        }
    });
};
const updateUserById = (req, res) => {

};
const deleteUserById = (req, res) => {

};
module.exports = {
    getAllUsers, 
    getUserById, 
    updateUserById, 
    deleteUserById,
};