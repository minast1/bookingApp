/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import DepartureBoardOutlinedIcon from "@mui/icons-material/DepartureBoardOutlined";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMediaQuery, useTheme } from "@mui/material";
import { useOutletContext } from "@remix-run/react";
import type { dataType } from "../dashboard";
import { useNavigate } from "@remix-run/react";
import Paper from "@mui/material/Paper";
import styles from "~/styles/carousel.min.css";
import Slider from "~/components/Slider";
const sessions = [
  { label: "Morning", value: "MORNING" },
  { label: "Afternoon", value: "AFTERNOON" },
  { label: "Evening", value: "EVENING" },
];
const IndexPage = () => {
  //const data = useOutletContext<dataType>();

  //const bookings = data.bookings;
  //const navigate = useNavigate();
  //const confirmReservation = useActionData();

  return (
    <>
      <Slider />
    </>
  );
};

export default IndexPage;

export let loader: LoaderFunction = async ({ request }) => {
  //const session = await getSession(request.headers.get("cookie"));
  //const user = session.get("user");

  return null;
};

export let action: ActionFunction = async ({ request }) => {
  return null;
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
