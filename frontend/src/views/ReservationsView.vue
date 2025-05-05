<template>
    <v-container>
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">Reservas</h1>
        <AppDateTable
            v-if="formattedItems.length > 0"
            :headers="headers"
            :items="formattedItems"
            @delete-item="handleDeleteItem"
        />
    </v-container>
</template>

<script setup lang="ts">

    import { computed, onMounted } from 'vue'
    import { useReservationsStore } from '@/stores/reservationStore'
    import AppDateTable from '@/components/AppDateTable.vue'
    import { toast } from 'vue3-toastify';
    import type { ReservationResult } from '@/types/reservation';
    import { formatReservationDates } from '@/utils/dateFormatter';
    import { useCourtsStore } from '@/stores/courtStore';
    import { useUsersStore } from '@/stores/userStore';
    import type { Court } from '@/types/court';
import type { User } from '@/types/user';


    const reservationStore = useReservationsStore();
    const courtStore = useCourtsStore();
    const userStore = useUsersStore();

    const headers = [
        { text: 'ID', value: 'id' },
        { text: 'Pista', value: 'court' },
        { text: 'Usuario', value: 'user' },
        { text: 'Fecha', value: 'date' },
        { text: 'Hora inicio', value: 'startTime' },
        { text: 'Hora fin', value: 'endTime' },
    ]

    const formattedItems = computed( () => {
        return reservationStore.reservations.map(r => {

            const courtItem : Court  = courtStore.courts.find(c => c.id === r.courtId)!;
            const userItem : User  = userStore.users.find(u => u.id === r.userId)!;

            const { dateFormatted, initialHourFormatted, endHourFormatted } =
            formatReservationDates(new Date(r.date), new Date(r.endDate));

            return {
                ...r,
                court: courtItem.name,
                user: userItem.name + ' ' + userItem.surname,
                date: dateFormatted,
                startTime: initialHourFormatted,
                endTime: endHourFormatted,
            };
        })
    })


    const handleDeleteItem = async (id: number) => {

        const result: ReservationResult = await reservationStore.deleteReservation(id);

        toast(result.message, {type: result.success ? 'success' : 'error',});
    }


    onMounted(() => {
        courtStore.fetchAll();
        userStore.fetchAll();
        reservationStore.fetchAll();
        console.log('Datos formateados cargados: ', formattedItems.value); 
    })
</script>


<style scoped>
</style>