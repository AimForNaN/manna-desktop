<script setup>
    import { computed, onMounted, reactive, unref, watch } from 'vue';
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

    watch(() => state.Key, (nv, ov) => {
        let {Module} = unref(module);
        MannaStore.fetchText(Module, nv).then((data) => {
            setTimeout(() => {
                state.Text = data;
            }, 1500);
        });
    });

    onMounted(() => {
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
            });
        }
    });
</script>

<template>
    <main class="page" id="module">
        <header>
            <div class="title">
                <span>{{title}}</span>
            </div>
            <div class="subtitle">{{subtitle}}</div>
        </header>
        <article>
            <Motion :animate="{ opacity: 1 }" :initial="{ opacity: 0 }" :transition="{ duration: 2 }" v-if="state.Text.length">
                <div v-for="(row, idx) in state.Text">
                    {{row.Text}}
                </div>
            </Motion>
        </article>
    </main>
</template>

<style lang="less">
    #module {
        > article {
            @apply leading-loose;
        }

        > header {
            @apply flex flex-col;

            .subtitle {
                @apply font-normal text-base text-slate-400;
            }

            .title {
                @apply flex items-center;
            }
        }
    }

    @screen 2xl {
        #module {
            padding-left: 32%;
            padding-right: 32%;
        }
    }
</style>
