const express = require("express")
const router = express.Router()

const { addUser, getAllUser, updateUser, UpdateStatusUser ,editUser} = require("../controllers/User");

router.post("/useradd", addUser);
router.get("/getAllUser", getAllUser);
router.put("/updateUser", updateUser);
router.get("/editUser", editUser);
router.put("/UpdateStatusUser", UpdateStatusUser);


module.exports = router