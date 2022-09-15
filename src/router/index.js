import {
	createRouter,
	createWebHashHistory,
} from 'vue-router';

import Bakery from '../views/Bakery.vue';
import Editor from '../views/Editor.vue';
import Modules from '../views/Modules.vue';
import Install from '../views/Install.vue';
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
				nav: 'main',
				title: 'The Bread',
			},
			component: Modules,
		},
        {
			path: '/crumbs',
			name: 'crumbs',
			meta: {
				modules: 'GenericBooks',
				nav: 'main',
				title: 'The Crumbs',
			},
			component: Modules,
		},
        {
			path: '/bakery',
			meta: {
				nav: 'main',
				title: 'The Bakery',
			},
			component: Bakery,
			children: [
				{
					path: '',
					name: 'install',
					component: Install,
					meta: {
						title: 'Install',
					},
				},
				{
					path: 'editor',
					name: 'editor',
					component: Editor,
					meta: {
						title: 'Editor',
					},
				},
			],
		},
	],
});

export default router;
