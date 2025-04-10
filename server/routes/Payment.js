const express = require("express")
const router = express.Router()

const {requestPayment,sendReminder,sendPayment,updateStatus} = require("../controllers/Payment");

router.get("/requestPayment",requestPayment);
router.post("/sendReminder",sendReminder);
router.put("/sendPayment",sendPayment);
router.put("/updateStatus",updateStatus);

module.exports = router