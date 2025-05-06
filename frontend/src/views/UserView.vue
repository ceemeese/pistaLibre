<template>
    <v-container>
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">Perfil de usuario</h1>
        <Info />
        <Chart
            :reservationPerMonth="reservationPerMonth" 
        />
        <NavAdmin  />
    </v-container>

</template>

<script setup lang="ts">

    import Info from '@/components/AppUserInfo.vue'
    import NavAdmin from '@/components/AppAdminNav.vue'
    import { useUsersStore } from '@/stores/userStore'
    import { useReservationsStore } from '@/stores/reservationStore'
    import Chart from '../components/AppChartData.vue'
    import { onMounted, ref } from 'vue'

    const userStore = useUsersStore();
    const reservationStore = useReservationsStore();

    const reservationPerMonth = ref<number[]>(new Array(12).fill(0));

    onMounted(() => {
    const reservationsUser = reservationStore.reservations.filter(r => r.userId === userStore.loggedUser?.id); 

    reservationsUser.forEach(r => {
        const month = new Date(r.date).getMonth(); // mes de reserva en numero
        reservationPerMonth.value[month] += 1 
        console.log('Reservation per Month desde padre', reservationPerMonth);
        
    });
});

</script>

<style scoped>

</style>