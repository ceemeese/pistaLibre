<template>
    <v-container class="d-flex flex-column">
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">Usuarios</h1>
        <AppDateTable
            :headers="userHeader"
            :items="store.users"
            @delete-item="handleDeleteItem"
        />
        <v-btn @click="$router.back()" class="elevation-4 rounded-xl mt-6 mx-auto" color="black">Atrás</v-btn>
    </v-container>
</template>

<script setup lang="ts">

    import { useUsersStore } from '@/stores/userStore'
    import AppDateTable from '@/components/AppDateTable.vue'
    import { toast } from 'vue3-toastify'
    import type { UserResult } from '@/types/user'
    import { userHeader } from '@/types/table';

    const store = useUsersStore()


    const handleDeleteItem = async (id: number) => {
        const result: UserResult = await store.deleteUser(id);
        toast(result.message, {type: result.success ? 'success' : 'error',});
    }

</script>


<style scoped>
</style>