const express = require("express")
const router = express.Router()

const {sendReminder,sendPayment} = require("../controllers/Payment");

router.post("/sendReminder",sendReminder);
router.put("/sendPayment",sendPayment);

module.exports = router