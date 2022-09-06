<script setup>
    import { onMounted } from 'vue';
    import { Motion } from 'motion/vue';
    import { useMannaStore } from '../stores/manna.js';

    const MannaStore = useMannaStore();

    onMounted(() => {
        document.body.classList.add('border-t-4');
        document.body.classList.add('border-slate-600');
    });
</script>

<template>
    <main id="bread">
        <header>
            The Bread
        </header>
        <article class="modules">
            <Motion :animate="{ opacity: 1, transform: 'translateY(0)' }" :initial="{ opacity: 0, transform: 'translateY(25px)' }" :transition="{ delay: 0.75 + (idx * 0.1), duration: 2 }" v-for="(mod, idx) in MannaStore.Bibles">
                <a class="module">
                    <span class="name">{{mod.Module}}</span>
                    <span class="desc">{{mod.Description}}</span>
                </a>
            </Motion>
        </article>
    </main>
</template>

<style lang="less">
    #bread {
        @apply p-8 py-16 space-y-8 md:m-auto md:px-0 md:py-24 md:w-3/4 lg:w-1/2 lg:space-y-12;

        header {
            @apply font-bold font-roboto-condensed text-5xl;
        }

        .modules {
            @apply gap-5 grid grid-cols-1 lg:grid-cols-2 lg:-mx-3 xl:grid-cols-3;

            .module {
                @apply cursor-pointer duration-300 flex flex-col rounded-sm text-lg transition lg:p-3 lg:px-4 lg:h-32;

                &:hover {
                    @apply ring-1 ring-slate-300;
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
