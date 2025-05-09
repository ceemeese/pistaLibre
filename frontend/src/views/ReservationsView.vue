<template>
    <v-container class="d-flex flex-column text-center">
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">{{ t("reservation", 2) }}</h1>
        <AppDateTable
            v-if="formattedItems.length > 0"
            :headers="translatedHeaders"
            :items="formattedItems"
            @delete-item="handleDeleteItem"
        />
        <div v-else class="text-center">{{ t("messageReservation") }}</div>
        <v-btn @click="$router.back()" class="elevation-4 rounded-xl mt-6 mx-auto bottom-0" color="black">{{ t("back") }}</v-btn>
    </v-container>
</template>

<script setup lang="ts">

    import { computed } from 'vue'
    import { useReservationsStore } from '@/stores/reservationStore'
    import AppDateTable from '@/components/AppDateTable.vue'
    import { toast } from 'vue3-toastify';
    import type { ReservationResult } from '@/types/reservation';
    import { formatReservationDates } from '@/utils/dateFormatter';
    import { useCourtsStore } from '@/stores/courtStore';
    import { useUsersStore } from '@/stores/userStore';
    import type { Court } from '@/types/court';
    import type { User } from '@/types/user';
    import { reservationHeaderAdmin, reservationHeaderUser, } from '@/types/table';
    import { useI18n } from 'vue-i18n'


    const { t } = useI18n()
    const reservationStore = useReservationsStore();
    const courtStore = useCourtsStore();
    const userStore = useUsersStore();

    
    const headerTab = computed ( () => {
        return userStore.isAdmin
        ? reservationHeaderAdmin
        : reservationHeaderUser
    })


    const formattedItems = computed( () =>
    
        reservationStore.reservations
        .filter(r => userStore.isAdmin || r.userId === userStore.loggedUser?.id)
        .map(r => {

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
            }
            
        })
    )

    const handleDeleteItem = async (id: number) => {
        const result: ReservationResult = await reservationStore.deleteReservation(id);
        toast(result.message, {type: result.success ? 'success' : 'error',});
    }


    const translatedHeaders = computed(() => {
        return headerTab.value.map(header => ({
            ...header,
            text: t(`${header.text}`)
        }))
    })


</script>


<style scoped>
</style>