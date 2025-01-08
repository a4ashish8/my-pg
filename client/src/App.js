import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Error from "./scenes/global/Error";

import { UserProvider } from './context/UserContext';

import Dashboard from "./scenes/dashboard";

import AllUser from "./scenes/user/allUser";
import AddUser from "./scenes/user/addUser";
import EditUser from "./scenes/user/editUser";

import Login from "./scenes/login/Login";

import MealForm from "./scenes/meal/saveMeal";
import AllMeal from "./scenes/meal/allMeal";
import TodayMeal from "./scenes/meal/todayMeal";

import RequestPayment from "./scenes/payment/sendReminer";
import ApproveUserPayment from "./scenes/payment/ApproveUserPayment";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", JSON.stringify(true));
  };

  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  //   localStorage.removeItem("isAuthenticated");
  //   localStorage.removeItem("userData"); // Clear user data on logout
  // };

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.removeItem("isAuthenticated");
    }
  }, [isAuthenticated]);

  return (
    <UserProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {isAuthenticated && <Sidebar isSidebar={isSidebar} />}
            <main className="content">
              {isAuthenticated && <Topbar setIsSidebar={setIsSidebar} />}
              <Routes>
                <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/totalUsers" element={isAuthenticated ? <AllUser /> : <Navigate to="/login" />} />
                <Route path="/userReg" element={isAuthenticated ? <AddUser /> : <Navigate to="/login" />} />
                <Route path="/updateUser" element={isAuthenticated ? <EditUser /> : <Navigate to="/login" />} />
                <Route path="/saveMeal" element={isAuthenticated ? <MealForm /> : <Navigate to="/login" />} />
                <Route path="/allMeal" element={isAuthenticated ? <AllMeal /> : <Navigate to="/login" />} />
                <Route path="/todayMeal" element={isAuthenticated ? <TodayMeal /> : <Navigate to="/login" />} />
                <Route path="/requestPayment" element={isAuthenticated ? <RequestPayment /> : <Navigate to="/login" />} />
                <Route path="/approveUserPayment" element={isAuthenticated ? <ApproveUserPayment /> : <Navigate to="/login" />} />

                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/*" element={<Error />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </UserProvider>
  );
}

export default App;
