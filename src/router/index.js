import {
	createRouter,
	createWebHashHistory,
} from 'vue-router';

import Modules from '../views/Modules.vue';
import Index from '../views/Index.vue';

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
        {
			path: '/',
			name: 'home',
			meta: {
				title: 'Manna',
			},
			component: Index,
		},
        {
			path: '/bread',
			name: 'bread',
			meta: {
				modules: 'Bibles',
				title: 'The Bread',
			},
			component: Modules,
		},
        {
			path: '/crumbs',
			name: 'crumbs',
			meta: {
				modules: 'GenericBooks',
				title: 'The Crumbs',
			},
			component: Modules,
		},
	],
});

export default router;
