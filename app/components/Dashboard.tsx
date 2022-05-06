import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import AccountMenu from "./AccountMenu";
import AppBar from "@mui/material/AppBar";
import { useMediaQuery, useTheme } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Tracker from "./Tracker";

type Props = {
  children: React.ReactNode;
};

const Dashboard: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: "flex",
                  md: "flex",
                  //justifyContent: "flex-start",
                },
              }}
            ></Box>
            <AccountMenu />
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            backgroundColor: theme.palette.grey[100],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Tracker />
            {children}
          </Container>
        </Box>
        <AppBar
          position="fixed"
          color="inherit"
          sx={{ top: "auto", bottom: 0, display: isMobile ? "flex" : "none" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
            <IconButton color="inherit">
              <HomeOutlinedIcon fontSize="large" />
            </IconButton>
            <IconButton color="inherit">
              <AccountBalanceWalletOutlinedIcon fontSize="large" />
            </IconButton>

            <IconButton color="inherit">
              <FmdGoodOutlinedIcon fontSize="large" />
            </IconButton>
            <IconButton color="inherit">
              <SettingsOutlinedIcon fontSize="large" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
