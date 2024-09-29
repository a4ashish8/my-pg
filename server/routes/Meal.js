const express = require("express")
const router = express.Router()

const {saveTodayMeal,getallMealMonth,gettodayMeal} = require("../controllers/Meal");
router.post("/saveTodayMeal",saveTodayMeal);
router.get("/getallMealMonth",getallMealMonth);
router.get("/gettodayMeal",gettodayMeal);


module.exports = router