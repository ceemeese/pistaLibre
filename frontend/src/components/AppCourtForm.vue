<template>
    <v-container >
        <v-card class="mx-auto px-6 py-8" max-width="350">
            <v-form>
                <v-text-field
                    v-model="state.name"
                    :counter="10"
                    :error-messages="v$.name.$errors.map(e => String(e.$message))"
                    label="Nombre"
                    required
                    @blur="v$.name.$touch"
                    @input="v$.name.$touch"
                    class="mb-2"
                ></v-text-field>

                <v-radio-group
                    v-model="state.indoor"
                    label="¿Es indoor?"
                    class="mb-2"
                    >
                    <v-radio label="Sí" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>
            
                <v-radio-group
                    v-model="state.panoramic"
                    label="¿Es panorámica?"
                    class="mb-2"
                    >
                    <v-radio label="Sí" :value="true"></v-radio>
                    <v-radio label="No" :value="false"></v-radio>
                </v-radio-group>

                <v-container class="d-flex justify-center">
                    <v-btn
                        class="me-4"
                        @click="submit"
                    >
                        Confirmar
                    </v-btn>
                    <v-btn @click="clear">
                        Limpiar
                    </v-btn>
                </v-container>
            </v-form>
        </v-card>
    </v-container>
  </template>



<script setup lang="ts">
    import { reactive } from 'vue'
    import { useVuelidate } from '@vuelidate/core'
    import { required } from '@vuelidate/validators'
    import { initialCourtState } from '@/types/state.ts';
    import type { StateCourt } from '@/types/state.ts';
    import { toast } from "vue3-toastify";
    import router from '@/router';
    import { useCourtsStore } from '@/stores/courtStore';
    import type { CourtResult, NewCourt } from '@/types/court';

    const store = useCourtsStore();
    const state = reactive<StateCourt>({
        ...initialCourtState,
    })
    

    const rules = {
        name: { required },
    }

    const v$ = useVuelidate(rules, state);


    async function submit () {
        v$.value.$touch()

        if (v$.value.$invalid) {
            console.log('Formulario no válido');
            return;
        }

        const newCourt = buildNewCourt()

        try {

            const result: CourtResult = await store.addCourt(newCourt);

            toast(result.message, {
                type: result.success ? 'success' : 'error', 
            });
            
        } catch (error) {
            console.log('Error:', error);
        }
    }

    function clear () {
        v$.value.$reset()
        Object.assign(state, initialCourtState);
    }

    function buildNewCourt(): NewCourt {
        return {
            name: state.name,
            indoor: state.indoor,
            panoramic: state.panoramic,
        }   
    }


</script>

<style scoped>


</style>