import {
  Box,
  Button,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { tokens } from "../../theme"; // Adjust the import path if necessary
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import axios from "axios";

// API Base URL
const API_BASE_URL = "http://localhost:3200";

const dailyData = [
  // your daily data here...
];

const currentSessionData = {
  // your current session data here...
};

const dailyColumns = [
  // your daily columns here...
];

const sessionColumns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "nas_ip", headerName: "NAS-Ip", width: 150 },
  { field: "nas_port", headerName: "NAS-Port", width: 150 },
  { field: "mac_address", headerName: "MAC Address", width: 200 },
  { field: "ipv4_address", headerName: "IP Address", width: 150 },
  { field: "ipv6_prefix", headerName: "IPv6 Address", width: 150 },
  { field: "start_time", headerName: "Start Time", width: 200 },
  { field: "session_end_time", headerName: "End Time", width: 200 },
  { field: "upload", headerName: "Upload", width: 150 },
  { field: "download", headerName: "Download", width: 150 },
  { field: "total_data", headerName: "Total-Data", width: 150 },
];

const UserDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams(); // Get the user ID from the URL

  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [activeSection, setActiveSection] = useState("session");
  const [sessionData, setSessionData] = useState([]); // State to store session data

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/totalUsers/${id}`);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user details:", err); // Log the full error
        setError("Failed to fetch user details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Fetch session data for the specific user from the backend
  useEffect(() => {
    const fetchSessions = async () => {
      if (activeSection === "session" && user) {
        try {
          const response = await axios.get(`${API_BASE_URL}/sessions/user/${user.username}`);
          // Check if the response data is empty and handle it accordingly
          setSessionData(response.data || []); // Set to an empty array if no data
        } catch (err) {
          console.error("Error fetching session data:", err);
          // Optionally log the error but do not set an error state
          setSessionData([]); // Set to an empty array if there's an error
        }
      }
    };

    fetchSessions();
  }, [activeSection, user]); // Fetch session data when active section changes or user data is available

  const handleTerminateSession = async (sessionId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/disconnect`, {
        username: user?.username, // The username of the user
        sessionId, // Use session details
        macAddress: currentSessionData.macAddress,
      });
      alert(response.data.message);
      // Refresh session data after termination
      setSessionData((prevSessions) =>
        prevSessions.filter((session) => session.id !== sessionId)
      );
    } catch (error) {
      console.error("Error terminating session:", error);
      alert("Failed to terminate session. Please try again.");
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "session":
        return sessionData.length > 0 ? (
          <DataGrid
            rows={sessionData} // Load the session data fetched from the backend
            columns={sessionColumns}
            pageSize={5}
            rowsPerPageOptions={[10]}
            autoHeight
            getRowId={(row) => row.id} // Make sure each row has a unique identifier
            onRowDoubleClick={(rowData) => handleTerminateSession(rowData.id)} // Allow double-click to terminate session
          />
        ) : (
          <Typography>No active sessions found for this user.</Typography>
        );
      case "daily":
        return (
          <DataGrid
            rows={dailyData}
            columns={dailyColumns}
            pageSize={5}
            rowsPerPageOptions={[10]}
            autoHeight
          />
        );
      case "current":
        return (
          <Box>
            {Object.entries(currentSessionData).map(([key, value]) => (
              <Box
                key={key}
                display="flex"
                justifyContent="space-between"
                sx={{ margin: "5px 0" }}
              >
                <Typography>
                  {key.charAt(0).toUpperCase() +
                    key.slice(1).replace(/([A-Z])/g, " $1")}
                  :{" "}
                </Typography>
                <Typography>{value}</Typography>
              </Box>
            ))}
            <Box sx={{ marginTop: "2px", marginLeft: "43%" }}>
              <Button variant="contained" onClick={() => handleTerminateSession(currentSessionData.sessionId)}>
                Terminate Session
              </Button>
            </Box>
          </Box>
        );
      case "payment":
        return (
          <Typography>Payment Details for {user?.username || "N/A"}</Typography>
        );
      default:
        return <Typography>Select a section</Typography>;
    }
  };

  return (
    <Box m="20px">
      <Header title="USER DETAILS" />
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box display="flex">
          {/* User Details Box */}
          <Box
            m="40px 0 0 0"
            height="67vh"
            display="flex"
            flexDirection="column"
            sx={{
              border: `1px solid ${colors.blueAccent[700]}`,
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: colors.primary[400],
            }}
          >
            {user ? (
              <>
                {/* Each Typography pair wrapped in a flex container */}
                {Object.entries(user).map(([key, value]) => (
                  <Box display="flex" justifyContent="space-between" mb={1} key={key}>
                    <Typography>{key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}:</Typography>
                    <Typography>{value}</Typography>
                  </Box>
                ))}
              </>
            ) : (
              <Typography>No user data available.</Typography>
            )}
          </Box>

          {/* Section Buttons and Output Space */}
          <Box sx={{ marginLeft: "20px", flex: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
              {["session", "daily", "current", "payment"].map((section) => (
                <Box key={section} sx={{ marginLeft: "10px" }}>
                  <Button
                    variant="contained"
                    onClick={() => setActiveSection(section)}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)} Details
                  </Button>
                </Box>
              ))}
            </Box>

            {/* Output Area for DataGrid */}
            <Box
              sx={{
                border: `1px solid ${colors.blueAccent[700]}`,
                borderRadius: "8px",
                padding: "10px",
                height: "66vh", // Adjust height as needed
                backgroundColor: colors.primary[400],
              }}
            >
              {renderSection()}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UserDetails;
