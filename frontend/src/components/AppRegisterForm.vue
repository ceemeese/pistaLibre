<template>
    <v-container >
        <v-card class="mx-auto px-6 py-8" max-width="350">
            <v-form>
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
                    @blur="v$.surname.$touch"
                    @input="v$.surname.$touch"
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
                    type="password"
                    :error-messages="v$.password.$errors.map(e => String(e.$message))"
                    label="Contraseña"
                    required
                    @blur="v$.password.$touch"
                    @input="v$.password.$touch"
                    class="mb-2"
                ></v-text-field>
            
            
                <v-btn
                    class="me-4"
                    @click="submit"
                >
                    Confirmar
                </v-btn>
                <v-btn @click="clear">
                    Limpiar
                </v-btn>
            </v-form>
        </v-card>
    </v-container>
  </template>

<script setup lang="ts">
    import { reactive } from 'vue'
    import { useVuelidate } from '@vuelidate/core'
    import { email, required } from '@vuelidate/validators'
    import { useUsersStore } from '@/stores/userStore';
    import { initialState } from '@/types/state.ts';
    import type { State } from '@/types/state.ts';
    import { toast } from "vue3-toastify";
    import router from '@/router';
    import type { NewUser, UserResult } from '@/types/user';

    //Variable reactiva de state
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
    const store = useUsersStore()



    async function submit () {
        v$.value.$touch()

        if (v$.value.$invalid) {
            console.log('Formulario no válido');
            return;
        }

        const newUser = buildNewUser()

        try {

            if (isDuplicateEmail(newUser.email)) {
                toast("Este correo ya está registrado", { 
                    type: "error", 
                    onClose: () => {
                        state.email = ''; 
                    }
                }
            );
                throw new Error("Este correo ya está registrado");
            }

            const result: UserResult = await store.addUser(newUser);

            toast(result.message, {
                type: result.success ? 'success' : 'error', 
                onClose: () => {
                    clear()
                    if (result.success) { router.push('/login');}
                },
            });
            
        } catch (error) {
            console.log('Error:', error);
        }
    }

    function clear () {
        v$.value.$reset()

        for (const [key, value] of Object.entries(initialState) as [keyof State, string][]) {
            state[key] = value
        }
    }

    function buildNewUser(): NewUser {
        return {
            name: state.name,
            surname: state.surname,
            email: state.email,
            password: state.password,
        }   
    }

    
    function isDuplicateEmail(email: string): boolean {
        return store.users.some(user => user.email === email);
    }
</script>

<style scoped>


</style>