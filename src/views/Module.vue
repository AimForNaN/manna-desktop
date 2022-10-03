<script setup>
    import { computed, onMounted, reactive, unref, watch } from 'vue';
    import { RouterLink, useRoute } from 'vue-router';
    import { Motion } from 'motion/vue';
    import { useMannaStore } from './../stores/manna.js';
    import { useRoutes } from './../router/routes.js';

    import StructureListItem from './../components/StructureListItem.vue';

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
            setTimeout(() => {
                state.Text = data;
            }, 1500);
        });
    });

    onMounted(() => {
        var {params} = route;
        var {module} = params;
        MannaStore.fetchStructure(module).then((data) => {
            state.Structure = data;
            var [first] = data;
            switch (first.Type) {
                case 'Biblical Texts': {
                    let {Name} = first;
                    first = `${Name}.1`;
                    break;
                }
            }
            state.Key = first;
        });
    });
</script>

<template>
    <main class="page" id="module">
        <aside class="structure">
            <Motion :animate="{ opacity: 1 }" :initial="{ opacity: 0 }" v-if="state.Structure.length">
                <nav>
                    <ul class="structure-list">
                        <StructureListItem :key="item.Name" :item="item" @click="setKey" v-for="item in state.Structure"></StructureListItem>
                    </ul>
                </nav>
            </Motion>
        </aside>
        <article>
            <header>
                <div class="title">
                    <span>{{title}}</span>
                </div>
                <div class="subtitle">{{subtitle}}</div>
            </header>
            <Motion :animate="{ opacity: 1 }" :initial="{ opacity: 0 }" :transition="{ duration: 2 }" v-if="state.Text.length">
                <div v-for="(row, idx) in state.Text">
                    {{getText(row.Text)}}
                </div>
            </Motion>
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

        .structure-list {
            @apply divide-y;
        }
    }
</style>
