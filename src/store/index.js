import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const base = 'https://localhost:7777';

import modules from './libs/';

export default new Vuex.Store({
    modules,
    state: {
        Bible: {
            Book: 'Genesis',
            Chapter: 1,
            LineByLine: true,
			Modules: {
				Commentary: null,
				Text: 'KJV', // ESV not allowed by publisher!
			},
            Notes: true,
            Strongs: true,
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
            Headings: true,
			LetterSpacing: 0,
			LineHeight: 2,
            WhiteSpace: true,
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
        SetFont(state, f) {
            var {Settings} = state;
            Settings.Font = String(f);
        },
        SetFontSize(state, fs) {
            var {Settings} = state;
            Settings.FontSize = parseFloat(fs);
        },
        SetHeadings(state, h) {
            var {Settings} = state;
            Settings.Headings = Boolean(h);
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
        SetModules(state, mods) {
            mods = Array.from(mods);
            var {Modules} = state;
            state.Modules = mods.reduce((ret, mod) => {
                ret.set(mod.Name, mod);
                return ret;
            }, Modules);
        },
        SetShowNotes(state, n) {
            var {Bible} = state;
            Bible.Notes = Boolean(n);
        },
        SetShowStrongs(state, s) {
            var {Bible} = state;
            Bible.Strongs = Boolean(s);
        },
        SetWhiteSpace(state, ws) {
            var {Settings} = state;
            Settings.WhiteSpace = Boolean(ws);
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

                fetch(url).then((rsp) => {
                    if (rsp.ok) {
                        rsp.json().then((data) => {
                            commit('SetModules', data);
                            resolve(data);
                        });
                    }
                });
            });
        },
        ReloadCache({ commit }) {
            return new Promise((resolve, reject) => {
                var url = new URL('/v1/library/refresh', base);

                fetch(url, {
                    method: 'POST',
                }).then((rsp) => {
                    if (rsp.ok) {
                        rsp.json().then((data) => {
                            commit('SetModules', data);
                            resolve(data);
                        });
                    }
                });
            });
        },
    },
})
