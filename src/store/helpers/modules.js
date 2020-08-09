import Module from './module.js';
const {computed} = Module;
const {ModuleBook, ModuleChapter} = computed;

export default {
    computed: {
        Bibles: {
            cache: false,
            get() {
                var {ModulesArray} = this;
                return ModulesArray.reduce((ret, mod) => {
                    if (mod.Type == 'Biblical Texts') {
                        ret.push(mod);
                    }
                    return ret;
                }, []);
            },
        },
        BiblicalTextModule: {
            cache: false,
            get() {
                var {Bible} = this.$store.state;
                var {Modules} = Bible;
                var {Text} = Modules;
                return Text;
            },
            set(v) {
                this.$store.commit('SetBiblicalTextModule', v);
            },
        },
        Commentaries: {
            cache: false,
            get() {
                var {ModulesArray} = this;
                return ModulesArray.reduce((ret, mod) => {
                    if (mod.Type == 'Commentaries') {
                        ret.push(mod);
                    }
                    return ret;
                }, []);
            },
        },
        GenericTexts: {
            cache: false,
            get() {
                var {ModulesArray} = this;
                return ModulesArray.reduce((ret, mod) => {
                    if (mod.Type == 'Generic Books') {
                        ret.push(mod);
                    }
                    return ret;
                }, []);
            },
        },
        ModuleBook,
        ModuleChapter,
        Modules: {
            cache: false,
            get() {
                return this.$store.state.Modules;
            },
        },
        ModulesArray: {
            cache: false,
            get() {
                var {Modules} = this.$store.state;
                return Array.from(Modules.values());
            },
        },
    },
    methods: {
        fetchModule(params) {
            return this.$store.dispatch('GetModules', params);
        },
        fetchModules() {
            return this.$store.dispatch('GetModules');
        },
        loadModule(mod, key) {
            var {Type} = mod;
            switch (Type) {
                case 'Biblical Texts': {
                    let {
                        ModuleBook,
                        ModuleChapter,
                    } = this;
                    this.$router.push({
                        name: 'Bread',
                        params: {
                            mod: mod.Name,
                            key: `${ModuleBook}.${ModuleChapter}`,
                        },
                    });
                    break;
                }
                case 'Generic Books': {
                    this.$router.push({
                        name: 'Crumb',
                        params: {
                            mod: mod.Name,
                            key,
                        },
                    });
                    break;
                }
            }
        },
        reloadCache() {
            return this.$store.dispatch('ReloadCache');
        },
    },
}
