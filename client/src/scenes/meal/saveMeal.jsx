import React, { useState, useContext } from "react"; // Import useContext
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { regMeal } from "../../services/opertions/meal";
import { toast } from "react-hot-toast";
import { UserContext } from "../../context/UserContext"; // Correctly import UserContext

const MealForm = () => {
  const [apiError, setApiError] = useState(""); // State for storing API error messages
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { userData } = useContext(UserContext); // Use useContext to get user data

  const handleFormSubmit = async (values) => {
    try {
      values.userId = userData.user._id;
      const result = await regMeal({values}); // Pass userId with form values
      if (!result.success) {
        setApiError(result.message); // Set the error message from the API response
      } else {
        setApiError(""); // Clear error if the registration was successful
        toast.success("Meal saved successfully!");
        window.location.href = "/allMeal"; // Redirecting to home page after successful registration
      }
    } catch (error) {
      console.error("Registration error:", error);
      setApiError("An unexpected error occurred. Please try again."); // Set a generic error message
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE MEAL" subtitle="Save Today Meal" />

      {/* Display API error message if it exists */}
      {apiError && (
        <Box color="red" mb={2}>
          {apiError}
        </Box>
      )}

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(6, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? "span 3" : "span 6" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Breakfast"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.breakfast}
                name="breakfast"
                error={!!touched.breakfast && !!errors.breakfast}
                helperText={touched.breakfast && errors.breakfast}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Lunch"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lunch}
                name="lunch"
                error={!!touched.lunch && !!errors.lunch}
                helperText={touched.lunch && errors.lunch}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Dinner"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dinner}
                name="dinner"
                error={!!touched.dinner && !!errors.dinner}
                helperText={touched.dinner && errors.dinner}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Save Today Meal
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// Validation schema
const checkoutSchema = yup.object().shape({
  breakfast: yup.string().required("required"),
  lunch: yup.string().required("required"),
  dinner: yup.string().required("required"),
});

// Initialize form values
const initialValues = {
  breakfast: "",
  lunch: "",
  dinner: "",
  userId: "", // userId will be set in handleFormSubmit
};

export default MealForm;