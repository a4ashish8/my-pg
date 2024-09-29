const Admin = require("../models/Admin");
const Payment = require("../models/Payment");
// const sendEmail = require("../services/emailService"); // Uncomment and use your actual email service

exports.sendReminder = async (req, res) => {
    try {
        const { userId, paymentAmmount, collector } = req.body;

        if (!userId || !paymentAmmount || !collector) {
            return res.status(400).json({
                message: "Fill all required fields",
                success: false,
            });
        }

        const now = new Date();
        const duesYear = now.getFullYear();
        const duesMonth = now.getMonth() + 1;

        const existingReminder = await Payment.findOne({ userId, duesYear, duesMonth });

        const userDetails = await Admin.findOne({ _id: userId }).populate("userDetails");
        const checkPayment = await Payment.find({ userId: userId }).sort({ createdAt: -1 }).limit(1);
        let totalAmountDue = 0;

        if (checkPayment.length > 0) {
            totalAmountDue = checkPayment[0].duesAmmount || 0; 
            console.log(totalAmountDue);
        }

        if (existingReminder) {
            // Send email notification
            // await sendEmail({
            //     to: userDetails.email, // Adjust based on your actual user email field
            //     subject: 'Payment Reminder',
            //     text: `Reminder: Your total dues are $${totalAmountDue}. Please make the payment.`
            // });

            return res.status(200).json({
                message: "Reminder already sent. Email notification triggered.",
                success: true,
            });
        }

        // Create a new payment reminder
        const newReminder = await Payment.create({
            duesMonth,
            duesYear,
            paymentAmmount,
            userId,
            paymentDate: Date.now(),
            ammountPaid: 0, // Initialize with 0 or your preferred initial value
            duesAmmount: paymentAmmount + totalAmountDue, // Add the current payment amount to the total dues
            collector,
            status: 'Pending',
            createdAt: Date.now(),
        });

        // Send email notification
        // await sendEmail({
        //     to: userDetails.email, // Adjust based on your actual user email field
        //     subject: 'Payment Reminder',
        //     text: `Reminder: You have a new payment reminder of $${paymentAmmount}. Please make the payment.`
        // });

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


exports.sendPayment =  async (req,res) =>{
    try{
const{paymentAmmount} = req.body;
console.log(req.body);
    }catch(error){
        console.error('Error in payment:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}
