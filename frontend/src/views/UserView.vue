<template>
    <v-container>
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10"> {{ t('profileUser') }} </h1>
        <Info />
        <v-container class="d-none d-md-flex flex-column">
            <h5 class="text-h5 text-md-h5 mb-md-3 text-center mt-md-3"> {{ t('lastMonths') }}</h5>
            <Chart
                :reservationPerMonth="reservationPerMonth" 
            />
        </v-container>
        <Nav class="mb-3"  />
    </v-container>

</template>

<script setup lang="ts">

    import Info from '@/components/AppUserInfo.vue'
    import Nav from '@/components/AppAdminNav.vue'
    import { useUsersStore } from '@/stores/userStore'
    import { useReservationsStore } from '@/stores/reservationStore'
    import Chart from '../components/AppChartData.vue'
    import { computed, onMounted, ref } from 'vue'
    import { useRoute } from 'vue-router';
    import { useI18n } from 'vue-i18n'

    const { t } = useI18n()
    
    const userStore = useUsersStore();
    const reservationStore = useReservationsStore();

    const route = useRoute();
    const id = Number(route.params.id);

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