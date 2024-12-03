
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { paymentendpoints } from "../api";

const { REQUESTPAYMENT_API,REMINDER_API } = paymentendpoints;



export const duesPayment = async () => {
  const toastId = toast.loading("Loading users...");
  let result = [];
  try {
    const response = await apiConnector("GET", REQUESTPAYMENT_API);
    result = response?.data || [];
  } catch (error) {
    console.error("ALLUSER_API ERROR:", error.message, error);
  }
  toast.dismiss(toastId);
  return result;
};

export const sendReminder = async (data) => {
  const toastId = toast.loading("Loading users...");
  let result = [];
  try {
    const response = await apiConnector("POST", REMINDER_API,data);
    result = response?.data || [];
  } catch (error) {
    console.error("REMINDER_API ERROR:", error.message, error);
  }
  toast.dismiss(toastId);
  return result;
};





