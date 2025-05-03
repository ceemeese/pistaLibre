<template>
    <v-table height="300px" fixed-header>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.text" class="text-left">
            {{ header.text }}
          </th>
          <th class="text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="header in headers" :key="header.value">
            {{ item[header.value] }}
          </td>
          <td>
            <v-btn class="mr-2" size="x-small" icon @click="emit('put', item)">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn size="x-small" icon @click="emit('delete', item.id)">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </td>
        </tr>
      </tbody>
    </v-table>
  </template>
  
  <script setup lang="ts">
    interface Header {
        text: string
        value: string
    }
    
    interface Item {
        id: number
        [key: string]: any
    }
    
    //Se traen del padre UsersView para mostrar
    const props = defineProps<{
        headers: Header[]
        items: Item[]
    }>()

    //Se pasan al padre los eventos
    const emit = defineEmits<{
        (e: 'put', item: Item): void
        (e: 'delete', id: number): void
    }>()
  </script>
  
  <style scoped></style>