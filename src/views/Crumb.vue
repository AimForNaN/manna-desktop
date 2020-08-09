<script>
    import ModuleView from './Module.vue';

    import ChapterSelector from '../components/GenericBookSelector.vue';

    export default {
        extends: ModuleView,
        components: {
            ChapterSelector,
        },
        computed: {
            GenericBookStructure: {
                cache: false,
                get() {
                    var {Structure} = this;
                    Structure = Array.from(Object.entries(Structure));
                    return Structure;
                },
            },
            ModuleStructure: {
                cache: false,
                get() {
                    var {GenericBookStructure} = this;
                    return GenericBookStructure;
                },
            },
            SubTitle: {
                cache: false,
                get() {
                    var {module} = this;
                    var {Key} = module;
                    return Key;
                },
            },
            Title: {
                cache: false,
                get() {
                    var {module} = this;
                    var {Name} = module;
                    return Name;
                },
            },
        },
        methods: {
            onSearch() {
            },
            prev() {
            },
            next() {
            },
            setKey() {
            }
        },
    }
</script>
