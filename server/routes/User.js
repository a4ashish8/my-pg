const express = require("express")
const router = express.Router()

const {addUser,getAllUser,updateUser} = require("../controllers/User");

router.post("/useradd", addUser);
router.get("/getAllUser",getAllUser);
router.put("/updateUser",updateUser);


module.exports = router