import {  IconButton, Dialog, DialogTitle,  DialogContent,DialogActions,  MenuItem,  Select,  FormControl,  InputLabel,  TextField, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

// import { useNavigate } from "react-router-dom";
import { duesPayment, sendReminder } from "../../services/opertions/payment";

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
  // Save data and close dialog
  const handleSave = () => {
    console.log("Payment ID (hidden):", selectedUser.paymentId);
    console.log("Selected Status:", status);
    console.log("Comment:", comment);
    handleDialogClose();
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
            paymentId: dues.paymentId,

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

  // Handle dialog open with user data
  const handleDialogOpen = (user) => {
    setSelectedUser(user);
    setStatus(user.paymentStatus || "");
    setComment("");
    setDialogOpen(true);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedUser(null);
    setComment("");
    setStatus("");
  };



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
                  <TableCell>{user.duesAmount}</TableCell>
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
          <IconButton onClick={() => handleDialogOpen(user)}>
            <EditIcon />
          </IconButton>
        </TableCell>
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


<Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Edit Payment</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <>
              <Typography>Name: {selectedUser.name}</Typography>
              <FormControl fullWidth margin="dense">
                <InputLabel>Status</InputLabel>
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value="Not Done">Not Done</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="dense"
                label="Comment"
                multiline
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>         


    </Box>
  );









};

export default RequestPayment;
