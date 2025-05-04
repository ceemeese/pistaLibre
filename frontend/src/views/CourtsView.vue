<template>
    <v-container>
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">Pistas</h1>
        <AppDateTable
            :headers="headers"
            :items="store.courts"
        />
    </v-container>
</template>

<script setup lang="ts">

    import { onMounted } from 'vue'
    import { useCourtsStore } from '@/stores/courtStore'
    import AppDateTable from '@/components/AppDateTable.vue'


    const store = useCourtsStore();

    const headers = [
        { text: 'ID', value: 'id' },
        { text: 'Nombre', value: 'name' },
        { text: 'Indoor', value: 'indoor' },
        { text: 'Activa', value: 'active' },
    ]


    onMounted(() => {
        store.fetchAll()
    })
</script>


<style scoped>
</style>