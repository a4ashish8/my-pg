import { useState } from "react";
import { Routes, Route } from "react-router-dom";

/*Css and theme code import here*/
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

/*header section load here*/
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";

// pages load here
import Dashboard from "./scenes/dashboard";
import Totalusers from "./scenes/totalUsers";
import UserForm from "./scenes/userform/index";






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
              <Route path="/userReg" element={<UserForm/>} />
              {/* <Route path='/*' element={<Error />} /> */}

            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
