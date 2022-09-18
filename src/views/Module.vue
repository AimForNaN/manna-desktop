<script setup>
    import { computed, onMounted, reactive, unref } from 'vue';
    import { RouterLink, useRoute } from 'vue-router';
    import { Motion } from 'motion/vue';
    import { useMannaStore } from './../stores/manna.js';
    import { useRoutes } from './../router/routes.js';

    const state = reactive({
        Key: null,
        Structure: [],
        Text: [],
    });

    const route = useRoute();
    const routes = useRoutes();
    const MannaStore = useMannaStore();

    const module = computed(() => {
        var {params} = route;
        var {module} = params;
        var {ModulesMapped} = MannaStore;
        return ModulesMapped[module];
    });
    const structure = computed(() => {
        var moduleref = unref(module);
        var {Structure} = state;
        return Structure.reduce((ret, item) => {
            if (moduleref) {
                switch (moduleref.Type) {
                    case 'Biblical Texts': {
                        let {
                            Book,
                            Chapters,
                        } = item;
                        if (typeof ret[Book] == 'undefined') {
                            ret[Book] = {};
                        }
                        for (var i = 0; i < Chapters; i++) {
                            let Chapter = i+1;
                            ret[Book][Chapter] = `${Book}.${Chapter}`;
                        }
                        break;
                    }
                    case 'Generic Books': {
                        // ret[];
                        break;
                    }
                }
            }
            return ret;
        }, {});
    });
    const subtitle = computed(() => {
        var {Description} = unref(module) ?? {};
        return Description ?? 'Untitled';
    });
    const title = computed(() => {
        var {Key} = state;
        return String(Key ?? 'Untitled').replace('.', ' ');
    });

    onMounted(() => {
        document.body.classList.add('border-t-4');
        document.body.classList.add('border-slate-600');

        if (module.value) {
            let {Module} = unref(module);
            MannaStore.fetchStructure(Module).then((data) => {
                state.Structure = data;
                var [first] = data;
                switch (module.value.Type) {
                    case 'Biblical Texts': {
                        let {Book} = first;
                        first = `${Book}.1`;
                        break;
                    }
                }
                state.Key = first;
                MannaStore.fetchText(Module, first).then((data) => {
                    state.Text = data;
                });
            });
        }
    });
</script>

<template>
    <main class="page" id="module">
        <header>
            <span class="title">{{title}}</span>
            <span class="subtitle">{{subtitle}}</span>
        </header>
        <article>
            <div v-for="row in state.Text">
                {{row.Text}}
            </div>
        </article>
    </main>
</template>

<style lang="less">
    #module {
        > header {
            @apply flex flex-col;

            .subtitle {
                @apply font-normal text-base text-slate-400;
            }
        }
    }
</style>
