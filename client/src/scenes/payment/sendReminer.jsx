import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { duesPayment } from "../../services/opertions/payment";

const RequestPayment = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // State for loading status
  const navigate = useNavigate(); // Navigation hook

  const sendMail = async (id) => {
    console.log(id)
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await duesPayment(); // Call the API function  
        // Process and set user data
        const formattedUsers = data.userDetails.map((user) => {
          const dues = data.userDues[user._id] || {}; // Get the first dues object for the user ID or default to an empty object
          console.log(dues)

          return {
            id: user._id,

            name: `${user.userDetails.first_name} ${user.userDetails.last_name}` || "N/A",
            phone: user.userDetails.phoneNo || "N/A", // Replace with actual property if exists
            email: user.userDetails.emailId, // Assuming `userId` is the email  
            joiningDate: user.userDetails.joiningDate,
            duesMonth: dues.duesMonth || "N/A",
            duesYear: dues.duesYear || "N/A",
            duesAmount: dues.duesAmount || 0,
            paymentDate: dues.paymentDate,
            paymentStatus: dues.status || "Not Done",
          };
        });

        setUsers(formattedUsers); // Update state with formatted data
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error("Error fetching payment data:", error); // Log errors
        setLoading(false); // Stop loading even on error
      }
    };

    fetchData(); // Call the function to fetch data
  }, []); // Dependency array ensures this runs only on mount

  return (
    <Box m="20px">
      <Header title="Total Users" subtitle="Managing the Users" />

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: "30px", overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>

                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Joining Date</TableCell>
                <TableCell>Dues Month</TableCell>
                <TableCell>Dues Year</TableCell>
                <TableCell>Dues Amount</TableCell>
                <TableCell>Payment Date</TableCell>
                <TableCell>Payment Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{new Date(user.joiningDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}</TableCell>
                  <TableCell>{user.duesMonth}</TableCell>
                  <TableCell>{user.duesYear}</TableCell>
                  <TableCell>{user.duesAmount}</TableCell>
                  <TableCell>{new Date(user.paymentDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                  })}</TableCell>
                  <TableCell>{user.paymentStatus}</TableCell>
                  <TableCell>
                    <Button color="secondary" variant="contained" onClick={() => sendMail(user.id)}>
                      Send Reminder
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default RequestPayment;
