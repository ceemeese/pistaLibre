import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './plugins/i18n'
import vuetify from './plugins/vuetify'
import Toast, { options } from './plugins/toastification'

import VCalendar from 'v-calendar';
import 'v-calendar/style.css';


import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import App from './App.vue'
import router from './router'



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)
app.use(Toast, options)
app.use(VCalendar, {})
app.component('VueDatePicker', VueDatePicker);


app.mount('#app')



