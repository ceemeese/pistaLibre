export interface NewReservation {
    courtId: number;
    userId: number;
    date: Date;
    endDate: Date;
}


export interface Reservation extends NewReservation {
    id: number;
}