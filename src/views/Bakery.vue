<script setup>
    import { computed } from 'vue';
    import { RouterLink, RouterView, useRoute } from 'vue-router';

    const route = useRoute();

    const children = computed(() => {
        var {matched} = route;
        var [current] = matched;
        var {children} = current;
        return children;
    });
</script>

<template>
    <main class="page" id="bakery">
        <article>
            <header class="bakery-top">
                <div class="title">The Bakery</div>
                <nav class="tabs">
                    <router-link :to="item" v-for="item in children">{{item.meta.title}}</router-link>
                </nav>
            </header>
            <RouterView></RouterView>
        </article>
    </main>
</template>

<style lang="less">
    #bakery {
        .bakery-top {
            @apply flex flex-col space-y-8;

        }

        .tabs {
            @apply font-medium flex text-base;

            > a {
                @apply border-b-4 border-transparent duration-500 px-4 py-2 transition hover:border-slate-200;

                &.router-link-exact-active {
                    @apply border-slate-700;
                }
            }
        }
    }
</style>
