import {
  Box, Typography, Button, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Select, MenuItem,
  IconButton
} from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getAllUsers, statusUpdate } from "../../services/opertions/user";
import { getAllUserExcel } from "../../services/opertions/excel";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      const formattedUsers = (res.users || []).map((user) => ({
        id: user._id,
        username: user.userId,
        status: user.userStatus,
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
    await getAllUserExcel();
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const value = {
        _id: userId,
        userStatus: newStatus,
      };
      await statusUpdate(value);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );

    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleEdit = (userId) => {
    // Add your edit functionality here
    console.log("Edit user:", userId);
  };

  const handleDelete = (userId) => {
    // Add your delete functionality here
    console.log("Delete user:", userId);
  };


  return (
    <Box m="20px">
      <Header title="Total Users" subtitle="Managing the Users" />
      <Button
        variant="contained"
        color="primary"
        startIcon={<FileDownloadIcon />}
        onClick={downloadExcel}
      >
        Export to Excel
      </Button>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: "30px", overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Deactivate">Deactivate</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit" onClick={() => handleEdit(user.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(user.id)}>
                      <DeleteIcon />
                    </IconButton>
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

export default AllUser;
