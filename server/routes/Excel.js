const express = require("express")
const router = express.Router()

const {downloadAlluser} = require("../controllers/Excel");

router.get("/downloadAlluser", downloadAlluser);

module.exports = router