import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const http2 = window.require('http2');
const base = 'http://localhost:7777';

export default new Vuex.Store({
    modules: {},
    state: {
        Bible: {
            Book: 'Genesis',
            Chapter: 1,
            LineByLine: true,
			Modules: {
				Commentary: null,
				Text: 'KJV', // ESV not allowed by publisher!
			},
            VerseNumbers: true,
        },
        Fonts: [
            // Serif
            'Amiri',
            'Balthazar',
            'Peddana',
            'Suravaram',
            // Sans-Serif
            'Barlow',
            'Jaldi',
            'Metrophobic',
            'Roboto Condensed',
            'Sunflower',
            'Tajawal',
        ],
        Modules: new Map(),
        Plugins: [],
        Settings: {
            Font: 'Suravaram',
			FontSize: 1.35,
			LetterSpacing: 0,
			LineHeight: 2,
            WordSpacing: 3,
        },
    },
    mutations: {
        SetBiblicalBook(state, book) {
            var {Bible} = state;
            Bible.Book = String(book);
        },
        SetBiblicalTextModule(state, mod) {
            var {Bible} = state;
            var {Modules} = Bible;
            Modules.Text = String(mod);
        },
        SetBiblicalChapter(state, chapter) {
            var {Bible} = state;
            Bible.Chapter = ~~parseInt(chapter);
        },
        SetModules(state, mods) {
            mods = Array.from(mods);
            var {Modules} = state;
            state.Modules = mods.reduce((ret, mod) => {
                ret.set(mod.Name, mod);
                return ret;
            }, Modules);
        },
        SetFont(state, f) {
            var {Settings} = state;
            Settings.Font = String(f);
        },
        SetFontSize(state, fs) {
            var {Settings} = state;
            Settings.FontSize = parseFloat(fs);
        },
        SetLetterSpacing(state, ls) {
            var {Settings} = state;
            Settings.LetterSpacing = parseFloat(ls);
        },
        SetLineByLine(state, lbl) {
            var {Bible} = state;
            Bible.LineByLine = Boolean(lbl);
        },
        SetLineHeight(state, lh) {
            var {Settings} = state;
            Settings.LineHeight = parseFloat(lh);
        },
        SetWordSpacing(state, ws) {
            var {Settings} = state;
            Settings.WordSpacing = parseFloat(ws);
        },
        SetVerseNumbers(state, vn) {
            var {Bible} = state;
            Bible.VerseNumbers = Boolean(vn);
        },
    },
    actions: {
        GetModules({commit}, params = {}) {
            return new Promise((resolve, reject) => {
                var url = new URL('/v1/modules', base);
                var {searchParams} = url;

                Object.entries(params).forEach(([key, val]) => {
                    searchParams.set(key, val);
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
                    resolve();
                });
                req.end();
            });
        },
        ReloadCache({ commit }) {
            return new Promise((resolve, reject) => {
                var url = new URL('/v1/library/refresh', base);

                var data = '';
                var client = http2.connect(base);
                var req = client.request({
                    ':path': url.pathname,
                });
                req.setEncoding('utf8');
                req.on('data', (chunk) => {
                    data += chunk;
                });
                req.on('end', () => {
                    client.close();
                    commit('SetModules', JSON.parse(data));
                    resolve();
                });
                req.end();
            });
        },
    },
})
