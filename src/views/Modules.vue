<script setup>
    import { computed } from 'vue';
    import { RouterLink, useRouter, useRoute } from 'vue-router';
    import { Motion } from 'motion/vue';
    import { useMannaStore } from './../stores/manna.js';
    import { useRoutes } from './../router/routes.js';

    const route = useRoute();
    const routes = useRoutes();
    const MannaStore = useMannaStore();

    const modules = computed(() => {
        var {meta} = route;
        var {modules} = meta;
        return MannaStore[modules];
    });
    const title = computed(() => {
        var {meta} = route;
        var {title} = meta;
        return title;
    });
</script>

<template>
    <main class="page" id="modules">
        <article>
            <header>
                <div class="title">
                    {{title}}
                </div>
            </header>
            <div class="modules">
                <Motion :animate="{ opacity: 1, transform: 'scale(1) translateY(0)' }" :initial="{ opacity: 0, transform: 'scale(1.2) translateY(25px)' }" :transition="{ delay: 0.65 + (idx * 0.035), duration: 2 }" v-for="(mod, idx) in modules">
                    <router-link class="module" :to="{ name: 'module', params: { module: mod.Module } }">
                        <span class="name">{{mod.Module}}</span>
                        <span class="desc">{{mod.Description}}</span>
                    </router-link>
                </Motion>
            </div>
        </article>
    </main>
</template>

<style lang="less">
    #modules {
        .modules {
            @apply divide-y flex flex-col lg:-mx-3;

            .module {
                @apply cursor-pointer duration-500 flex py-3 px-4 rounded-sm space-x-2 text-lg transition lg:mx-0;

                &:hover {
                    @apply bg-gray-50;
                }

                .desc{
                    @apply font-thin text-slate-400 truncate;
                }

                .name{
                    @apply font-medium;
                }
            }
        }
    }
</style>
