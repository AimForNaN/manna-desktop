<script setup>
    import { onMounted } from 'vue';
    import { RouterView } from 'vue-router';
    import { animate } from 'motion';
    import { useMannaStore } from './stores/manna.js';

    const MannaStore = useMannaStore();

    function onEnter(el, done) {
        animate(el, {
            opacity: [0,1],
            transform: ['translateY(100px)', 'translateY(0)'],
        }, {
            duration: 1.5,
        }).finished.then(done);
    }
    function onLeave(el, done) {
        animate(el, {
            opacity: 0,
            transform: 'scale(0.95)',
        }, {
            duration: 1,
        }).finished.then(done);
    }

    onMounted(() => {
        MannaStore.fetchRepository();
        MannaStore.fetchInstall();
    });
</script>

<template>
    <progress id="progress" value="100"></progress>
    <RouterView class="view" v-slot="{ Component }">
        <Transition :css="false" @enter="onEnter" @leave="onLeave">
            <component :is="Component"></component>
        </Transition>
    </RouterView>
</template>

<style lang="less">
    #app, .view {
        @apply fixed inset-0;
    }
</style>
