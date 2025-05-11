<template>
    <v-container class="fill-height d-flex flex-column align-center">
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">{{ isUserRegistration ? 'Registro de Usuario' : 'Registro de Pista' }}</h1>
        <RegisterForm v-if="isUserRegistration" />
        <RegisterCourt v-else />
        <v-btn @click="router.back()" class="elevation-4 rounded-xl mt-6 mx-auto" color="black">Atrás</v-btn>
    </v-container>
</template>


<script setup lang="ts">
    import RegisterForm from '../components/AppRegisterForm.vue'
    import RegisterCourt from '../components/AppCourtForm.vue'
    import { useRouter, useRoute} from 'vue-router'
    
    const router = useRouter();
    const route = useRoute()

    const isUserRegistration = route.params.type === 'user'
    
</script>

<style scoped>

</style>