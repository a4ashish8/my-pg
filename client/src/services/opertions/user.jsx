import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { userendpoints } from "../api";

const { ALLUSER_API, USERADD_API } = userendpoints;

export const regUser = async (userData) => {
  const toastId = toast.loading("Registering user...");
  let result = {};
  try {
    const response = await apiConnector("POST", USERADD_API, userData);

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not register user.");
    }

    result = response?.data || {};
    toast.success("User registered successfully!");
    getAllUsers();
  } catch (error) {
    console.error("USERADD_API ERROR:", error.message, error);
    toast.error("Failed to register user: " + error.message);
  }

  toast.dismiss(toastId);
  return result;
};

export const getAllUsers = async () => {
  const toastId = toast.loading("Loading users...");
  let result = [];
  try {
    const response = await apiConnector("GET", ALLUSER_API);

    if (!response?.data?.success) {
      throw new Error("Could not fetch user details.");
    }

    result = response?.data?.users || [];
  } catch (error) {
    console.error("GET_ALL_USERS_API ERROR:", error.message, error);
    toast.error("Failed to load users: " + error.message);
  }

  toast.dismiss(toastId);
  return result;
};
