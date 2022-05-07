import type {  Session } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime";
//import invariant from "tiny-invariant";
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

type updateTypes = {
    Id: string 
    start_city?: string
    destination?: string
    date?: Date 
    seats?: string[]
    price?: Decimal
    session?: Session
    paid?: boolean
}
export const updateBooking = async (params: updateTypes) => {
    //invariant(params.userId);
    const data = await db.booking.update({
        where: { id : params.Id },
        data: {
            start_city: params.start_city ? params.start_city : undefined,
            destination: params.destination ? params.destination : undefined,
            date: params.date ? params.date : undefined,
            seats: params.seats ? params.seats : undefined,
            price: params.price ? params.price : undefined,
            session: params.session ? params.session : undefined,
            paid: params.paid && params.paid 
            
        }
    });
    return data; 
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