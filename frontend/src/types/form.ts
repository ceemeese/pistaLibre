import { reactive } from "vue";

export interface Form {
    email: string
    password: string
  }

export const form = reactive<Form>({
    email: "",
    password: "",
});

