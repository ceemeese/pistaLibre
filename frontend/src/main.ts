import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

//i18n internalizacion
import i18n from './plugins/i18n'

//Vuetify
import vuetify from './plugins/vuetify'

//Toastify
import Vue3Toastify from "vue3-toastify"; 
import { toastifyOptions } from "./plugins/toastify";
import "vue3-toastify/dist/index.css";

//VCalendar
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

//VueDatePicker
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import App from './App.vue'
import router from './router'



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)
app.use(VCalendar, {})
app.component('VueDatePicker', VueDatePicker);
app.use(Vue3Toastify, toastifyOptions);


app.mount('#app')



