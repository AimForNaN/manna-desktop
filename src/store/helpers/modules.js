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
        loadModule(mod) {
            this.$router.push({
                name: 'Bread',
                params: {
                    mod: mod.Name,
                    key: 'Genesis.1',
                },
            });
        },
    },
}
