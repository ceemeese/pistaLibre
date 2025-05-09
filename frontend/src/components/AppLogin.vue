<template>

    <v-container>
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10"> {{ t('login') }}</h1>
        <v-card class="mx-auto px-6 py-8" max-width="350">
            <v-form  @submit.prevent="handleSubmit">
            <v-text-field v-model="form.email" :label="t('email')" name="email" />
            <v-text-field
                v-model="form.password"
                :label="t('password')"
                name="password"
                type="password"
            />
            <v-btn type="submit">{{ t('login') }}</v-btn>
            </v-form>
            <p class="mt-5">{{ t('noAccount') }} <router-link :to="{ name: 'register', params: { type: 'user' } }"> {{ t('registerHere') }}   </router-link></p>
        </v-card>
    </v-container>
</template>


<script setup lang="ts">
  import { useUsersStore } from "@/stores/userStore";
  import router from "@/router";
  import { form } from "@/types/form";
  import { toast } from "vue3-toastify";
  import { useI18n } from 'vue-i18n'


  const { t } = useI18n()
  const store = useUsersStore();
  const handleSubmit = async () => {

    try {
      const success =  await store.login(form)

      if (success) {
        toast(t('okLogin'), {
          type: "success",
          onClose: () => {
            router.push("/");
          },
        });
    } else {
        toast(t('koLogin'), {
          type: "error",
          onClose: () => {
            form.email = "";
            form.password = "";
          }
        })
    }

    console.log(form);

    } catch (error) {
      console.log("Error: ", error);
      toast.error(t('errorLogin'))
    }
    
  };

  
</script>

<style scoped>

</style>