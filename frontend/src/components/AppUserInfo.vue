<template>
    <v-card class="pa-4" outlined>
        <v-card-title>Datos personales</v-card-title>
        <v-card-text>
        <v-form @submit.prevent="submit" ref="form">

            <div class="mb-4">
            <div class="text-subtitle-1 font-weight-medium">{{ t('name') }}</div>
            <div class="text-body-1">{{ name }}</div>
            </div>
   
            <v-text-field
            :label="t('email')"
            v-model="emailForm"
            :error-messages="v$.email.$errors.map(e => String(e.$message))"
            required
            outlined
            @blur="v$.email.$touch"
            @input="v$.email.$touch"
            class="mb-4"
            />

            <v-text-field
            :label="t('password')"
            type="password"
            name="password"
            v-model="passwordForm"
            :error-messages="v$.password.$errors.map(e => String(e.$message))"
            required
            outlined
            @blur="v$.password.$touch"
            @input="v$.password.$touch"
            class="mb-4"
            />

            <v-btn color="primary" type="submit">{{ t('saveChanges') }}</v-btn>

        </v-form>
        </v-card-text>
    </v-card>
</template>
  
<script setup lang="ts">
    import { reactive, ref} from 'vue';
    import { useVuelidate } from '@vuelidate/core';
    import { required, email } from '@vuelidate/validators';
    import { useUsersStore } from '@/stores/userStore';
    import { toast } from 'vue3-toastify';
    import { useI18n } from 'vue-i18n'


    const { t } = useI18n()
    const store = useUsersStore();
  
    // Datos del cliente se traen del store
    const name = ref(store.loggedUser?.name);
    const emailForm = ref(store.loggedUser?.email);
    const passwordForm = ref(store.loggedUser?.password);


    const rules = reactive({
        email: { required, email },
        password: { required }
    });


    const v$ = useVuelidate(rules, {email: emailForm, password: passwordForm})



    async function submit () {
        
        if (v$.value.$invalid) {
            console.log("Formulario no válido");
            return;
        }
        
        try {
            const isRegisteredByAnother = store.users.some(u => u.email === emailForm.value && u.id !== store.loggedUser?.id)

            if(isRegisteredByAnother) {
                toast(t('duplicated'), {
                    type: "error",
                    onClose: () => {
                        emailForm.value = store.loggedUser?.email;
                    },
                });
            throw new Error ('Este correo ya está registrado')
            }

            await store.modifyUser(store.loggedUser?.id, emailForm.value, passwordForm.value);
            console.log('Usuario modificado correctamente')
            toast(t('okModified'), {
                type: "success",
            });


        } catch (error) {
            console.log('Error: ', error);
        }
        
    };

  </script>
  
  <style scoped>
  </style>
  