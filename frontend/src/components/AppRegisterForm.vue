<template>
    <v-container >
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">Registro</h1>
        <v-card class="mx-auto px-6 py-8" max-width="350">
            <form>
            <v-text-field
                v-model="state.name"
                :counter="10"
                :error-messages="v$.name.$errors.map(e => String(e.$message))"
                label="Name"
                required
                @blur="v$.name.$touch"
                @input="v$.name.$touch"
                class="mb-2"
            ></v-text-field>

            <v-text-field
                v-model="state.surname"
                :error-messages="v$.surname.$errors.map(e => String(e.$message))"
                label="Apellidos"
                required
                @blur="v$.email.$touch"
                @input="v$.email.$touch"
                class="mb-2"
            ></v-text-field>
        
            <v-text-field
                v-model="state.email"
                :error-messages="v$.email.$errors.map(e => String(e.$message))"
                label="E-mail"
                required
                @blur="v$.email.$touch"
                @input="v$.email.$touch"
                class="mb-2"
            ></v-text-field>

            <v-text-field
                v-model="state.password"
                :error-messages="v$.password.$errors.map(e => String(e.$message))"
                label="Contraseña"
                required
                @blur="v$.email.$touch"
                @input="v$.email.$touch"
                class="mb-2"
            ></v-text-field>
        
        
            <v-btn
                class="me-4"
                @click="v$.$validate"
            >
                Confirmar
            </v-btn>
            <v-btn @click="clear">
                Limpiar
            </v-btn>
            </form>
        </v-card>
    </v-container>
  </template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { useVuelidate } from '@vuelidate/core'
  import { email, required } from '@vuelidate/validators'

    interface State {
        name: string;
        surname: string;
        email: string;
        password: string;
    }

    
    const initialState: State = {
        name: '',
        surname: '',
        email: '',
        password: ''
    }

    //Variable reactiva
    const state = reactive<State>({
        ...initialState,
    })


    const rules = {
        name: { required },
        surname: { required },
        email: { required, email },
        password: { required },
    }

    const v$ = useVuelidate(rules, state)

    function clear () {
        v$.value.$reset()

        for (const [key, value] of Object.entries(initialState) as [keyof State, string][]) {
            state[key] = value
        }
    }
</script>

<style scoped>


</style>