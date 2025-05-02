<template>

    <v-container class="pt-10">
        <h1 class="text-h4 text-md-h3 mb-6 mb-md-10 text-center mt-4 mt-md-10">Login</h1>
        <v-card class="mx-auto px-6 py-8" max-width="350">
            <v-form  @submit.prevent="handleSubmit">
            <v-text-field v-model="form.username" label="Username" name="username" />
            <v-text-field
                v-model="form.password"
                label="Password"
                name="password"
                type="password"
            />
            <v-btn type="submit">Login</v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>


<script setup lang="ts">
import { reactive } from "vue";

interface Form {
  username: string
  password: string
}

const form = reactive<Form>({
  username: "",
  password: "",
});

const handleSubmit = () => {
  // make api request
  
  console.log(form);
};
</script>

<style scoped>

</style>