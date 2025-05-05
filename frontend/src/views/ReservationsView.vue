<template>
    <v-container>
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">Reservas</h1>
        <AppDateTable
            :headers="headers"
            :items="store.reservations"
            @delete-item="handleDeleteItem"
        />
    </v-container>
</template>

<script setup lang="ts">

    import { onMounted } from 'vue'
    import { useReservationsStore } from '@/stores/reservationStore'
    import AppDateTable from '@/components/AppDateTable.vue'
    import { toast } from 'vue3-toastify';
import type { ReservationResult } from '@/types/reservation';


    const store = useReservationsStore();

    const headers = [
        { text: 'ID', value: 'id' },
        { text: 'Pista', value: 'courtId' },
        { text: 'Usuario', value: 'userId' },
        { text: 'Fecha', value: 'date' },
        { text: 'Hora inicio', value: 'startTime' },
        { text: 'Hora fin', value: 'endTime' },
    ]


    const handleDeleteItem = async (id: number) => {

        const result: ReservationResult = await store.deleteReservation(id);

        toast(result.message, {type: result.success ? 'success' : 'error',});
    }


    onMounted(() => {
        store.fetchAll()
    })
</script>


<style scoped>
</style>