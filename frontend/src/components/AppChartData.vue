<template>
    <v-container class="chart-container">
      <!-- Gráfico de barras solo en pantallas grandes -->
      <v-row>
        <v-col cols="12">
          <Bar :data="chartData" :options="chartOptions" />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
    import { computed, watch } from 'vue'
    import { Bar } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

    const {reservationPerMonth} = defineProps<{
        reservationPerMonth: number[]
    }>()


    const chartData = computed(() => {

        const currentMonth = new Date().getMonth();
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

        //comprobar que no quede negativo el mes
        const lastThreeMonthsIndex = [
            (currentMonth - 2 + 12) % 12,//tercer mes atras
            (currentMonth - 1 + 12) % 12,//mes anterior
            currentMonth   //actual
        ]

        const labels = lastThreeMonthsIndex.map(i => months[i])
        const data = lastThreeMonthsIndex.map(i => reservationPerMonth[i])

        return {
            labels,
            datasets: [{
                label: 'Reservas por mes',
                data,
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                borderWidth: 1
            }]
        }
    })

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,     
            ticks: {
              stepSize: 1
            }
          }
        }
    };

    watch(() => reservationPerMonth, (newVal) => {
        console.log('Cambió reservationPerMonth:', newVal)
    }, { deep: true, immediate: true })
  
  
  </script>
  
  <style scoped>
    .chart-container {
      position: relative;
      width: 100%;
      height: 250px;
    }
  </style>
  