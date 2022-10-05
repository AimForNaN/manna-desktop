<script setup>
    import { computed, onMounted, reactive, unref, watch } from 'vue';
    import { RouterLink, useRoute } from 'vue-router';
    import { Motion } from 'motion/vue';
    import { useMannaStore } from './../stores/manna.js';
    import { useRoutes } from './../router/routes.js';

    import StructureListItem from './../components/StructureListItem.vue';

    const state = reactive({
        Filter: '',
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
        var {Filter, Structure} = state;
        return Structure.filter((item) => {
            if (Filter) {
                let {Key,Name} = item;
                let items = [Key,Name].filter(x => x).map(x => String(x).toLowerCase());
                return items.find(x => String(x).toLowerCase().includes(Filter));
            }
            return true;
        });
    });
    const subtitle = computed(() => {
        var {Description} = unref(module) ?? {};
        return Description;
    });
    const title = computed(() => {
        var {Key} = state;
        return String(Key ?? '').replace(/[\.\/]+/, ' ');
    });

    function getText(text) {
        var div = document.createElement('div');
        div.innerHTML = text;
        return div.innerText;
    }
    function setKey(key) {
        state.Text = [];
        state.Key = key;
    }

    watch(() => state.Key, (nv, ov) => {
        let {Module} = unref(module);
        MannaStore.fetchText(Module, nv).then((data) => {
            state.Text = data;
        });
    });

    onMounted(() => {
        var {query, params} = route;
        var {module} = params;
        MannaStore.fetchStructure(module).then((data) => {
            state.Structure = data;
            if (!query.key) {
                var [first] = data;
                [first] = first.Children;
                switch (first.Type) {
                    case 'Biblical Texts': {
                        let {Key} = first;
                        first = Key;
                        break;
                    }
                }
                setKey(first);
            } else {
                setKey(query.key);
            }
        });
    });
</script>

<template>
    <main class="page" id="module">
        <aside class="structure">
            <header class="structure-header">
                <input placeholder="Filter" type="text" v-model="state.Filter">
            </header>
            <Motion :animate="{ opacity: 1 }" :initial="{ opacity: 0 }" v-if="state.Structure.length">
                <nav>
                    <ul class="structure-list">
                        <StructureListItem :key="item.Name" :item="item" @click="setKey" v-for="item in structure"></StructureListItem>
                    </ul>
                </nav>
            </Motion>
        </aside>
        <article class="page-article">
            <header class="page-header">
                <div class="title">
                    <span>{{title}}</span>
                </div>
                <div class="subtitle">{{subtitle}}</div>
            </header>
            <section class="page-content">
                <Motion :animate="{ opacity: 1 }" :initial="{ opacity: 0 }" :transition="{ duration: 2 }" v-if="state.Text.length">
                    <ol>
                        <li v-for="(row, idx) in state.Text">
                            {{getText(row.Text)}}
                        </li>
                    </ol>
                </Motion>
            </section>
        </article>
    </main>
</template>

<style lang="less">
    #module {
        @apply flex;

        > article {
            @apply flex flex-col;
        }
    }

    .structure {
        @apply bg-gray-50 flex flex-col flex-shrink-0 overflow-y-auto text-base w-screen md:w-80;

        .structure-header {
            @apply bg-gray-50 border-b flex p-3 sticky top-0;

            input {
                @apply w-full;
            }
        }

        .structure-list {
            @apply divide-y;
        }
    }
</style>
