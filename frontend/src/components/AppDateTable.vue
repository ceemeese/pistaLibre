<template>
    <v-table height="300px" fixed-header>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.text" class="text-center">
            {{ header.text }}
          </th>
          <th class="text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="text-center" v-for="header in headers" :key="header.value">
            {{ item[header.value] }}
          </td>
          <td class="d-flex justify-center align-center">
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
import type { Header, Item } from '@/types/table';


    
    //Se traen del padre UsersView para mostrar
    const props = defineProps<{
        headers: Header[]
        items: Item[]
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
  
  <style scoped></style>