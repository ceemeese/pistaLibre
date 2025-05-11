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
        auto-position="top"  
        :placeholder="t('askData')"
        :min-date="new Date()"
        :max-date="maxDate"
        disable-year-select
        @update:model-value="emitDate"
        />
  </v-container>

</template>



<script setup lang="ts">

  import { useI18n } from 'vue-i18n'
  import { ref, computed} from 'vue';
  import { addDays } from 'date-fns';


  
  const { t } = useI18n() 
  const date = ref();
  const startTime = ref({ hours: 9, minutes: 0 });
  const maxDate = computed(() => addDays(new Date(), 14));
  

  //evento seleccion fecha al padre
  const emit  = defineEmits<{
    (e: 'dateSelected', value: Date): void;
    (e: 'resetCourt') : void;
  }>();

  function emitDate(value: Date) {
    console.log('Emite fecha el hijo')
    emit('dateSelected', value);
    emit('resetCourt');
  }



</script>



<style scoped>

</style>