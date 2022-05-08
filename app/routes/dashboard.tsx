import type { Booking, Prisma, Session, User } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import React from "react";
import Dashboard from "~/components/Dashboard";
import {
  getCurrentBooking,
  updateBooking,
} from "~/controllers/BookingController";
import { authenticator } from "~/lib/auth.server";

export type userType = Omit<User, "password" | "createdAt">;

export type dataType = {
  user: userType;
  bookings: Booking[];
};
const DashboardLayout = () => {
  const data = useLoaderData<dataType>();
  return (
    <Dashboard>
      <Outlet context={data} />
    </Dashboard>
  );
};

export default DashboardLayout;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const button = formData.get("button") as string;
  let Id;
  switch (button) {
    case "route":
      const start_city = formData.get("start_city") as string;
      const destination = formData.get("destination") as string;
      const date = new Date(formData.get("date") as string);
      const session = formData.get("session") as Session;
      Id = formData.get("Id") as string;

      return await updateBooking({
        start_city,
        destination,
        date,
        session,
        Id,
      });
    case "seats":
      Id = formData.get("Id") as string;
      const seats = formData.getAll("seats") as string[];
      const price = Number(formData.get("price") as string);
      console.log(typeof price);
      return await updateBooking({ Id, seats, price });

    default:
      return await authenticator.logout(request, { redirectTo: "/" });
  }
};

export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  const bookings = user && (await getCurrentBooking());
  return { user: user, bookings: bookings };
};
