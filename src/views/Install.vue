<script setup>
    import { ref } from 'vue';
    import { Motion } from 'motion/vue';
    import { useMannaStore } from './../stores/manna.js';

    const MannaStore = useMannaStore();
    const source = ref(null);
</script>

<template>
    <article id="install">
        <ul class="sources">
            <Motion :animate="{ opacity: 1, transform: 'scale(1)' }" :initial="{ opacity: 0, transform: 'scale(1.15)' }" :transition="{ delay: 0.65 + (idx * 0.05), duration: 2 }" v-for="(src,idx) in MannaStore.Install">
                <li class="source" :class="{ active: source == src}" @click="source = src">{{src.Source}}</li>
            </Motion>
        </ul>
        <section>
            <ul v-if="source">
                <li v-for="mod in source.modules">{{mod.Description}}</li>
            </ul>
        </section>
    </article>
</template>

<style lang="less">
    #install {
        @apply flex;

        .sources {
            @apply space-y-3;

            .source {
                @apply cursor-pointer duration-500 transition hover:translate-x-2;

                &.active {
                    @apply font-bold hover:translate-x-0;
                }
            }
        }
    }
</style>
