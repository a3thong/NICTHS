import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vue3-easy-data-table/dist/style.css';
import PrimeVue from 'primevue/config';
import Button from "primevue/button"
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import 'primevue/resources/themes/saga-blue/theme.css';       // theme
import 'primevue/resources/primevue.min.css';                  // core css
import 'primeicons/primeicons.css';                            // icons








const app = createApp(App);
createApp(App).mount('#app')
createApp(App).use(router).mount('#app')
app.use(PrimeVue);
app.component('Button', Button);
app.component('Calendar', Calendar)
app.component('Dropdown', Dropdown)
