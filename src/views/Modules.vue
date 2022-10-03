<script setup>
    import { computed } from 'vue';
    import { RouterLink, useRouter, useRoute } from 'vue-router';
    import { useMannaStore } from './../stores/manna.js';
    import { useRoutes } from './../router/routes.js';
    import Modules from './../components/Modules.vue';

    const route = useRoute();
    const router = useRouter();
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

    function nav(mod) {
        router.push({ name: 'module', params: { module: mod }});
    }
</script>

<template>
    <main class="page" id="modules">
        <article class="page-article">
            <header class="page-header">
                <div class="title">
                    {{title}}
                </div>
            </header>
            <Modules class="page-content" :items="modules" @click="nav" no-actions></Modules>
        </article>
    </main>
</template>

<style lang="less">
    #modules {
        .modules {
            .module {
                @apply cursor-pointer;
            }
        }
    }
</style>
