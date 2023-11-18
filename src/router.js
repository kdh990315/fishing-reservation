import { createRouter, createWebHashHistory } from "vue-router";

import MainSection from '@/pages/MainSection.vue';
import ShipList from '@/pages/ShipList.vue';
import LoginSection from '@/components/auth/LoginSection.vue';
import SignUpSection from '@/components/auth/SignUpSection.vue';


const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: MainSection,
		},
		{
			path: '/ShipList',
			component: ShipList,
		},
		{
			path: '/LoginSection',
			component: LoginSection,
		},
		{
			path: '/SignUpSection',
			component: SignUpSection,
		},
	]
});

export default router;