const BASE_URL = "https://localhost:8000/api/v1"

// USER ENDPOINTS
export const userendpoints = {
  USERADD_API: `${BASE_URL}/user/useradd`,
  ALLUSER_API: `${BASE_URL}/user/getAllUser`,
  UPDATEUSER_API: `${BASE_URL}/user/updateUser`,
}

// AUTH ENDPOINTS
export const authendpoints = {
  LOGIN_API: `${BASE_URL}/auth/loginUser`,
  CHANGEPASSWORD_API: `${BASE_URL}/auth/chngPassword`,
}

// MEAL ENDPOINTS
export const mealendpoints = {
  SAVEMEAL_API: `${BASE_URL}/meal/saveTodayMeal`,
  ALLMEAL_API: `${BASE_URL}/meal/getallMealMonth`,
  TODAYMEAL_API: `${BASE_URL}/meal/gettodayMeal`,
}

// PAYMENT ENDPOINTS
export const paymentendpoints = {
  REMINDER_API: `${BASE_URL}/payment/sendReminder`,
  PAYMENT_API: `${BASE_URL}/payment/sendPayment`,
}
