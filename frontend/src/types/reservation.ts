export interface NewReservation {
    courtId: number;
    userId: number;
    date: string;
    startTime: string;
    endTime: string;
}


export interface Reservation extends NewReservation {
    id: number;
    status: string;
}