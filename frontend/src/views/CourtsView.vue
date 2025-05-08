<template>
    <v-container class="d-flex flex-column">
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">Pistas</h1>
        <AppDateTable
            :headers="courtHeader"
            :items="itemsCourt"
            @delete-item="handleDeleteItem"
        />
        <v-container class="d-flex justify-center">
            <v-btn clas @click="router.push({ name: 'register', params: { type: 'court' } })" class="elevation-4 rounded-xl mt-6 mr-4" color="black">Registrar</v-btn>
            <v-btn @click="router.back()" class="elevation-4 rounded-xl mt-6" color="black">Atrás</v-btn>
        </v-container>
    </v-container>
</template>

<script setup lang="ts">

    import { useCourtsStore } from '@/stores/courtStore'
    import AppDateTable from '@/components/AppDateTable.vue'
    import { toast } from 'vue3-toastify';
    import type { CourtResult } from '@/types/court';
    import { courtHeader } from '@/types/table';
    import { computed } from 'vue';
    import { useRouter } from 'vue-router';

    const store = useCourtsStore();
    const router = useRouter()

    const itemsCourt = computed(() => {
        return store.courts.map(court => ({
            ...court,
            indoor: court.indoor ? 'Si' : 'No',
            active: court.active ? 'Si' : 'No'
        }))
    })



    const handleDeleteItem = async (id: number) => {
        const result: CourtResult = await store.deleteCourt(id);
        toast(result.message, {type: result.success ? 'success' : 'error',});
    }

</script>


<style scoped>
</style>