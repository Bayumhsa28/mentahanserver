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
app.post("/api/users", (req, res) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            error: "Silahkan isi field name, email, dan password!",
        });
    }
    res.json({
        name: name,
        email: email,
        password: password,
        message: "User telah ditambahkan",
    });
});

//metode put
app.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    if(!id || !name || !email || !password){
        return res.status(400).json({
            error: "Silahkan isi field id, name, email, dan password!",
        });
    }
    console.log(id);
    res.json({ 
        message: "data users dengan id" + id + "telah diubah",
        name: name,
        email: email,
        password: password,
     });
});

app.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).json({
            error: "silahkan isi field id users!",
        });
    }
    res.json({message: `user dengan ID ${id} telah dihapus!`});
});

app.get("/api/users/:id", userController.getUserById);

app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
);