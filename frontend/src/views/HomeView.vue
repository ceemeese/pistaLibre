<template>
    <Banner @scrollToDatepicker="scrollToDatepicker"/>
    <v-container>
      <Stepper />
      <Datepicker ref="datepickerRef" />
      <ListCourt />
      <Resume
      
      :pista="pistaSeleccionada || 'Pista 1'"
      :reserva="reserva"
      @confirmar="confirmarReserva"
      @cancelar="cancelarReserva"
    />
    </v-container>
</template>


<script setup lang="ts">
  import Banner from '../components/AppBanner.vue'
  import Datepicker from '@/components/AppDatepicker.vue';
  import ListCourt from '@/components/AppListCourt.vue';
  import Resume from '../components/AppResume.vue';

  import { ref } from 'vue'

  const datepickerRef = ref<HTMLElement | null>(null);

  function scrollToDatepicker() {
    datepickerRef.value?.scrollTo();
  }

  const pistaSeleccionada = ref<string | null>('Pista 1')
  const reserva = ref({
    fecha: '2025-04-24',  
    hora: '18:00'       
  })

  const seleccionarPista = (pista: string) => {
  pistaSeleccionada.value = pista
  }

const confirmarReserva = (cliente: { nombre: string, email: string }) => {
  console.log('Reserva confirmada:', {
    pista: pistaSeleccionada.value,
    ...reserva.value,
    ...cliente
  })
  pistaSeleccionada.value = null
}

const cancelarReserva = () => {
  pistaSeleccionada.value = null
}

</script>
