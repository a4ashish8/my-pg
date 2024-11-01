import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { mealendpoints } from "../api";

const { SAVEMEAL_API, ALLMEAL_API,TODAYMEAL_API } = mealendpoints;

export const regMeal = async (userData) => {
  const toastId = toast.loading("Registering meal...");
  let result = {};
  try {
    console.log(userData)
    const response = await apiConnector("POST", SAVEMEAL_API, userData);

    if (!response?.data?.success) {
      return response.data; // Return the response data directly
    }

    result = response?.data || {};
    toast.success("Meal Saved successfully!");
    getAllUsers();
  } catch (error) {
    console.error("SAVEMEAL_API ERROR:", error.message, error);
    toast.error("Failed to save Meal: " + error.message);
    return {
      success: false,
      message: error.message,
    };
  }
  toast.dismiss(toastId);
  return result;
};

export const getAllUsers = async () => {
  const toastId = toast.loading("Loading users...");
  let result = [];
  try {
    const response = await apiConnector("GET", ALLMEAL_API);
    result = response?.data || [];
  } catch (error) {
    console.error("ALLUSER_API ERROR:", error.message, error);
  }
  toast.dismiss(toastId);
  return result;
};
