const ExcelJS = require('exceljs');

exports.downloadAlluser = async (req, res) => {
  try {const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Data');
  
    // Define the columns and data
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
    ];
  
    const data = [
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ];
  
    data.forEach((item) => {
      worksheet.addRow(item);
    });
  
    // Set headers to trigger download in the client
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=data.xlsx');
  
    // Send the workbook as a response
    await workbook.xlsx.write(res);
  
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred in Download Excel file",
    });
  }
};