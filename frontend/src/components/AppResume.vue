<template>
    <v-card class="pa-6">
      <v-row class="flex-column flex-md-row">
        
        
        <v-col cols="12" md="6" >
          <v-card-title class="text-h6 text-center text-md-left">
            Resumen de la reserva
          </v-card-title>
  
          <v-list dense class="text-center text-md-left">
            <v-list-item>
                <v-list-item-title>{{ selectedCourtObject?.name }} </v-list-item-title>
                <v-list-item-title>Fecha: {{ dateFormated }} </v-list-item-title>
                <v-list-item-title>Hora inicio: {{ initialHourFormated }} </v-list-item-title>
                <v-list-item-title>Fecha fin: {{ endHourFormated }} </v-list-item-title>               
                <v-list-item-title>{{  }} </v-list-item-title>
            </v-list-item>
          </v-list>
  
          
          <v-form>
            <v-row
              class="mt-4 pl-4"
              no-gutters
              justify="center"
              justify-md="start"
              
            >
                
                <v-btn
                    color="grey"
                    class="mr-2"
                    @click="cancel"
                >
                    Cancelar
                </v-btn>
                <v-btn
                    color="primary"
                    @click="confirm"
                >
                    Confirmar
                </v-btn>
                
            </v-row>
          </v-form>
        </v-col>
  
       <!--
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
        </v-col>-->
  
      </v-row>
    </v-card>
  </template>
  
  
  <script setup lang="ts">
  
  import type { Court } from '@/types/court';
  import { format } from 'date-fns';
  import { es } from 'date-fns/locale';
  


  //Propiedades recibidas del padre
  const { dateSelected, endDate, courtSelected, selectedCourtObject } = defineProps<{
      dateSelected: Date,
      endDate: Date,
      courtSelected: number
      selectedCourtObject: Court | null
  }>()
  
  

  const dateFormated = format(dateSelected, 'd MMMM yyyy', { locale: es });
  const initialHourFormated = format(dateSelected, ' HH:mm');
  const endHourFormated = format(endDate, ' HH:mm');


  //Eventos emitidos al padre
  const emit = defineEmits(['confirmReservation', 'cancelReservation'])

  function confirm() {
    emit('confirmReservation')
  }

  function cancel() {
    emit('cancelReservation')
  }
  
  </script>
  