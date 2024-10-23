import { Box, Typography, useTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link as MuiLink } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/opertions/user";

const TotalUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      if (res.length > 0) {
        const formattedUsers = res.map((user) => ({
          id: user._id,
          username: user.userId,
          status: user.userStatus,
          name: `${user.userDetails.first_name} ${user.userDetails.last_name}`,
          phone: user.userDetails.phoneNo,
          email: user.userDetails.emailId,
          address: user.userDetails.address || "N/A",
          activationDate: user.userDetails.activationDate || "N/A",
          createdOn: user.userDetails.joiningDate || "N/A",
          expiryDate: user.userDetails.expiryDate || "N/A",
          ipAddress: user.userDetails.ipAddress || "N/A",
          macAddress: user.userDetails.macAddress || "N/A",
          package: user.userDetails.packageId || "N/A",
          uploadSpeed: user.userDetails.uploadSpeed || "N/A",
          downloadSpeed: user.userDetails.downloadSpeed || "N/A",
        }));
        setUsers(formattedUsers);
      }
      setLoading(false);
    } catch (error) {
      console.log("Could not fetch user details", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box m="20px">
      <Header title="Total Users" subtitle="Managing the Users" />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: "40px" }}>
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
                  <TableCell>
                    {user.username}
                  </TableCell>
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
