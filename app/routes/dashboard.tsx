import type { Booking, User } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import React from "react";
import Dashboard from "~/components/Dashboard";
import { getCurrentBooking } from "~/controllers/BookingController";
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
  //let formData = await request.formData();

  return await authenticator.logout(request, { redirectTo: "/" });
};

export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/",
  });

  const bookings = user && (await getCurrentBooking());
  return { user: user, bookings: bookings };
};
