import Vue from 'vue';
import VueRouter from 'vue-router';

import Bread from '../views/Bread.vue';
import Breads from '../views/Breads.vue';
import Home from '../views/Home.vue';
import Page from '../views/Page.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/breads',
        component: Page,
        children: [
            {
                path: '',
                name: 'Breads',
                component: Breads,
            },
            {
                path: ':mod/:key',
                name: 'Bread',
                component: Bread,
            },
        ],
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
