<template>
    <v-container>
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">Pistas</h1>
        <AppDateTable
            :headers="headers"
            :items="store.courts"
            @delete-item="handleDeleteItem"
        />
    </v-container>
</template>

<script setup lang="ts">

    import { onMounted } from 'vue'
    import { useCourtsStore } from '@/stores/courtStore'
    import AppDateTable from '@/components/AppDateTable.vue'
    import { toast } from 'vue3-toastify';
import type { CourtResult } from '@/types/court';


    const store = useCourtsStore();

    const headers = [
        { text: 'ID', value: 'id' },
        { text: 'Nombre', value: 'name' },
        { text: 'Indoor', value: 'indoor' },
        { text: 'Activa', value: 'active' },
    ]

    const handleDeleteItem = async (id: number) => {

        const result: CourtResult = await store.deleteCourt(id);

        toast(result.message, {type: result.success ? 'success' : 'error',});
    }

    onMounted(() => {
        store.fetchAll()
    })
</script>


<style scoped>
</style>