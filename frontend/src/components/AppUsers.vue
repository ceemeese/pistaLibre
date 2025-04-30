<template>
    <v-table
      height="300px"
      fixed-header
    >
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Surname
          </th>
          <th class="text-left">
            Email
          </th>
          <th class="text-left">
            Password
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.name"
        >
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.password }}</td>
        </tr>
      </tbody>
    </v-table>
  </template>

<script setup lang="ts">

  import { reactive, onMounted } from 'vue';

  interface Users {
      id: number;
      name: string;
      surname: string;
      email: string;
      password: string;
  }

  const users = reactive(new Array<Users>())

  function fetchAll() {

    if (users.length === 0) {
      fetch('http://localhost:3000/users') 
      .then(response => response.json())
      .then(data => {
        const usersInfo = data.map((d:Users) => ({
          id: d.id,
          name: d.name,
          surname: d.surname,
          email: d.email,
          password: d.password,
        }))
        console.log('Datos registrados correctamente');
        users.push(... usersInfo)
      })
      .catch(error => {
        console.log('Error en cargar usuarios:', error);
      })
    }
    
  }

  onMounted(() => {
    fetchAll();
  });

</script>

<style scoped>

</style>