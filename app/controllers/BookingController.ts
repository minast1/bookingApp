//import type { Booking } from "@prisma/client";
import { db } from "~/lib/db.server";


export const createNewBookingRecord = async (formId: string) => {

    const booking = await db.booking.create({
        data: {
            
            user: {
                connect : {id: formId}
            }
        
        }
    });
    
    return booking; 
    
}

export const getCurrentBooking = async () => {
    const booking = await db.booking.findMany({
        orderBy: {
            id: 'desc'
        },
        take: 1
    });
    return booking
}