import { createRouter, createWebHashHistory } from "vue-router";

import MainSection from '@/pages/MainSection.vue';
import ShipList from '@/pages/ShipList.vue';
import SearchList from '@/pages/SearchList.vue';

import LoginSection from '@/components/auth/LoginSection.vue';
import SignUpSection from '@/components/auth/SignUpSection.vue';

import ShipRegister from '@/components/register/ShipRegister.vue';

import store from "@/store/index.js";
import ManagementSection from "./components/management/ManagementSection.vue";

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
			path: '/SearchList',
			component: SearchList,
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
			meta: { requiresRegister: true },
		},
		{
			path: '/ManagementSection',
			component: ManagementSection,
			meta: { requiresRegister: true },
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

router.beforeEach((to, _, next) => {
	if(to.meta.requiresRegister && !store.getters['auth/isToken']) {
		alert('해당 기능은 로그인 후 이용이 가능합니다.');
		next('/');
	} else {
		next();
	}
});

export default router;