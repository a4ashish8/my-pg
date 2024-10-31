import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/opertions/user";
import { getAllUserExcel } from "../../services/opertions/excel";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const TotalUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      const formattedUsers = (res.users || []).map((user) => ({
        id: user._id,
        username: user.userId,
        status: user.userStatus === "Active" ? "Active" : "Deactivate",
        name: `${user.userDetails.first_name} ${user.userDetails.last_name}`,
        phone: user.userDetails.phoneNo,
        email: user.userDetails.emailId,
      }));
      setUsers(formattedUsers);
    } catch (error) {
      console.error("Could not fetch user details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const downloadExcel = async () => {
    await getAllUserExcel(); // Call your function to download Excel
  };

  return (
    <Box m="20px">
      <Header title="Total Users" subtitle="Managing the Users" />
      <Button
        variant="contained"
        color="primary"
        startIcon={<FileDownloadIcon />}
        onClick={downloadExcel} // Call the download function on click
      >
        Export to Excel
      </Button>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ marginTop: "30px", overflowX: "auto" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default TotalUsers;
