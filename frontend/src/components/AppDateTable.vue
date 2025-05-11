<template>
  <v-table height="300px" fixed-header >
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.text" class="text-center">
          {{ header.text }}
        </th>
        <th v-if="userStore.isAdmin" class="text-center"> {{ t("actions") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td class="text-center" v-for="header in headers" :key="header.value">
          {{ item[header.value] }}
        </td>
        <td v-if="userStore.isAdmin" class="d-flex justify-center align-center">
          <!--<v-btn class="mr-2" size="x-small" icon @click="emit('put', item)">
              <v-icon>mdi-pencil</v-icon>
          </v-btn>-->
          <v-btn size="x-small" icon @click=handleDelete(item.id)>
              <v-icon>mdi-delete</v-icon>
          </v-btn>
      </td>
      </tr>
    </tbody>
  </v-table>
</template>
  
<script setup lang="ts">

  import { useI18n } from 'vue-i18n'
  import type { Header, Item } from '@/types/table';
  import { useUsersStore } from '@/stores/userStore'

  const { t } = useI18n()
  const userStore = useUsersStore();

  //Se traen del padre UsersView para mostrar
  const { headers, items} = defineProps<{
      headers: Array<Header>
      items: Array<Item>
  }>()

  //Se pasan al padre los eventos
  const emit = defineEmits<{
      (e: 'put', item: Item): void
      (e: 'delete-item', id: number): void
  }>()

  const handleDelete = (id: number) => {
    emit('delete-item', id)
  }
  

</script>
  
<style scoped>
</style>