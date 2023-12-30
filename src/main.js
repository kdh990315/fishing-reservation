import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import '@/scss/reset.scss';

import LoginSection from '@/components/auth/LoginSection.vue';
import SignUpSection from '@/components/auth/SignUpSection.vue';

import BaseButton from '@/components/ui/BaseButton.vue';
import BaseLoading from '@/components/ui/BaseLoading.vue';
import BaseDialog from '@/components/ui/BaseDialog.vue';


const app = createApp(App);
app.component('LoginSection', LoginSection);
app.component('SignUpSection', SignUpSection);
app.component('BaseButton', BaseButton);
app.component('BaseLoading', BaseLoading);
app.component('BaseDialog', BaseDialog);
app.use(router);
app.use(store);
app.mount('#app');