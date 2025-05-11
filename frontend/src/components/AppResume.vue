<template>
    <v-card class="pa-6">
      <v-row class="flex-column flex-md-row">
        
        <v-col cols="12" md="6" >
          <v-card-title class="text-h6 text-center text-md-left">
            {{ t('resume') }}
          </v-card-title>
  
          <v-list dense class="text-center text-md-left">
            <v-list-item>
                <v-list-item-title>{{ selectedCourtObject?.name }} </v-list-item-title>
                <v-list-item-title>{{ t('date') }}: {{ dateFormatted }} </v-list-item-title>
                <v-list-item-title>{{ t('startTime') }}: {{ initialHourFormatted }} </v-list-item-title>
                <v-list-item-title>{{ t('endTime') }}: {{ endHourFormatted }} </v-list-item-title>               
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
                  {{ t('cancel') }}
                </v-btn>
                <v-btn
                    color="primary"
                    @click="confirm"
                >
                  {{ t('confirm') }}
                </v-btn>
                
            </v-row>
          </v-form>
        </v-col>
  
      </v-row>
    </v-card>
  </template>
  
  
  <script setup lang="ts">
  
  import type { Court } from '@/types/court';
  import { formatReservationDates } from '@/utils/dateFormatter';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n'


  const { t } = useI18n()
  //Propiedades recibidas del padre
  const { dateSelected, endDate, courtSelected, selectedCourtObject } = defineProps<{
      dateSelected: Date,
      endDate: Date,
      courtSelected: number,
      selectedCourtObject: Court | null
  }>()
  
  const { dateFormatted, initialHourFormatted, endHourFormatted } = computed(() => formatReservationDates(dateSelected, endDate)).value;

  //Eventos emitidos al padre
  const emit = defineEmits(['confirmReservation', 'cancelReservation'])

  function confirm() {
    emit('confirmReservation')
  }

  function cancel() {
    emit('cancelReservation')
  }
  
  </script>
  