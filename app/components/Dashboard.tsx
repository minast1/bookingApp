/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import AccountMenu from "./AccountMenu";
import AppBar from "@mui/material/AppBar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Tracker from "./Tracker";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import {
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import type { dataType } from "~/routes/dashboard";
import type { Booking } from "@prisma/client";
import { useMediaQuery, useTheme } from "@mui/material";

type Props = {
  children: React.ReactNode;
};

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

const Dashboard: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const data = useLoaderData<dataType>();
  const currentBooking: Booking | null = data.bookings && data.bookings[0];
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const location = useLocation();

  /*React.useEffect(() => {
    fetcher.state === "submitting" &&
      navigate("/dashboard/addRoute", { replace: true });
  }, [fetcher]);*/
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
            {currentBooking && <Tracker booking={currentBooking} />}
            {children}
          </Container>
        </Box>
        <AppBar
          position="fixed"
          color="inherit"
          sx={{ top: "auto", bottom: 0, display: isMobile ? "flex" : "none" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
            <IconButton color="inherit" sx={{ ml: 3 }}>
              <HomeOutlinedIcon fontSize="large" />
            </IconButton>
            <StyledFab
              color="secondary"
              disabled={
                location.pathname === "/dashboard/addRoute" ||
                location.pathname === "/dashboard/selectSeats"
                  ? true
                  : false
              }
              onClick={() => {
                const formData = new FormData();
                formData.append("userId", data.user.id);
                fetcher.submit(formData, {
                  method: "post",
                  action: "/dashboard/latestBooking",
                });
              }}
            >
              <AddIcon />
            </StyledFab>
            <Box flexGrow={1} />
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
