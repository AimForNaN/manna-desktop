import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const http2 = window.require('http2');
const base = 'http://localhost:7777';

export default new Vuex.Store({
    modules: {},
    state: {
        Modules: new Map(),
    },
    mutations: {
        SetModules(state, mods) {
            state.Modules = mods;
        },
    },
    actions: {
        GetModules({commit}, params = {}) {
            var url = new URL('/v1/modules', base);
            var {searchParams} = url;

            Object.entries(params).forEach(([key, val]) => {
                searchParams.set(key, value);
            });

            var data = '';
            var client = http2.connect(base);
            var req = client.request({
                ':path': url.pathname + url.search,
            });
            req.setEncoding('utf8');
            req.on('data', (chunk) => {
                data += chunk;
            });
            req.on('end', () => {
                client.close();
                commit('SetModules', JSON.parse(data));
            });
            req.end();
        },
    },
})
