f<template>
    <v-layout class="overflow-visible mt-5" style="height: 56px;">
      <v-bottom-navigation
        v-model="value"
        color="blue"
        grow
      >

        
        <v-btn to="/admin/users">
          <v-icon>mdi-account-circle</v-icon>
  
          Usuarios
        </v-btn>
  
      
        <v-btn to="/admin/courts">
          <v-icon>mdi-tennis</v-icon>
  
          Pistas
        </v-btn>
  
        <v-btn to="/admin/reservations">
          <v-icon>mdi-calendar</v-icon>
  
          Reservas
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </template>


<script setup lang="ts">
  import { ref } from 'vue'

  const value = ref(1)
</script>