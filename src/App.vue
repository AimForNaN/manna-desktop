<script setup>
    import { RouterView } from 'vue-router';
    import { animate } from 'motion';

    function onEnter(el, done) {
        animate(el, {
            opacity: [0,1],
            transform: ['translateY(200px)', 'translateY(0)'],
        }, {
            duration: 1,
        }).finished.then(done);
    }

    function onLeave(el, done) {
        animate(el, {
            opacity: 0,
            transform: 'translateY(-100px) scale(0.95)',
        }, {
            duration: 1,
        }).finished.then(done);
    }
</script>

<template>
    <RouterView class="view" v-slot="{ Component }">
        <Transition @enter="onEnter" @leave="onLeave">
            <component :is="Component"></component>
        </Transition>
    </RouterView>
</template>

<style lang="less">
    #app {
        @apply fixed inset-0 overflow-hidden;

        .view {
            @apply fixed inset-0;
        }
    }
</style>
