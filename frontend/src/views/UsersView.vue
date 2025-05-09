<template>
    <v-container class="d-flex flex-column">
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">{{ t("user", 2) }}</h1>
        <AppDateTable
            :headers="translatedHeaders"
            :items="store.users"
            @delete-item="handleDeleteItem"
        />
        <v-btn @click="$router.back()" class="elevation-4 rounded-xl mt-6 mx-auto" color="black">{{ t("back") }}</v-btn>
    </v-container>
</template>

<script setup lang="ts">

    import { useUsersStore } from '@/stores/userStore'
    import AppDateTable from '@/components/AppDateTable.vue'
    import { toast } from 'vue3-toastify'
    import type { UserResult } from '@/types/user'
    import { userHeader } from '@/types/table';
    import { useI18n } from 'vue-i18n'
import { computed } from 'vue';


    const { t } = useI18n()
    const store = useUsersStore()

    const handleDeleteItem = async (id: number) => {
        const result: UserResult = await store.deleteUser(id);
        toast(result.message, {type: result.success ? 'success' : 'error',});
    }


    const translatedHeaders = computed(() => {
        return userHeader.map(header => ({
            ...header,
            text: t(`${header.text}`)
        }))
    })
    

</script>


<style scoped>
</style>