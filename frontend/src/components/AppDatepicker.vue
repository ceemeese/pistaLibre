<template>
    
  <v-container ref="datepickerSection">
    <VueDatePicker 
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
        />
  </v-container>

</template>



<script setup lang="ts">
  /*import VueCal from 'vue-cal'
  import 'vue-cal/dist/vuecal.css'*/
  import { ref, computed} from 'vue';
  import { addDays } from 'date-fns';

  const datepickerSection = ref<HTMLElement | null>(null);

  function scrollTo() {
    datepickerSection.value?.scrollIntoView({ behavior: 'smooth' });
}

  defineExpose({
    scrollTo,
  });

  const date = ref();
  const startTime = ref({ hours: 9, minutes: 0 });
  const maxDate = computed(() => addDays(new Date(), 14));

</script>



<style scoped>

</style>