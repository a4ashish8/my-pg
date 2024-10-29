import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { authendpoints } from "../api";
const { LOGIN_API } = authendpoints;

// services/operations/auth.js

const loginUser = async (userData) => {
  const toastId = toast.loading("Logging in...");
  let result = {};

  try {
    const response = await apiConnector("POST", LOGIN_API, userData);
    if (!response?.data?.success) {
      toast.error(response.data.message || "Login failed");
      return response.data;
    }
    result = response.data;
    toast.success("User logged in successfully!");
  } catch (error) {
    console.error("LOGIN_API ERROR:", error.message);
    toast.error("Failed to log in: " + error.message);
    return {
      success: false,
      message: error.message,
    };

  }
toast.dismiss(toastId);
  return result;
};

export default loginUser;


