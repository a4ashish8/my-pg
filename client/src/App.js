import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Totalusers from "./scenes/totalUsers";
import Bar from "./scenes/bar";
import UserForm from "./scenes/userform";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import UserPackage from "./scenes/userPackage";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import UserDetails from "./scenes/userDetails";
import ExpiredUsers from "./scenes/expiredUser";
import ActiveUsers from "./scenes/activeUsers";
import TerminatedUsers from "./scenes/terminatedUsers";
import BlockedUsers from "./scenes/blockedUsers";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/totalUsers" element={<Totalusers />} />
              <Route path="/activeusers" element={<ActiveUsers/>} />
              <Route path="/expiredUsers" element={<ExpiredUsers />} />
              <Route path="/terminatedUsers" element={<TerminatedUsers />} />
              <Route path="/blockedUsers" element={<BlockedUsers />} />
              <Route path="/userform" element={<UserForm />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/userpackage" element={<UserPackage />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/" element={<Totalusers />} />
              <Route path="/user/:id" element={<UserDetails />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
