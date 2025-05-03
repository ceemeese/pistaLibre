<template>
    <v-container>
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">Perfil de usuario</h1>
        <Info />
        <NavAdmin v-if="store.isAdmin" />

        
        
    </v-container>

</template>

<script setup lang="ts">

    import Info from '@/components/AppUserInfo.vue'
    import NavAdmin from '@/components/AppAdminNav.vue'
    import { useUsersStore } from '@/stores/userStore'

    const store = useUsersStore();

</script>

<style scoped>

</style>