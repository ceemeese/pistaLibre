<template>
    <v-container class="d-flex flex-column">
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">{{ t("court", 2) }}</h1>
        <AppDateTable
            :headers="translatedHeaders"
            :items="itemsCourt"
            @delete-item="handleDeleteItem"
        />
        <v-container class="d-flex justify-center">
            <v-btn clas @click="router.push({ name: 'register', params: { type: 'court' } })" class="elevation-4 rounded-xl mt-6 mr-4" color="black">Registrar</v-btn>
            <v-btn @click="router.back()" class="elevation-4 rounded-xl mt-6" color="black">{{ t("back") }}</v-btn>
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
    import { useI18n } from 'vue-i18n'


    const { t } = useI18n()
    const store = useCourtsStore();
    const router = useRouter()

    const itemsCourt = computed(() => {
        return store.courts.map(court => ({
            ...court,
            indoor: court.indoor ? t('si') : t('no'),
            active: court.active ? t('si') : t('no'),
        }))
    })
    


    const handleDeleteItem = async (id: number) => {
        const result: CourtResult = await store.deleteCourt(id);
        toast(t(result.message), {type: result.success ? 'success' : 'error',});
    }

    const translatedHeaders = computed(() => {
        return courtHeader.map(header => ({
            ...header,
            text: t(`${header.text}`)
        }))
    })

</script>


<style scoped>
</style>