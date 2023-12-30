import { createRouter, createWebHashHistory } from "vue-router";

import MainSection from '@/pages/MainSection.vue';
import ShipList from '@/pages/ShipList.vue';

import LoginSection from '@/components/auth/LoginSection.vue';
import SignUpSection from '@/components/auth/SignUpSection.vue';

import ShipRegister from '@/components/register/ShipRegister.vue';

import store from "@/store/index.js";

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
			meta: { requiresAuth: true },
		},
		{
			path: '/SignUpSection',
			component: SignUpSection,
		},
		{
			path: '/ShipRegister',
			component: ShipRegister,
		},
	]
});

router.beforeEach((to, _, next) => {
	if(to.meta.requiresAuth && store.getters['auth/isToken']) {
		alert('이미 로그인이 되어 있습니다.');
		next('/');
	} else {
		next();
	}
});

export default router;