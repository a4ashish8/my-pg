const express = require("express")
const router = express.Router()

const {loginUser,chngPassword} = require("../controllers/Auth");

router.post("/loginUser", loginUser);
router.put("/chngPassword",chngPassword);

module.exports = router