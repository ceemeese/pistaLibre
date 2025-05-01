<template>
    <v-table
      height="300px"
      fixed-header
    >
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Indoor
          </th>
          <th class="text-left">
            Activa
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="court in store.courts" :key="court.id">
          <td>{{ court.id }}</td>
          <td>{{ court.name }}</td>
          <td>{{ court.indoor }}</td>
          <td>{{ court.active }}</td>
        </tr>
      </tbody>
    </v-table>
  </template>

<script setup lang="ts">

  import { onMounted } from 'vue';
  import { useCourtsStore } from '@/stores/courtStore';

  const store = useCourtsStore();


  onMounted(() => {
    store.fetchAll();
  });

</script>

<style scoped>

</style>