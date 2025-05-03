<template>
    <v-container>
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">Usuarios</h1>
        <AppDateTable
            :headers="headers"
            :items="store.users"
        />
    </v-container>
</template>

<script setup lang="ts">

    import { onMounted } from 'vue'
    import { useUsersStore } from '@/stores/userStore'
    import AppDateTable from '@/components/AppDateTable.vue'


    const store = useUsersStore()

    const headers = [
        { text: 'Nombre', value: 'name' },
        { text: 'Apellido', value: 'surname' },
        { text: 'Email', value: 'email' },
    ]


    onMounted(() => {
        store.fetchAll()
    })
</script>


<style scoped>
</style>