<script setup>
    import { computed } from 'vue';
    import { useToggle } from '@vueuse/core';
    import Icon from './Icon.vue';

    const props = defineProps({
        item: {
            type: Object,
            required: true,
        },
    });
    const $emit = defineEmits(['click']);
    const [toggled, toggle] = useToggle();

    const item = computed(() => {
        return props.item;
    });

    function onClick(key) {
        $emit('click', key);
    }
</script>

<template>
    <li class="structure-list-item">
        <div class="structure-list-item-label" @click="toggle()">
            <span class="flex-1" :class="{ 'font-bold': toggled }">{{item.Name}}</span>
            <Icon icon="chevron-down" v-if="!toggled"></Icon>
            <Icon icon="chevron-up" v-else></Icon>
        </div>
        <ul class="chapters" v-if="item.Children.length" v-show="toggled">
            <li class="chapter" v-for="child in item.Children" @click="onClick(child.Key)">{{child.Name}}</li>
        </ul>
    </li>
</template>

<style lang="less">
    .structure-list-item {
        @apply px-4 py-3 space-y-3;

        .structure-list-item-label {
            @apply cursor-pointer flex;
        }

        .chapters {
            @apply gap-2 grid grid-cols-5;

            .chapter {
                @apply cursor-pointer flex items-center justify-center h-10 rounded hover:ring-1;
            }
        }
    }
</style>
