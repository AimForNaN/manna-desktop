<script setup>
    import { Motion } from 'motion/vue';
    import { useMannaStore } from '../stores/manna.js';

    const MannaStore = useMannaStore();
</script>

<template>
    <main id="bread">
        <header>
            The Bread
        </header>
        <Motion :animate="{ opacity: 1, transform: 'translateY(0)' }" :initial="{ opacity: 0, transform: 'translateY(25px)' }" :transition="{ delay: 0.75, duration: 2 }">
            <article class="modules">
                <a class="module" v-for="mod in MannaStore.Bibles">
                    <span class="name">{{mod.Description}}</span>
                </a>
            </article>
        </Motion>
    </main>
</template>

<style lang="less">
    #bread {
        @apply p-8 space-y-8 md:m-auto md:px-0 md:py-24 md:w-3/4 lg:w-1/2 lg:space-y-12;

        header {
            @apply font-bold font-roboto-condensed text-5xl;
        }

        .modules {
            @apply cursor-pointer gap-5 grid grid-cols-1 lg:gap-8 lg:grid-cols-2 lg:-mx-3 xl:grid-cols-3;

            .module {
                @apply duration-300 flex flex-col rounded text-lg transition lg:p-3 lg:h-24;

                &:hover {
                    @apply ring-1 ring-slate-300;
                }

                .name{
                    @apply truncate;
                }
            }
        }
    }
</style>
