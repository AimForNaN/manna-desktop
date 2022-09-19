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
        <header>
            <span>The Bakery</span>
            <nav>
                <router-link :to="item" v-for="item in children">{{item.meta.title}}</router-link>
            </nav>
        </header>
        <RouterView></RouterView>
    </main>
</template>

<style lang="less">
    #bakery {
        > header {
            @apply flex flex-col space-y-8;

            > nav {
                @apply font-medium flex text-base;

                > a {
                    @apply border-b-4 border-transparent duration-500 px-4 py-2 transition hover:border-slate-200;

                    &.router-link-exact-active {
                        @apply border-slate-700;
                    }
                }
            }
        }
    }
</style>
