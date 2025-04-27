<template>
    <v-card class="pa-4" outlined>
        <v-card-title>Datos de cliente</v-card-title>
        <v-card-text>
        <v-form @submit.prevent="putData" ref="form">

            <div class="mb-4">
            <div class="text-subtitle-1 font-weight-medium">Nombre</div>
            <div class="text-body-1">{{ cliente.nombre }}</div>
            </div>
   
            <v-text-field
            label="Correo electrónico"
            v-model="cliente.email"
            :error-messages="v$.email.$errors.map(e => String(e.$message))"
            required
            outlined
            @blur="v$.email.$touch"
            @input="v$.email.$touch"
            class="mb-4"
            />

            <v-btn color="primary" type="submit">Guardar cambios</v-btn>

        </v-form>
        </v-card-text>
    </v-card>
</template>
  
<script setup lang="ts">
    import { ref } from 'vue';
    import { useVuelidate } from '@vuelidate/core';
    import { required, email } from '@vuelidate/validators';

    const emit = defineEmits<{
    (e: 'show-snackbar', mensaje: string): void;
    }>();
  
 
    interface Cliente {
        nombre: string;
        email: string;
    }
  
    // Datos del cliente se traen del store
    const cliente = ref<Cliente>({
        nombre: 'Cristina Malmierca', 
        email: 'cris@mail.com',
    });

    const rules = {
        email: { required, email }
    }


    const v$ = useVuelidate(rules, cliente)

    const putData = () => {
        
        if (v$.value.$invalid) {
            console.log("Formulario no válido");
            return;
        }
        console.log('Guardando cambios...', cliente.value);
        emit('show-snackbar', 'Datos actualizados correctamente');
        
        //TODO actualizar datos    
    };

  </script>
  
  <style scoped>
  </style>
  