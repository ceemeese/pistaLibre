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

        const success: boolean = await store.deleteReservation(id);

        if(success) {
            toast("Reserva eliminada correctamente", { type: "success" });
        } else {
            toast("Error al eliminar la reserva", { type: "error" });
        }
    }


    onMounted(() => {
        store.fetchAll()
    })
</script>


<style scoped>
</style>