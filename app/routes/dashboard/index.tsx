import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import DepartureBoardOutlinedIcon from "@mui/icons-material/DepartureBoardOutlined";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FormInputText } from "~/components/FormInputText";
import { FormInputDate } from "~/components/FormInputDate";
import SubmitButton from "~/components/SubmitButton";
import { bookingValidator } from "~/lib/validatorSchema";
import { ValidatedForm } from "remix-validated-form";
import Paper from "@mui/material/Paper";
import { FormInputDropdown } from "~/components/FormInputDropdown";
import { useOutletContext } from "@remix-run/react";
import type { Session } from "@prisma/client";
import { updateBooking } from "~/controllers/BookingController";
import type { dataType } from "../dashboard";
//import { getSession } from "~/lib/session.server";

const sessions = [
  { label: "Morning", value: "MORNING" },
  { label: "Afternoon", value: "AFTERNOON" },
  { label: "Evening", value: "EVENING" },
];
const IndexPage = () => {
  const data = useOutletContext<dataType>();

  return (
    <>
      <Card sx={{ mb: 5, mt: 3, backgroundColor: "white" }} elevation={15}>
        <Box display="flex" alignItems="center" ml={2} mt={2}>
          <Typography sx={{ fontWeight: "bold" }}>
            Please Provide the Route Details
          </Typography>
          <Box flexGrow={1} />
          <DepartureBoardOutlinedIcon fontSize="large" sx={{ mr: 3, mb: 2 }} />
        </Box>

        <CardContent sx={{ borderTop: "1px solid lightgray" }}>
          <ValidatedForm
            method="post"
            defaultValues={{ session: "MORNING" }}
            style={{ display: "flex", flexDirection: "column" }}
            resetAfterSubmit
            id="booking"
            validator={bookingValidator}
          >
            {" "}
            <FormInputText name="start_city" label="From" sx={{ mb: 1 }} />
            <FormInputText
              name="Id"
              value={data.bookings[0].id}
              sx={{ display: "none" }}
            />
            <FormInputText
              name="destination"
              label="Destination"
              sx={{ my: 2, mr: 2 }}
            />
            <FormInputDropdown
              name="session"
              label="Session"
              sx={{ mb: 2 }}
              options={sessions}
            />
            <FormInputDate name="date" />
            <SubmitButton title="Continue" formId="booking" />
          </ValidatedForm>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>

      <Paper
        square
        sx={{
          //backgroundImage: "url(/vip.jpg)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          background:
            'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("/vip.jpg")',
          height: 150,
          mb: 2,
          mt: 5,
        }}
        elevation={15}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          py={5}
          sx={{ color: "white" }}
        >
          <Typography gutterBottom>Shcedule For Today</Typography>
          <Typography>6:00 am</Typography>
          <Typography>1:00 pm</Typography>
          <Typography>3:pm</Typography>
        </Box>
      </Paper>
    </>
  );
};

export default IndexPage;

export let loader: LoaderFunction = async ({ request }) => {
  //const session = await getSession(request.headers.get("cookie"));
  //const user = session.get("user");

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const start_city = formData.get("start_city") as string;
  const destination = formData.get("destination") as string;
  const date = new Date(formData.get("date") as string);
  const session = formData.get("session") as Session;
  const Id = formData.get("Id") as string;

  return await updateBooking({
    start_city,
    destination,
    date,
    session,
    Id,
  });
};
