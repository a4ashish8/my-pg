import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Error from "./scenes/global/Error";
import {UserProvider} from './context/UserContext';
// pages load here
import Dashboard from "./scenes/dashboard";
import Totalusers from "./scenes/totalUsers";
import UserForm from "./scenes/userform/index";
import UpdateUser from "./scenes/userUpdate/index";
import Login from "./scenes/login/Login";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

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
              <Route
                path="/"
                element={
                  isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/totalUsers"
                element={
                  isAuthenticated ? <Totalusers /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/userReg"
                element={
                  isAuthenticated ? <UserForm /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/updateUser"
                element={
                  isAuthenticated ? <UpdateUser /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/login"
                element={<Login onLogin={handleLogin} />}
              />
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
