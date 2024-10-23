import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const TotalUsers = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 70 },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      minWidth: 150,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <Link
          to={`/user/${params.row.id}`} // Link to user detail page
          style={{ textDecoration: 'none', color: colors.greenAccent[300] }}
        >
          <Typography>{params.value}</Typography>
        </Link>
      ),
    },
    { field: "status", headerName: "Status", flex: 0.7, minWidth: 100 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "phone", headerName: "Phone Number", flex: 1, minWidth: 120 },
    { field: "email", headerName: "Email", flex: 1, minWidth: 200 },
    { field: "address", headerName: "Address", flex: 1, minWidth: 200 },
    { field: "activationDate", headerName: "Activation Date", flex: 1, minWidth: 150 },
    { field: "createdOn", headerName: "Created On", flex: 1, minWidth: 150 },
    { field: "expiryDate", headerName: "Expiry Date", flex: 1, minWidth: 150 },
    { field: "ipAddress", headerName: "IP Address", flex: 1, minWidth: 150 },
    { field: "macAddress", headerName: "MAC Address", flex: 1, minWidth: 150 },
    { field: "package", headerName: "Package ID", flex: 0.8, minWidth: 100 },
    { field: "uploadSpeed", headerName: "Upload (Mbps)", flex: 0.7, minWidth: 100 },
    { field: "downloadSpeed", headerName: "Download (Mbps)", flex: 0.7, minWidth: 100 },
  ];
  

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Set loading to true at the start
      try {
        const response = await fetch('http://localhost:3200/totalUsers'); // Adjusted to match your backend port
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
  
    fetchUsers();
  }, []);
  
 
  
 

  return (
    <Box m="20px">
      <Header title="Total Users" subtitle="Managing the Users" />
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Box
          m="40px 0 0 0"
          height="74vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid checkboxSelection rows={users} columns={columns} />
        </Box>
      )}
    </Box>
  );
};

export default TotalUsers;
