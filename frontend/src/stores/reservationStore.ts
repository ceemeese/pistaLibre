import type { NewReservation, Reservation } from "@/types/reservation"
import { defineStore } from "pinia"
import { reactive } from "vue"

export const useReservationsStore = defineStore('reservations', () => {

    const reservations = reactive(new Array<Reservation>())


     async function fetchAll() {
    
            if (reservations.length === 0) {
                try {
                    const response = await fetch('http://localhost:3000/reservations');
                    const data =  await response.json();
    
                    const reservationsInfo = data.map((d:Reservation) => ({
                        id: d.id,
                        courtId: d.courtId,
                        userId: d.userId,
                        date: d.date,
                        startTime: d.startTime,
                        endTime: d.endTime,
                        status: d.status
                    }))
    
                    reservations.push(... reservationsInfo);
                    console.log('Reservas registradas correctamente');
    
                } catch (error) {
                    console.log('Error en cargar las reservas:', error);
                }
            } 

        }



        async function addReservation(reservation:NewReservation) {
        
            try {
                const response = await fetch('http://localhost:3000/reservations', {
                    method: "POST",
                    headers: {"Content-type": "application/json;charset=UTF-8"},
                    body: JSON.stringify(reservation)
                })

                const data = await response.json();
    
                if (response.ok) {
                    const NewReservation = { ...data }
                    reservations.push(NewReservation)
                    console.log('Reserva registrada correctamente:', data);
                }
            } catch (error) {
                console.log('Error:', error);
            } 

        }



        async function modifyReservation (id:number, courtId:number, date:string, startTime:string, endTime:string) {

            try {
                const response = await fetch(`http://localhost:3000/reservations/${id}`, {
                    method: "PUT",
                    headers: {"Content-type": "application/json;charset=UTF-8"},
                    body: JSON.stringify( {courtId, date, startTime, endTime})
                })
    
                const data = await response.json();
    
                if (response.ok) {
                    const reservationModified = reservations.findIndex( reservation => reservation.id === id);
                    //confirmar si se encuentra o no la reserva y devolver índice
                    if (reservationModified !== -1) {
                        reservations[reservationModified] = { ...reservations[reservationModified], ...data};
                    }
    
                    console.log('Reserva modificada correctamente: ', data);  
                }
            } catch (error) {
               console.log('Error: ', error);
            }

        } 



        async function searchReservation (id:number) {
            try {
                const response = await fetch(`http://localhost:3000/reservations/${id}`)
                
                if (!response.ok) {
                    throw new Error ('Reserva no encontrada')
                }
    
                const data = await response.json();
    
                return data;
            } catch (error) {
                console.log('Error: ', error);
            }

        }

    


    return { reservations, fetchAll, addReservation, modifyReservation, searchReservation }
})

