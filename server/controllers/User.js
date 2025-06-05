const bcrypt = require("bcryptjs")
const Admin = require("../models/Admin")
const Details = require("../models/Details")
require("dotenv").config()
const jwt = require("jsonwebtoken");
// Signup Controller for Registering USers


exports.addUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      emailId,
      password,
      userType,
      phoneNo,
      userStatus,
      ammount,
      joiningDate
    } = req.body;

    if (!first_name || !last_name || !emailId || !password) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    const existingUser = await Details.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const imageUrl = `https://api.dicebear.com/5.x/initials/svg?seed=${first_name}%20${last_name}`;

    const details = await Details.create({
      first_name,
      last_name,
      ammount,
      phoneNo,
      emailId,
      joiningDate,
      Image: imageUrl,
    });

    const user = new Admin({
      userId: emailId,
      password: hashedPassword,
      userType,
      userStatus,
      userDetails: details._id,
    });

    // Attach plain password temporarily for email use
    user._plainPassword = password;

    await user.save();

    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

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
    const userData = req.body;
    // Find the admin document and get the userDetails reference
    const admin = await Details.findOne({ _id: userData._id });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    if (admin) {
      // Update userDetail document
      const updatedUserDetail = await Details.findOneAndUpdate(
        { _id: admin._id },
        { $set: { userData } },
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

exports.deleteUser = async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User delete have issues",
    })
  }
}

exports.UpdateStatusUser = async (req, res) => {
  try {
    const { _id, userStatus } = req.body;
    const updatedUserDetail = await Admin.findOneAndUpdate(
      { _id },
      { $set: { userStatus } },
      { new: true } // This will return the updated document
    );

    res.status(200).json({ message: 'User details updated successfully', updatedUserDetail });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User delete have issues",
    })
  }
}

exports.editUser = async (req, res) => {
  try {
    const { _id } = req.query;
    if (!_id) {
      return res.status(404).json({ error: "User Id found" });
    }
    const users = await Admin.findOne({ _id }).populate('userDetails');

    if (!users) {
      return res.status(404).json({ error: "User Not found" });
    }
    res.status(200).json({ message: 'User details updated successfully', users });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Edit Api Have an issues",
    })
  }
}