import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";
import { duesPayment, sendReminder, updatePaymentStatus } from "../../services/opertions/payment";

const RequestPayment = () => {
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // State for loading status
  // const navigate = useNavigate(); // Navigation hook

  const [dialogOpen, setDialogOpen] = useState(false); // Dialog visibility
  const [selectedUser, setSelectedUser] = useState(null); // Selected user data
  const [comment, setComment] = useState(""); // Comment input
  const [status, setStatus] = useState(""); // Payment status

  const sendMail = async (id, amount, emailId) => {
    console.log("Send mail triggered for ID:", id);

    const data = {
      userId: id, // or simply `id` if key and value are the same
      ammount: amount || 0,
      email: emailId
    };

    await sendReminder(data);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await duesPayment(); 
        // Call the API function
        // Process and set user data
        const formattedUsers = data.userDetails.map((user) => {
          const dues = data.userDues[user._id] || {}; // Get dues for the user ID or default to an empty object

          return {
            id: user._id,
            name: `${user.userDetails.first_name} ${user.userDetails.last_name}` || "N/A",
            phone: user.userDetails.phoneNo || "N/A",
            email: user.userDetails.emailId || "N/A",
            ammount: user.userDetails.ammount || 0,
            joiningDate: user.userDetails.joiningDate || "N/A",
            duesMonth: dues.duesMonth || "N/A",
            duesYear: dues.duesYear || "N/A",
            duesAmount: dues.duesAmount || 0,
            paymentDate: dues.paymentDate || "N/A",
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
      <Header title="Dues Management" subtitle="Send Payment Reminders || Approve Payments" />

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: "30px", overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "secondary.main",
                  "& th": {
                    color: "white",
                    fontWeight: "bold",
                  },
                }}
              >
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
                <TableCell>Send Reminder</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.joiningDate !== "N/A"
                      ? new Date(user.joiningDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      : "N/A"}
                  </TableCell>
                  <TableCell>{user.duesMonth}</TableCell>
                  <TableCell>{user.duesYear}</TableCell>
                  <TableCell>{user.duesAmmount}</TableCell>
                  <TableCell>
                    {user.paymentDate !== "N/A"
                      ? new Date(user.paymentDate).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      : "N/A"}
                  </TableCell>
                  <TableCell>{user.paymentStatus}</TableCell>
                  <TableCell>
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => sendMail(user.id, user.ammount, user.email)}
                    >
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
