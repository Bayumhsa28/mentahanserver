const express = require("express");
const app = express();
const database = require("./database");
const userController = require("./controllers/userController.js")
const PORT = 8000;

//middleware
//ambil data dari client dari bentuk json
app.use(express.json());
//menangani data dari client atau browser
app.use(express.urlencoded({extended: true}));


//route http://localhost:8000
//method get
app.get("/", (req, res) => {
    res.json({
        message: "Berhasil melakukan routing aja !!!",
    })
});

app.get("/API/users", userController.getAllUsers);

//method post menambahkan data user baru
app.post("/api/users", userController.createNewUser);

//metode put
app.put("/api/users/:id", userController.updateUserById);

app.delete("/api/users/:id", userController.deleteUserById);

app.get("/api/users/:id", userController.getUserById);

app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
);