import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import '@/scss/reset.scss';

import HeaderSection from '@/components/layout/HeaderSection.vue';
import FooterSection from '@/components/layout/FooterSection.vue';

import LoginSection from '@/components/auth/LoginSection.vue';
import SignUpSection from '@/components/auth/SignUpSection.vue';

import BaseButton from '@/components/ui/BaseButton.vue';

const app = createApp(App);
app.component('HeaderSection', HeaderSection);
app.component('FooterSection', FooterSection);
app.component('LoginSection', LoginSection);
app.component('SignUpSection', SignUpSection);
app.component('BaseButton', BaseButton);
app.use(router);
app.mount('#app');