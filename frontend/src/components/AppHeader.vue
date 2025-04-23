<template>
  <v-app-bar app color="black" dark>
    <!-- Menú hamburguesa SOLO en móviles -->
    <v-app-bar-nav-icon
      class="d-sm-none"
      @click="drawer = !drawer"
      aria-label="Abrir menú"
    />

    <v-app-bar-title class="font-weight-bold">
      PistaLibreApp
    </v-app-bar-title>

    <v-spacer />

    <!-- Menú de navegación en escritorio -->
    <div class="d-none d-sm-flex">
      <v-btn
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        tag="router-link"
        variant="text"
        class="mx-1"
        color="white"
      >
        <v-icon start>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </div>

    <!-- Acciones universales -->
    <v-btn icon aria-label="Buscar">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon tag="router-link" :to="'/auth'" aria-label="Iniciar sesión">
      <v-icon>mdi-login</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Drawer para móvil -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    app
    class="d-sm-none"
  >
    <v-list density="comfortable">
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        tag="router-link"
        link
      >
        <template #prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>

      <v-divider class="my-2" />

      <!-- Acciones extra, como login -->
      <v-list-item
        to="/auth"
        tag="router-link"
        link
      >
        <template #prepend>
          <v-icon>mdi-login</v-icon>
        </template>
        <v-list-item-title>Iniciar sesión</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)

const items = [
  { title: 'Inicio', to: '/', icon: 'mdi-home' },
  { title: 'Usuario', to: '/user', icon: 'mdi-account' },
]
</script>
