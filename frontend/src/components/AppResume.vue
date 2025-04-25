<template>
    <v-card class="pa-6">
      <v-row class="flex-column flex-md-row">
        
        
        <v-col cols="12" md="6" >
          <v-card-title class="text-h6 text-center text-md-left">
            Resumen de la reserva
          </v-card-title>
  
          <v-list dense class="text-center text-md-left">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Pista: {{ pista }}</v-list-item-title>
                <v-list-item-title>Fecha: {{ reserva.fecha }}</v-list-item-title>
                <v-list-item-title>Hora: {{ reserva.hora }}</v-list-item-title>
                <v-list-item-title>Nombre: {{ cliente.nombre }}</v-list-item-title>
                <v-list-item-title>Correo: {{ cliente.email }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
  
          
          <v-form @submit.prevent="$emit('confirmar', cliente)">
            <v-row
              class="mt-4 pl-4"
              no-gutters
              justify="center"
              justify-md="start"
              
            >
                
                <v-btn
                    color="grey"
                    class="mr-2"
                    @click="$emit('cancelar')"
                >
                    Cancelar
                </v-btn>
                <v-btn
                    color="primary"
                    type="submit"
                >
                    Confirmar
                </v-btn>
                
            </v-row>
          </v-form>
        </v-col>
  
       
        <v-col
          cols="12"
          md="6"
          class="d-flex justify-center align-center mt-6 mt-md-0"
        >
          <CourtSchedule
            :reserva="reserva"
            :pista="pista"
            :reservas="reservasDia"
          />
        </v-col>
  
      </v-row>
    </v-card>
  </template>
  
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import CourtSchedule from './AppCourtSchedule.vue'
  
  defineProps<{
    pista: string
    reserva: {
      fecha: string
      hora: string
    }
  }>()
  
  defineEmits(['confirmar', 'cancelar'])
  
  const cliente = ref({
    nombre: 'Cris',
    email: 'cris@mail.com',
  })
  
  const reservasDia = ref([
    { hora: '10:30' },
    { hora: '12:00' },
    { hora: '18:30' },
  ])
  </script>
  