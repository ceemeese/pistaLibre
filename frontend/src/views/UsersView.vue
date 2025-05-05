<template>
    <v-container>
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">Usuarios</h1>
        <AppDateTable
            :headers="headers"
            :items="store.users"
            @delete-item="handleDeleteItem"
        />
    </v-container>
</template>

<script setup lang="ts">

    import { onMounted } from 'vue'
    import { useUsersStore } from '@/stores/userStore'
    import AppDateTable from '@/components/AppDateTable.vue'
    import { toast } from 'vue3-toastify'


    const store = useUsersStore()

    const headers = [
        { text: 'Nombre', value: 'name' },
        { text: 'Apellido', value: 'surname' },
        { text: 'Email', value: 'email' },
    ]

    const handleDeleteItem = async (id: number) => {

        const success: boolean = await store.deleteUser(id);

        if(success) {
            toast("Usuario eliminado correctamente", { type: "success" });
        } else {
            toast("Error al eliminar usuario", { type: "error" });
        }
    }


    onMounted(() => {
        store.fetchAll()
    })
</script>


<style scoped>
</style>