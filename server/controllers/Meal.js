const Meal = require("../models/Meal");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.saveTodayMeal = async (req, res) => {
    try {
        const { breakfast, lunch, dinner,userId } = req.body;
       

        if (!breakfast || !lunch || !dinner) {
            return res.status(400).json({
                message: "All Fields are required",
                success: false,
            });
        }

        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Find any existing meal entry for the same day
        const mealData = await Meal.findOne({
            date: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });

        if (!mealData) {
            // No entry exists for today, create a new one
            const newMealData = await Meal.create({
                breakfast,
                lunch,
                dinner,
                date: new Date(),  // Store the current date and time
                userId,
            });
            return res.status(200).json({
                message: "Meal Saved successfully",
                success: true,
            });
        } else {
            // Entry exists for today, update it
            mealData.breakfast = breakfast;
            mealData.lunch = lunch;
            mealData.dinner = dinner;
            await mealData.save();

            return res.status(200).json({
                message: "Meal updated successfully",
                success: true,
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Issue in save meal API",
            success: false,
        });
    }
};

exports.getallMealMonth = async (req, res) => {
    try {
        // Set up the start and end of the current month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const endOfMonth = new Date(startOfMonth);
        endOfMonth.setMonth(endOfMonth.getMonth() + 1);
        endOfMonth.setDate(0);
        endOfMonth.setHours(23, 59, 59, 999);

        // Find all meal entries for the current month
        const mealData = await Meal.find({
            date: {
                $gte: startOfMonth,
                $lte: endOfMonth,
            },
        });

        // Return the list of meals
        return res.status(200).json({
            message: "All meals for the current month",
            mealData,
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

exports.gettodayMeal = async (req, res) => {
    try {
        // Set up the start and end of the current month
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        // Find all meal entries for the current month
        const mealData = await Meal.find({
            date: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        });

        // Return the list of meals
        return res.status(200).json({
            message: "meals for the today",
            mealData,
            success: true,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
