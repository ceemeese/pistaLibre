<template>
    
  <v-container >
    <VueDatePicker 
        ref="datepickerSection"
        v-model="date" 
        :start-time="startTime"
        :min-time="{ hours: 9, minutes: 0 }"
        :max-time="{ hours: 22, minutes: 30 }" 
        hours-increment="1" 
        minutes-increment="30" 
        auto-position="bottom"  
        placeholder="Selecciona una fecha"
        :min-date="new Date()"
        :max-date="maxDate" 
        disable-year-select
        @update:model-value="emitDate"
        />
  </v-container>

</template>



<script setup lang="ts">
  /*import VueCal from 'vue-cal'
  import 'vue-cal/dist/vuecal.css'*/
  import { ref, computed} from 'vue';
  import { addDays } from 'date-fns';

  const date = ref();
  const startTime = ref({ hours: 9, minutes: 0 });
  const maxDate = computed(() => addDays(new Date(), 14));
  


  /*const datepickerSection = ref<HTMLElement | null>(null);

  function scrollTo(this: { scrollTo: () => void; }) {
    datepickerSection.value?.scrollIntoView({ behavior: 'smooth' })
  }*/



  /*defineExpose({
    scrollTo,
  });*/


  //evento seleccion fecha al padre
  const emit  = defineEmits<{
    (e: 'dateSelected', value: Date): void;
  }>();

  function emitDate(value: Date) {
    console.log('Emite fecha el hijo')
    emit('dateSelected', value)
  }


</script>



<style scoped>

</style>