const bcrypt = require("bcryptjs")
const Admin = require("../models/Admin")
const Details = require("../models/Details")
require("dotenv").config()
const jwt = require("jsonwebtoken");
// Signup Controller for Registering USers

exports.addUser = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { first_name, last_name, emailId, password, userType, phoneNo, userStatus, ammount, joiningDate } = req.body
    // Check if All Details are there or not

    if (!first_name || !last_name || !emailId || !password) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      })
    }


    // Check if user already exists
    const existingUser = await Details.findOne({ emailId })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      })
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    const imageUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${first_name}%20${last_name}`;

    // Create the Additional Profile For User
    const details = await Details.create({
      first_name,
      last_name,
      ammount,
      phoneNo,
      emailId,
      joiningDate,
      Image: imageUrl,
    })
    const user = await Admin.create({
      userId: emailId,
      password: hashedPassword,
      userType,
      userStatus,
      userDetails: details._id,
    })

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    })
  }
}

exports.getAllUser = async (req, res) => {
  try {
    const users = await Admin.find({ userType: { $ne: 'Admin' } }).populate('userDetails');
    return res.status(200).json({
      success: true,
      users,
      message: "data fetched",
    });
  } catch (error) {
   
    return res.status(500).json({
      success: false,
      message: "All user api have an issues",
    })
  }
}


exports.updateUser = async (req, res) => {
  try {
    const { first_name, last_name, emailId, phoneNo, ammount, joiningDate } = req.body;
    const token = req.cookies.token;

    // Verify token and get decoded data
    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    // Find the admin document and get the userDetails reference
    const admin = await Admin.findOne({ _id: decode.id });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    if (admin.userDetails) {
      // Update userDetail document
      const updatedUserDetail = await Details.findOneAndUpdate(
        { _id: admin.userDetails._id },
        { $set: { first_name, last_name, emailId, phoneNo, ammount, joiningDate } },
        { new: true } // Return the updated document and run validation
      );

      if (!updatedUserDetail) {
        return res.status(404).json({ message: 'User details not found' });
      }

      res.status(200).json({ message: 'User details updated successfully', updatedUserDetail });
    } else {
      res.status(400).json({ message: 'No user details associated with this admin' });
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "User cannot be Updated. Please try again.",
    })
  }
}

exports.deleteUser = async (req,res)=>{
  try{

  }catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"User delete have issues",
    })
  }
}