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
                        endDate: d.endDate,
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

                if (response.ok) {
                    const data = await response.json();
                    const newReservation = { ...data }
                    reservations.push(newReservation)
                    console.log('Reserva registrada correctamente:', data);
                    return { success: true, message: 'Reserva registrada correctamente' };
                } else {
                    console.log('Error al registrar la reserva');
                    return { success: false, message: 'Error al registrar la reserva' };
                }
            } catch (error) {
                console.log('Error:', error);
                return  { success: false, message: 'Error en la conexión con el servidor' };
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



        async function deleteReservation (id:number) {
            try {
                const response = await fetch(`http://localhost:3000/reservations/${id}`, {
                    method: 'DELETE',
                    headers: {"Content-type": "application/json;charset=UTF-8"},
                })

                if(response.ok) {
                    const index = reservations.findIndex(r => r.id === id);
                    if (index !== -1) {
                        reservations.splice(index, 1);
                    }
                    console.log('Reserva eliminada correctamente');
                    return { success: true, message: 'Reserva eliminada' };
                } else {
                    console.log('Error al eliminar la reserva');
                    return { success: false, message: 'Error al eliminar reserva' };
                }
                
            } catch (error) {
                console.log('Error: ', error);
                return  { success: false, message: 'Error en la conexión con el servidor' };
            }
        }


        function getReservationsByDateandTime(selectedDate: Date, endDate: Date) {

            //Pasar fechas a .getTime para poder compararlas
            const selectedStartTime = new Date(selectedDate).getTime();
            const selectedEndTime = new Date(endDate).getTime();
            
            console.log('Filtrando reservas entre:', new Date(selectedStartTime).toISOString(), '-', new Date(selectedEndTime).toISOString());
          
            return reservations.filter((reservation) => {
                const reservationStart = new Date(reservation.date).getTime();
                const reservationEnd = new Date(reservation.endDate).getTime();
                
                // Verifica solape pero se permite coger una reserva si termina otra
                const isConflict = selectedStartTime < reservationEnd && selectedEndTime > reservationStart && !(selectedStartTime === reservationEnd || selectedEndTime === reservationStart);
            
                console.log('Conflicto: ', isConflict);
                return isConflict;
            });
          }

    


    return { reservations, fetchAll, addReservation, modifyReservation, searchReservation, getReservationsByDateandTime, deleteReservation }
})

