<script setup>
    import { computed, onMounted } from 'vue';
    import { RouterLink, RouterView, useRoute } from 'vue-router';

    const route = useRoute();

    const children = computed(() => {
        var {matched} = route;
        var [current] = matched;
        var {children} = current;
        return children;
    });

    onMounted(() => {
        document.body.classList.add('border-t-4');
        document.body.classList.add('border-slate-600');
    });
</script>

<template>
    <main class="page" id="bakery">
        <header>
            The Bakery
        </header>
        <nav>
            <router-link :to="item" v-for="item in children">{{item.meta.title}}</router-link>
        </nav>
        <RouterView></RouterView>
    </main>
</template>

<style lang="less">
    #bakery {
        > nav {
            @apply flex;

            > a {
                @apply border-b-4 border-transparent duration-500 px-4 py-2 transition hover:border-gray-700;

                &.router-link-exact-active {
                    @apply border-gray-700;
                }
            }
        }
    }
</style>
