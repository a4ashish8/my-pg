import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { userendpoints } from "../api";

const { ALLUSER_API, USERADD_API, UPDATESTATUS_API,EDITUSER_API,UPDATEUSER_API } = userendpoints;

export const regUser = async (userData) => {
  const toastId = toast.loading("Registering user...");
  let result = {};
  try {
    const response = await apiConnector("POST", USERADD_API, userData);

    if (!response?.data?.success) {
      return response.data; // Return the response data directly
    }

    result = response?.data || {};
    toast.success("User registered successfully!");
    getAllUsers();
  } catch (error) {
    console.error("USERADD_API ERROR:", error.message, error);
    toast.error("Failed to register user: " + error.message);
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
    const response = await apiConnector("GET", ALLUSER_API);
    result = response?.data || [];
  } catch (error) {
    console.error("ALLUSER_API ERROR:", error.message, error);
  }
  toast.dismiss(toastId);
  return result;
};

export const statusUpdate = async (userData) => {
  const toastId = toast.loading("Registering user...");
  let result = {};
  try {
    const response = await apiConnector("PUT", UPDATESTATUS_API, userData);

    if (!response?.data?.success) {
      return response.data; // Return the response data directly
    }

    result = response?.data || {};
    toast.success("User registered successfully!");
    getAllUsers();
  } catch (error) {
    console.error("USERADD_API ERROR:", error.message, error);
    toast.error("Failed to register user: " + error.message);
    return {
      success: false,
      message: error.message,
    };
  }
  toast.dismiss(toastId);
  return result;
};

export const getEditUser = async () => {
  const toastId = toast.loading("Loading users...");
  let result = [];
  try {
    const id = new URLSearchParams(window.location.search).get("id");
    const response = await apiConnector("GET", `${EDITUSER_API}?_id=${id}`);
    console.log(response)
    result = response?.data || [];
  } catch (error) {
    console.error("ALLUSER_API ERROR:", error.message, error);
  }
  toast.dismiss(toastId);
  return result;
};


export const updateUser = async (userData) => {
  const toastId = toast.loading("Update user...");
  let result = {};
  try {
    const response = await apiConnector("PUT", UPDATEUSER_API, userData);

    if (!response?.data?.success) {
      return response.data; // Return the response data directly
    }

    result = response?.data || {};
    toast.success("User registered successfully!");
    getAllUsers();
  } catch (error) {
    console.error("UPDATEUSER_API ERROR:", error.message, error);
    toast.error("Failed to register user: " + error.message);
    return {
      success: false,
      message: error.message,
    };
  }
  toast.dismiss(toastId);
  return result;
};