import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { updateUser, getEditUser } from "../../services/opertions/user";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const [apiError, setApiError] = useState("");
  const [user, setUser] = useState(null); // State to store the user data
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    try {
     
      const result = await updateUser(values);
      if (!result.success) {
        setApiError(result.message);
      } else {
        setApiError("");
        toast.success("User updated successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Update user error:", error);
      setApiError("An unexpected error occurred. Please try again.");
    }
  };

  const fetchUser = async () => {
    try {
      const res = await getEditUser();
    
      if (res && res.users) {
        const userData = {
          _id :res.users.userDetails._id,
          first_name: res.users.userDetails.first_name,
          last_name: res.users.userDetails.last_name,
          emailId: res.users.userDetails.emailId,
          phoneNo: res.users.userDetails.phoneNo,
          amount: res.users.userDetails.ammount,
        };
        setUser(userData); // Set user data in state
       
      }
    } catch (error) {
      console.error("Could not fetch user details", error);
    }
  };

  useEffect(() => {
    fetchUser();
    
  }, []);

  return (
    <Box m="20px">
      <Header title="Update USER" subtitle="Update a User Profile" />

      {apiError && (
        <Box color="red" mb={2}>
          {apiError}
        </Box>
      )}

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={user || {}} // Use fetched user data as initial values
        validationSchema={checkoutSchema}
        enableReinitialize // Reinitialize form when user data changes
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          isValid,
          isSubmitting,
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
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
              />
            <input type="hidden" value={values._id}></input>

            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" disabled={!isValid || isSubmitting}>
                Update User
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
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  emailId: yup.string().email("invalid email").required("required"),
  phoneNo: yup.string().matches(phoneRegExp, "Phone number is not valid").required("required"),
});

export default EditUser;
