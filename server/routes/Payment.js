const express = require("express")
const router = express.Router()

const {requestPayment,sendReminder,sendPayment} = require("../controllers/Payment");

router.get("/requestPayment",requestPayment);
router.post("/sendReminder",sendReminder);
router.put("/sendPayment",sendPayment);

module.exports = router