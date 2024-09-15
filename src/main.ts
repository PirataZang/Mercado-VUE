import './assets/main.css'

import { createApp, VueElement } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '../scss/default.scss'
import api from './components/utils/api.js'
import Grid from './components/utils/Grid.vue'
import ProductsForm from './components/Products/ProductsForm.vue'
import aInput from './components/utils/fields/aInput.vue'
import aButton from './components/utils/fields/aButton.vue'
import swal from 'sweetalert2';
import aSelect from './components/utils/fields/aSelect.vue'

const app = createApp(App)

const vue = VueElement;

// Desabilitar Vue Devtools em Produção
app.config.devtools = false
app.config.productionTip = false

// PRODUCTS
app.component('ProductsForm', ProductsForm);

app

// UTILS
app.component('Grid', Grid)

// FIELDS
app.component('aInput', aInput)
app.component('aButton', aButton)
app.component('aSelect', aSelect)



// GLOBAL CONFIGS
app.config.globalProperties.$api = api;
app.config.globalProperties.$swal = swal;

app.use(createPinia())
app.use(router)

app.mount('#app')
