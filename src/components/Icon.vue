<script setup>
    const props = defineProps({
        icon: String,
    });
</script>

<template>
    <i :class="['mdi', 'mdi-' + props.icon, 'icon']"><slot></slot></i>
</template>

<style lang="less">
    .icon {
        @apply inline-flex items-center justify-center;
    }
</style>
