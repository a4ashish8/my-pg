const Admin = require("../models/Admin")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.loginUser = async (req, res) => {
  try {
    const { userId, password } = req.body;
    console.log(req.body);
    false;
    if (!userId || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const user = await Admin.findOne({ userId }).populate("userDetails");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User ID does not exist",
      });
    }

    // Compare Password and Generate JWT token if matched
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { userId: user.userId, userType: user.userType, userStatus: user.userStatus, id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // Save token in user document (optional, depending on your needs)
      user.token = token;
      await user.save();

      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred during login",
    });
  }
};

exports.chngPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const token = req.cookies.token;
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    if (!oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })
    }

    if (newPassword != confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password are not same",
      })
    }
    const user = await Admin.findOne({ userId: decode.userId })
    if (await bcrypt.compare(password, user.password)) {
      const hashedpassword = await bcrypt.hash(newPassword, 10);
      console.log(hashedpassword);
      await Admin.findOneAndUpdate({ userId: decode.userId }, { password: hashedpassword }, { new: true });
      return res.status(200).json({
        message: "Password Update Successfully",
        success: true,
      })
    }
    else {
      return res.status(402).json({
        success: false,
        meassage: "Old password not matched.",
      })
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      meassage: "Error Occurs in Chang pass api",
    })
  }
}