import { reactive, ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { NewUser, User } from '@/types/user'

export const useUsersStore = defineStore('users', () => {

    const users = reactive(new Array<User>())

    const loggedUser = ref<User | null>(null)
    const isAuthenticated = computed(() => !!loggedUser.value)


    async function fetchAll() {

        if (users.length === 0) {
            try {
                const response = await fetch('http://localhost:3000/users');
                const data =  await response.json();

                const usersInfo = data.map((d:User) => ({
                    id: d.id,
                    name: d.name,
                    surname: d.surname,
                    email: d.email,
                    password: d.password,
                }))

                users.push(... usersInfo);
                console.log('Datos registrados correctamente');

            } catch (error) {
                console.log('Error en cargar usuarios:', error);
            }
        } 
        
    }


    
    async function addUser(user:NewUser) {

        try {
            const response = await fetch('http://localhost:3000/users', {
                method: "POST",
                headers: {"Content-type": "application/json;charset=UTF-8"},
                body: JSON.stringify(user)
            })
            const data = await response.json();

            if (response.ok) {
                const newUser = { ...data }
                users.push(newUser)
                console.log('Datos registrados correctamente:', data);
            }
        } catch (error) {
            console.log('Error:', error);
        }  

    }



    async function modifyUser (id:number, email:string, password:string) {

        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json;charset=UTF-8"},
                body: JSON.stringify( {email, password})
            })

            const data = await response.json();

            if (response.ok) {
                const userModified = users.findIndex( user => user.id === id);
                //confirmar si se encuentra o no el usuario y devolver índice
                if (userModified !== -1) {
                    users[userModified] = { ...users[userModified], ...data};
                }

                console.log('Usuario modificado correctamente: ', data);  
            }
        } catch (error) {
           console.log('Error: ', error);
        }

    } 



    async function searchUser (id:number) {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`)
            
            if (!response.ok) {
                throw new Error ('Usuario no encontrado')
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.log('Error: ', error);
        }

    }


    function login(user: User) {
        loggedUser.value = user
    }
    
    function logout() {
        loggedUser.value = null
    }
    



  return { users, fetchAll, addUser, modifyUser, searchUser, isAuthenticated, login, logout}
})