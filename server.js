const express = require("express");
const userController = require("./controllers/userController.js")
const errorhandler = require("./middleware/errorHandler.js");
const database = require("./database.js");
const logger = require("./middleware/logger.js");
const upload = require("./utils/upload.js");
const multerError = require("./middleware/multerError.js");
const userRoutes = require("./routers/userRoutes.js");

const app = express();
const PORT = 8000;

//middleware
//ambil data dari client dari bentuk json
app.use(express.json());
//menangani data dari client atau browser
app.use(express.urlencoded({extended: true}));
//menangani error 
app.use(errorhandler);
app.use(logger);

// //route http://localhost:8000
// //method get
app.get("/", (req, res) => {
    res.json({
        message: "Berhasil melakukan routing aja !!!",
    });
});

// app.get("/API/users", userController.getAllUsers);

// //method post menambahkan data user baru
// app.post("/api/users", userController.createNewUser);

// //metode put
// app.put("/api/users/:id", userController.updateUserById);

// app.delete("/api/users/:id", userController.deleteUserById);

// app.get("/api/users/:id", userController.getUserById);

app.use('/api/users', userRoutes);

app.post("/file-upload", upload.single("file"), [multerError], (req, res) => {
    res.json({ message: "File uploaded!" });
  });

app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
);