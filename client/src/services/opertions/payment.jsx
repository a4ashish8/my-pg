
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { paymentendpoints } from "../api";

const { REQUESTPAYMENT_API } = paymentendpoints;



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






