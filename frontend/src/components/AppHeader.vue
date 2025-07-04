<template>
  <v-app-bar app color="black" dark>
    <!-- Menú hamburguesa en móviles -->
    <v-app-bar-nav-icon
      class="d-sm-none"
      @click="drawer = !drawer"
      aria-label="Abrir menú"
    />

    <v-app-bar-title class="font-weight-bold">
      PistaLibreApp
    </v-app-bar-title>

    <v-spacer class="d-none d-sm-block" />

    <!-- Menú escritorio -->
    <div class="d-none d-sm-flex justify-center align-center">
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

    <!-- Acciones -->
    <v-select
        v-model="selectedLanguage"
        :items="languages"
        item-title="label"
        item-value="code"
        return-object
        density="compact"
        hide-details
        class="mx-2 select-idiom"
        @update:modelValue="changeLanguage"
      />
    <v-btn icon aria-label="Buscar">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn v-if="store.isAuthenticated" 
      icon tag="router-link" 
      aria-label="Logout"
      @click="handleLogout">
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
        @click="drawer = false"
      >
        <template #prepend>
          <v-icon>{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>

      <v-divider class="my-2" />

      <!-- Acciones logout en drawer-->
      <v-list-item
        v-if="store.isAuthenticated"
        link
        @click="() => { handleLogout(); drawer = false; }"
      >
        <template #prepend>
          <v-icon>mdi-login</v-icon>
        </template>
        <v-list-item-title>{{ t('closeSession') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useUsersStore } from '@/stores/userStore'
  import { useRouter } from 'vue-router'
  import { toast } from 'vue3-toastify'
  import type { NavItems } from '@/types/nav'
  import { useI18n } from 'vue-i18n'

  const { locale } = useI18n()
  const languages = [
    { code: 'es', label: '🇪🇸 ' },
    { code: 'en', label: '🇬🇧' },
    { code: 'it', label: '🇮🇹' }
  ]
  


  const { t } = useI18n()
  const store = useUsersStore()
  const router = useRouter()

  const drawer = ref(<boolean>false)

  //idioma
  const selectedLanguage = ref(languages.find(lang => lang.code === locale.value))

  const changeLanguage = (language: { code: string; label: string }) => {
    locale.value = language.code
  }


  
  const items = computed<NavItems[]>( () => {
    return [
      { title: 'Home', to: '/', icon: 'mdi-home' },

      store.isAuthenticated
      ? { title: t('profile'), to: '/user/' + store.loggedUser?.id , icon: 'mdi-account-circle' }
      : { title: t('login'), to: '/login', icon: 'mdi-account' }
    ]
  })


  const handleLogout = () => {
    
    toast( t('closingSession'), {
      type: "default",
      onClose: () => {
        store.logout();
        router.push("/")
      }
    })
      
  }
</script>


<style scoped>

  .select-idiom{
    max-width: 80px;
  }
</style>
