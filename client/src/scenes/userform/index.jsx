import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const UserForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

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
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="20px"
              gridTemplateColumns="repeat(2, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: "span 2" },
              }}
            >
              {/* Adjusted Fields */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="User Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                name="userName"
                error={!!touched.userName && !!errors.userName}
                helperText={touched.userName && errors.userName}
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
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="IP Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ipAddress}
                name="ipAddress"
                error={!!touched.ipAddress && !!errors.ipAddress}
                helperText={touched.ipAddress && errors.ipAddress}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="User Package"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userPackage}
                name="userPackage"
                error={!!touched.userPackage && !!errors.userPackage}
                helperText={touched.userPackage && errors.userPackage}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="MAC Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.macAddress}
                name="macAddress"
                error={!!touched.macAddress && !!errors.macAddress}
                helperText={touched.macAddress && errors.macAddress}
              />
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Activation Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.activationDate}
                name="activationDate"
                error={!!touched.activationDate && !!errors.activationDate}
                helperText={touched.activationDate && errors.activationDate}
              />
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

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  userName: yup.string().required("required"),
  password: yup.string().required("required"),
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
  ipAddress: yup.string().matches(
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    "Invalid IP address"
  ).required("required"),
  userPackage: yup.string().required("required"),
  macAddress: yup.string().matches(
    /^([0-9a-fA-F]{2}[:-]){5}([0-9a-fA-F]{2})$/,
    "Invalid MAC address"
  ).required("required"),
  activationDate: yup.date().required("required").nullable(),
});

const initialValues = {
  userName: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
  ipAddress: "",
  userPackage: "",
  macAddress: "",
  activationDate: null, // Default to null for date field
};

export default UserForm;
