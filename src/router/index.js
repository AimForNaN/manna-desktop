import {
	createRouter,
	createWebHashHistory,
} from 'vue-router';
import Index from '../views/Index.vue';

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
        {
			path: '/',
			name: 'home',
			component: Index,
		},
	],
});

export default router;
