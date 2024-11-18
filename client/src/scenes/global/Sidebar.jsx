// src/components/Sidebar.jsx
import { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import PaymentIcon from "@mui/icons-material/Payment";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import TodayIcon from "@mui/icons-material/Today";
import { UserContext } from "../../context/UserContext"; // Correctly import UserContext

// Icon mapping for titles
const icons = {
  "Dashboard": <HomeOutlinedIcon />,
  "Total Users": <PeopleOutlinedIcon />,
  "Create User": <PersonAddAltIcon />,
  "Update User": <PersonAddAltIcon />,
  "Send Reminder": <PaymentIcon />,
  "Approve Payment": <PaymentIcon />,
  "All payment": <PaymentIcon />,
  "Save Meal": <RestaurantIcon />,
  "All Meal": <RestaurantIcon />,
  "Today Meal": <TodayIcon />,
};

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userData } = useContext(UserContext); // Use useContext to get user data
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMINIS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                {/* Replace the image with a dynamic one from userData */}
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={userData?.user?.userDetails?.Image || `../../assets/user.png`} // Fallback image
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {`${userData?.user?.userDetails?.first_name ?? "User"} ${
                    userData?.user?.userDetails?.last_name ?? "Name"
                  }`}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {userData?.user?.userType || "Role"} {/* Fallback role */}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {/* Dashboard */}
            <Item
              title="Dashboard"
              to="/"
              icon={icons["Dashboard"]}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Users Section */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Users
            </Typography>
            <Item
              title="Total Users"
              to="/totalUsers"
              icon={icons["Total Users"]}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Create User"
              to="/userReg"
              icon={icons["Create User"]}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Update User"
              to="/UpdateUser"
              icon={icons["Update User"]}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Payment Section */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Payment
            </Typography>
            <Item
              title="Send Reminder"
              to="/requestPayment"
              icon={icons["Send Reminder"]}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Approve Payment"
              to="/approvePayment"
              icon={icons["Approve Payment"]}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="All payment"
              to="/totalPayment"
              icon={icons["All payment"]}
              selected={selected}
              setSelected={setSelected}
            />

            {/* Meal Section */}
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Meal
            </Typography>
            <Item
              title="Save Meal"
              to="/saveMeal"
              icon={icons["Save Meal"]}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="All Meal"
              to="/allMeal"
              icon={icons["All Meal"]}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Today Meal"
              to="/todayMeal"
              icon={icons["Today Meal"]}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
