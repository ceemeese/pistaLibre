f<template>
    <v-layout class="overflow-visible mt-5" style="height: 56px;">
      <v-bottom-navigation
        v-model="value"
        color="blue"
        grow
      >

        
        <v-btn v-if="store.isAdmin" to="/users">
          <v-icon>mdi-account-circle</v-icon>
  
          {{ t('user', 2) }}
        </v-btn>
  
      
        <v-btn to="/courts">
          <v-icon>mdi-tennis</v-icon>
  
          {{ t('court', 2) }}
        </v-btn>
  
        <v-btn :to="`/user/${store.loggedUser?.id}/reservations`">
          <v-icon>mdi-calendar</v-icon>
  
          {{ t('reservation', 2) }}
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </template>


<script setup lang="ts">
  import { ref } from 'vue'
  import { useUsersStore } from '@/stores/userStore';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n() 
  const store = useUsersStore();

  const value = ref(1)
</script>