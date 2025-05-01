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
          v-for="user in store.users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.password }}</td>
        </tr>
      </tbody>
    </v-table>
  </template>

<script setup lang="ts">

  import { onMounted } from 'vue';
  import { useUsersStore } from '@/stores/userStore';

  const store = useUsersStore();


  onMounted(() => {
    store.fetchAll();
  });

</script>

<style scoped>

</style>