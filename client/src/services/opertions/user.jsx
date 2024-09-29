import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { userendpoints } from "../api"

const {
  //USERADD_API,
  ALLUSER_API,
  //UPDATEUSER_API,
} = userendpoints

export const getAllUsers = async () => {
  const toastId = toast.loading("Loading users...")
  let result = []
  try {
    const response = await apiConnector("GET", ALLUSER_API)
    if (!response?.data?.success) {
      throw new Error("Could not fetch user details.")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("GET_ALL_USERS_API API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}
