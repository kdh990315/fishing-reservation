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

//firebase초기화
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
	apiKey: "AIzaSyAgS9gPUCK2Pfd-assFgSZe2mpK094JQIA",
	authDomain: "fishing-reservation-54646.firebaseapp.com",
	databaseURL: "https://fishing-reservation-54646-default-rtdb.firebaseio.com",
	projectId: "fishing-reservation-54646",
	storageBucket: "fishing-reservation-54646.appspot.com",
	messagingSenderId: "467562714108",
	appId: "1:467562714108:web:027ef2e2b9af67708b1879",
	measurementId: "G-KW0SRZEJYL"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

console.log(analytics);

const app = createApp(App);
app.component('LoginSection', LoginSection);
app.component('SignUpSection', SignUpSection);
app.component('BaseButton', BaseButton);
app.component('BaseLoading', BaseLoading);
app.component('BaseDialog', BaseDialog);
app.use(router);
app.use(store);
app.mount('#app');