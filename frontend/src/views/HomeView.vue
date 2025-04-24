<template>
    <Banner @scrollToDatepicker="scrollToDatepicker"/>
    <v-container>
      <Datepicker ref="datepickerRef" />
    </v-container>
</template>


<script setup lang="ts">
  import Banner from '../components/AppBanner.vue'
  import Datepicker from '@/components/AppDatepicker.vue';
  import { ref } from 'vue'

  const datepickerRef = ref<HTMLElement | null>(null);

  function scrollToDatepicker() {
    datepickerRef.value?.scrollTo();
  }

</script>
