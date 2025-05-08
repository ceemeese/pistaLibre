import type { Court, NewCourt } from "@/types/court";
import { defineStore } from "pinia";
import { isJSDocClassTag } from "typescript";
import { reactive, ref } from "vue";

export const useCourtsStore = defineStore('courts', () => {

    const courts = reactive(new Array<Court>())
    const isLoaded = ref(false)


    async function fetchAll() {
    
        if (courts.length === 0) {
            try {
                const response = await fetch('http://localhost:3000/courts');
                const data =  await response.json();

                const courtsInfo = data.map((c:Court) => ({
                    id: c.id,
                    name: c.name,
                    indoor: c.indoor,
                    active: c.active
                }))

                courts.push(... courtsInfo);
                console.log('Pistas registradas correctamente');

            } catch (error) {
                console.log('Error en cargar las pistas:', error);
            }
        } 

    }


    async function addCourt(court:NewCourt) {

        try {
            const response = await fetch('http://localhost:3000/courts', {
                method: "POST",
                headers: {"Content-type": "application/json;charset=UTF-8"},
                body: JSON.stringify(court)
            })
            const data = await response.json();

            if (response.ok) {
                const newCourt = { ...data }
                courts.push(newCourt)
                console.log('Pista registrada correctamente:', data);
                return { success: true, message: 'Pista registrada correctamente' };
            } else {
                console.log('Error al registrar pista');
                return { success: false, message: 'Error al registrar pista' };
            }
        } catch (error) {
            console.log('Error:', error);
            return  { success: false, message: 'Error en la conexión con el servidor' };
        }  

    }


    async function modifyCourt (id:number, name:string, indoor:boolean, active:boolean) {

        try {
            const response = await fetch(`http://localhost:3000/courts/${id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json;charset=UTF-8"},
                body: JSON.stringify( {name, indoor, active})
            })

            const data = await response.json();

            if (response.ok) {
                const courtModified = courts.findIndex( court => court.id === id);
                //confirmar si se encuentra o no la pusta y devolver índice
                if (courtModified !== -1) {
                    courts[courtModified] = { ...courts[courtModified], ...data};
                }

                console.log('Pista modificada correctamente: ', data);  
            }
        } catch (error) {
           console.log('Error: ', error);
        }

    } 


    async function searchCourt (id:number) {
        try {
            const response = await fetch(`http://localhost:3000/courts/${id}`)
            
            if (!response.ok) {
                throw new Error ('Pista no encontrada')
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.log('Error: ', error);
        }

    }



    async function deleteCourt (id:number) {
        try {
            const response = await fetch(`http://localhost:3000/courts/${id}`, {
                method: 'DELETE',
                headers: {"Content-type": "application/json;charset=UTF-8"},
            })

            if(response.ok) {
                const index = courts.findIndex(r => r.id === id);
                if (index !== -1) {
                    courts.splice(index, 1);
                }
                console.log('Pista eliminada correctamente');
                return { success: true, message: 'Pista eliminada' };
            } else {
                console.log('Error al eliminar la pista');
                return { success: false, message: 'Error al eliminar la pista' };
            }
            
        } catch (error) {
            console.log('Error: ', error);
            return  { success: false, message: 'Error en la conexión con el servidor' };
        }
    }



    return { courts, fetchAll, addCourt, modifyCourt, searchCourt, deleteCourt, isLoaded
    }

})