const Admin = require("../models/Admin");
const Payment = require("../models/Payment");
const mailSender = require("../utils/mailSender");
const { userRegTemplate } = require("../mail/templates/userReg");

exports.sendReminder = async (req, res) => {
    try {
        const { userId, ammount, email } = req.body;
        console.log(req.body)
        if (!userId) {
            return res.status(400).json({
                message: "Fill all required fields",
                success: false,
            });
        }


        const now = new Date();
        const duesYear = now.getFullYear();
        const duesMonth = now.getMonth() + 1;
         

        const existingReminder = await Payment.findOne({ userId, duesYear, duesMonth });
// this is used for send duplicate reminder mail

        if (existingReminder) {
            // Send email notification
            const title = 'Welcome to the Platform!';
            const body = userRegTemplate(email, existingReminder.duesAmmount);
            //await mailSender(email, title, body);

            return res.status(200).json({
                message: "Reminder already sent. Email notification triggered.",
                success: true,
                existingReminder
            });
        }



        const userDetail = await Admin.findOne({ _id: userId }).populate("userDetails");
        const checkPayment = await Payment.find({ userId: userId }).sort({ createdAt: -1 }).limit(1);

   
        let preAmmount = 0;
        let currentAmmount = 0;

        if (checkPayment.length > 0) {
            preAmmount = checkPayment[0].duesAmmount || 0;
        }
        if (userDetail) {
            currentAmmount = userDetail.userDetails.ammount;
        }
       const totalAmmount = preAmmount + currentAmmount;
       
        // Create a new payment reminder
        const newReminder = await Payment.create({
            duesMonth,
            duesYear,
            paymentAmmount: totalAmmount,
            userId,
            paymentDate: Date.now(),
            ammountPaid: 0, // Initialize with 0 or your preferred initial value
            duesAmmount: ammount + totalAmountDue, // Add the current payment amount to the total dues
            
            status: 'Pending',
            createdAt: Date.now(),
        });

        // Send email notification
        const title = 'Welcome to the Platform!';
        const body = userRegTemplate(email, totalAmmount);
        await mailSender(email, title, body);


        return res.status(200).json({
            message: "Payment reminder saved and email notification sent.",
            success: true,
            newReminder,
        });
       
    } catch (error) {
        console.error('Error in sendReminder:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


exports.sendPayment = async (req, res) => {
    try {
        const { paymentAmmount } = req.body;

    } catch (error) {
        console.error('Error in payment:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}



exports.requestPayment = async (req, res) => {
    try {
        // MongoDB query
        
        const userDetails = await Admin.find({
            userType: { $ne: 'Admin' }, // Exclude Admin users
            userStatus: { $eq: 'Active' }, // Only Active users

        }).populate("userDetails");

        const transformedUserDues = await Payment.aggregate([
            {
                $sort: { createdAt: -1 } // Sort payments by `createdAt` in descending order
            },
            {
                $group: {
                    _id: "$userId", // Group by `userId`
                    latestPayment: { $first: "$$ROOT" } // Select the first (latest) payment document
                }
            },
            {
                $project: {
                    paymentId: "$latestPayment._id", // Exclude `_id` from the final output
                    userId: "$_id", // Rename `_id` to `userId`
                    duesMonth: "$latestPayment.duesMonth",
                    duesYear: "$latestPayment.duesYear",
                    duesAmmount: "$latestPayment.duesAmmount",
                    amountPaid: "$latestPayment.amountPaid",
                    status: "$latestPayment.status",
                    paymentDate: "$latestPayment.paymentDate",
                    comment: "$latestPayment.comment",
                }
            }
        ]);


        // Transform the result into the desired object structure
        const userDues = transformedUserDues.reduce((acc, item) => {            
                acc[item.userId] = {                
                duesMonth: item.duesMonth,
                duesYear: item.duesYear,
                duesAmmount: item.duesAmmount,
                amountPaid: item.amountPaid,
                status: item.status,
                paymentDate: item.paymentDate
            };
            return acc;
        }, {});

        return res.status(200).json({
            success: true,
            message: "Data fetched",
            userDues,
            userDetails,
        });

    } catch (error) {
        console.error('Error in payment:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

exports.updateStatus = async (req, res) => {
    try {

        const { id } = req.query;
        const { status, comment } = req.body;
        // Create a new payment reminder
        const newReminder = await Payment.findOneAndUpdate(

            { _id: id },
            { $set: { comment, status } },
            { new: true } // This will return the updated document
        );
        return res.status(200).json({
            success: true,
            message: "Status Updated",
            newReminder,
        });
    } catch (error) {
        console.error('Error in payment:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}