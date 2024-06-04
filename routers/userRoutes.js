const express = require("express");
const app = express();
const router = express.Router();
const errorhandler = require("./controllers/userController.js");

//route http://localhost:8000
//method get

router.get("/", userController.getAllUsers);

//method post menambahkan data user baru
router.post("/", userController.createNewUser);

//metode put
router.put("/:id", userController.updateUserById);

router.delete("/:id", userController.deleteUserById);

router.get("/:id", userController.getUserById);

module.exports = router;