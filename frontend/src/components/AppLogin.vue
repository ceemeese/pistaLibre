<template>

    <v-container>
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-3 mt-md-10">Login</h1>
        <v-card class="mx-auto px-6 py-8" max-width="350">
            <v-form  @submit.prevent="handleSubmit">
            <v-text-field v-model="form.email" label="Email" name="email" />
            <v-text-field
                v-model="form.password"
                label="Contraseña"
                name="password"
                type="password"
            />
            <v-btn type="submit">Login</v-btn>
            </v-form>
            <p class="mt-5">¿No tienes cuenta? <router-link to="/register">Regístrate aquí</router-link></p>
        </v-card>
    </v-container>
</template>


<script setup lang="ts">
  import { useUsersStore } from "@/stores/userStore";
  import router from "@/router";
  import { form } from "@/types/form";
  import { onMounted } from "vue";
  import { toast } from "vue3-toastify";
  

  const store = useUsersStore();

  onMounted(() => {
        store.fetchAll();
    });



  const handleSubmit = async () => {

    try {
      const success =  await store.login(form)

      if (success) {
        toast("Inicio de sesión correcto", {
          type: "success",
          onClose: () => {
            router.push("/");
          },
        });
    } else {
        toast("Usuario o contraseña incorrectos", {
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
      toast.error("Error al intentar iniciar sesión")
    }
    
  };

  
</script>

<style scoped>

</style>