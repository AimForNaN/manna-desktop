import {
	createRouter,
	createWebHashHistory,
} from 'vue-router';

import Bread from '../views/Bread.vue';
import Index from '../views/Index.vue';

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
        {
			path: '/',
			name: 'home',
			component: Index,
		},
        {
			path: '/bread',
			name: 'bread',
			component: Bread,
		},
	],
});

export default router;
