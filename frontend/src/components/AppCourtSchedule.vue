<template>
    <v-card class="mt-4 pa-4">
      <v-card-title class="text-h6 text-center">Disponibilidad del día</v-card-title>
      
      <v-row justify="center">
        <v-col cols="12" md="8">
          <div style="max-height: 150px; overflow-y: auto">
            <v-simple-table>
              <thead>
                <tr>
                  <th class="text-center">Hora</th>
                  <th class="text-center">Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="hora in horasDia" :key="hora">
                  <td class="py-1 text-center">{{ hora }}</td>
                  <td class="py-1 text-center">
                    <v-chip
                      :color="esReservadaPorUsuario(hora) ? 'blue' : estaOcupada(hora) ? 'red' : 'green'"
                      dark
                      small
                    >
                      {{ esReservadaPorUsuario(hora) ? 'Tu reserva' : estaOcupada(hora) ? 'Ocupada' : 'Libre' }}
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    reserva: { fecha: string, hora: string }
    pista: string
    reservas: { hora: string }[]
  }>()
  
    const horasDia = Array.from({ length: 26 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9
    const minutes = i % 2 === 0 ? '00' : '30'
    return `${hour.toString().padStart(2, '0')}:${minutes}`
  })
  
  function estaOcupada(hora: string) {
    return props.reservas.some(r => r.hora === hora)
  }
  function esReservadaPorUsuario(hora: string) {
    return props.reserva.hora === hora
  }
  </script>
  
  
  
  