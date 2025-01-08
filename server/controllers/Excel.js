const ExcelJS = require('exceljs');
const Admin = require("../models/Admin");

exports.downloadAlluser = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('alluser');

    // Fetch users and populate the worksheet
    const users = await Admin.find({ userType: { $ne: 'Admin' } }).populate('userDetails');

    worksheet.columns = [
      { header: 'User ID', key: 'userId', width: 15 },
      { header: 'First Name', key: 'firstName', width: 20 },
      { header: 'Last Name', key: 'lastName', width: 20 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Phone Number', key: 'phoneNo', width: 15 },
      { header: 'Amount', key: 'amount', width: 10 },
      { header: 'Joining Date', key: 'joiningDate', width: 20 },
      { header: 'Image URL', key: 'image', width: 30 },
      { header: 'User Type', key: 'userType', width: 15 },
      { header: 'Status', key: 'userStatus', width: 10 },
    ];

    users.forEach((user) => {
      worksheet.addRow({
        userId: user.userId,
        firstName: user.userDetails.first_name,
        lastName: user.userDetails.last_name,
        email: user.userDetails.emailId,
        phoneNo: user.userDetails.phoneNo,
        amount: user.userDetails.ammount,
        joiningDate: user.userDetails.joiningDate,
        image: user.userDetails.Image,
        userType: user.userType == 'Users' ? 'User' : 'Admin',
        userStatus: user.userStatus,
      });
    });

    // Set response headers for file download
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=UsersData.xlsx');

    // Write the workbook to the response directly
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error generating Excel file:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred in Download Excel file",
    });
  }
};
