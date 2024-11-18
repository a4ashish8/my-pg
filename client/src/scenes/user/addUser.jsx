import React, { useState } from "react";
import { Box, Button, TextField, FormControlLabel, Switch, RadioGroup, Radio } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { regUser } from "../../services/opertions/user";
import { toast } from "react-hot-toast";

const AddUser = () => {
  const [apiError, setApiError] = useState(""); // State for storing API error messages
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      const result = await regUser(values);
      if (!result.success) {
        setApiError(result.message); // Set the error message from the API response
      } else {
        setApiError(""); // Clear error if the registration was successful
        toast.success("User registered successfully!");
        // Redirect to home or do any additional action
        window.location.href = "/"; // Redirecting to home page after successful registration
      }
    } catch (error) {
      console.error("Registration error:", error);
      setApiError("An unexpected error occurred. Please try again."); // Set a generic error message
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

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
                label="User Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userid}
                name="userid"
                error={!!touched.userid && !!errors.userid}
                helperText={touched.userid && errors.userid}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.first_name}
                name="first_name"
                error={!!touched.first_name && !!errors.first_name}
                helperText={touched.first_name && errors.first_name}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.last_name}
                name="last_name"
                error={!!touched.last_name && !!errors.last_name}
                helperText={touched.last_name && errors.last_name}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.emailId}
                name="emailId"
                error={!!touched.emailId && !!errors.emailId}
                helperText={touched.emailId && errors.emailId}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phoneNo}
                name="phoneNo"
                error={!!touched.phoneNo && !!errors.phoneNo}
                helperText={touched.phoneNo && errors.phoneNo}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Amount"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ammount}
                name="ammount"
                error={!!touched.ammount && !!errors.ammount}
                helperText={touched.ammount && errors.ammount}
              />

              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Activation Date"
                InputLabelProps={{ shrink: true }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.joiningDate}
                name="joiningDate"
                error={!!touched.joiningDate && !!errors.joiningDate}
                helperText={touched.joiningDate && errors.joiningDate}
              />
              <Box gridColumn={isNonMobile ? "span 3" : "span 6"}>
                <label>User Type</label>
                <RadioGroup
                  row
                  name="userType"
                  value={values.userType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                  <FormControlLabel value="Users" control={<Radio />} label="User" />
                </RadioGroup>
                {touched.userType && errors.userType && (
                  <div style={{ color: 'red' }}>{errors.userType}</div>
                )}
              </Box>

              {/* User Status Toggle */}
              <Box gridColumn={isNonMobile ? "span 3" : "span 6"}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.userStatus === "Active"}
                      onChange={(event) => {
                        setFieldValue("userStatus", event.target.checked ? "Active" : "Deactive");
                      }}
                      name="userStatus"
                      color="primary"
                    />
                  }
                  label={values.userStatus === "Active" ? "Active" : "Deactive"}
                />
              </Box>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

// Validation schema
const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  userid: yup.string().required("required"),
  password: yup.string().required("required"),
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  emailId: yup.string().email("invalid email").required("required"),
  phoneNo: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
  joiningDate: yup.string().required("required"),
  userType: yup.string().required("User type is required"),
});

// Initialize form values
const initialValues = {
  userid: "",
  password: "",
  first_name: "",
  last_name: "",
  emailId: "",
  phoneNo: "",
  ammount: "",
  joiningDate: "",
  userStatus: "Active",
  userType: "",
};

export default AddUser;
