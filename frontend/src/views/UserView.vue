<template>
    <v-container>
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">perfil de usuario</h1>
        <Info @show-snackbar="showSnackbar"/>
        
    </v-container>

    <v-snackbar v-model="snackbar" :timeout="2000" location="top">
            {{ snackbarMensaje }}
        </v-snackbar>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import Info from '../components/AppUserInfo.vue'

    const snackbar = ref<boolean>(false);
    const snackbarMensaje = ref<string>('');

    const showSnackbar = (mensaje: string) => {
        snackbarMensaje.value = mensaje;
        snackbar.value = true;
    };

</script>

<style scoped>

</style>