const express = require("express");
const app = express();


// routes
const userRoutes = require("./routes/User");
const mealRoutes = require("./routes/Meal");
const authRoutes = require("./routes/Auth");
const paymentRoutes = require("./routes/Payment");


const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect();
//middlewares
app.use(express.json());

app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin:"http://localhost:3000",
		credentials:true,
	})
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/meal",mealRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/auth",authRoutes);
//def route

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})

