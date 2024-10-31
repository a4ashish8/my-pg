import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { excelendpoints } from "../api";

const { GETALLUSEREXCEL_API } = excelendpoints;

export const getAllUserExcel = async () => {
  const toastId = toast.loading("Loading users...");

  try {
    const response = await apiConnector("GET", GETALLUSEREXCEL_API, null, {
      Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }, null, "blob");
    
    console.log("Response type:", response.data.constructor.name); // Check response type

    if (response.data && response.data instanceof Blob) { 
      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "UsersData.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      toast.success("User data downloaded successfully!");
    } else {
      throw new Error("Response data is not in Blob format.");
    }
  } catch (error) {
    console.error("getAllUserExcel ERROR:", error.message, error);
    toast.error("Failed to download user data. Please try again.");
  } finally {
    toast.dismiss(toastId);
  }
};
