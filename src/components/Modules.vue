<script setup>
    import { Motion } from 'motion/vue';

    const props = defineProps({
        errors: {
            type: Array,
            default() {
                return [];
            },
        },
        items: Array,
        loading: {
            type: Array,
            default() {
                return [];
            },
        },
        noActions: Boolean,
    });
    const $emit = defineEmits(['click', 'install']);

    function isInstalled(mod) {
        return mod.Status == 'installed';
    }
    function isNew(mod) {
        return mod.Status == 'new';
    }
    function onClick(mod) {
        $emit('click', mod);
    }
    function onInstall(mod) {
        $emit('install', mod);
    }
</script>

<template>
    <ul class="modules">
        <li class="module" @click="onClick(mod.Module)" v-for="mod in props.items">
            <span class="name">{{mod.Module}}</span>
            <span class="desc">{{mod.Description}}</span>
            <div class="module-actions" v-if="!props.noActions">
                <i class="mdi mdi-alert-circle-outline" v-show="props.errors.includes(mod.Module)"></i>
                <i class="mdi mdi-loading mdi-spin" v-show="props.loading.includes(mod.Module)"></i>
                <i class="mdi mdi-download" :class="{ disabled: props.loading.includes(mod.Module) }" @click="onInstall(mod.Module)" v-show="!props.loading.includes(mod.Module)" v-if="isNew(mod)"></i>
                <i class="mdi mdi-check" v-else></i>
                <i class="mdi mdi-delete" v-if="isInstalled(mod)"></i>
            </div>
        </li>
    </ul>
</template>

<style lang="less">
    .modules {
        @apply divide-y divide-slate-200;

        .module {
            @apply cursor-default duration-500 flex px-2 e('py-1.5') items-center space-x-2 transition hover:bg-slate-50;

            .mdi-delete {
                @apply hidden;
            }

            .module-actions {
                @apply flex items-center space-x-1;

                > * {
                    @apply cursor-pointer;
                }
            }

            .desc {
                @apply flex-1 font-thin text-slate-400 truncate;
            }

            .name {
                @apply font-medium;
            }

            &:hover {
                .mdi-check {
                    @apply hidden;
                }

                .mdi-delete {
                    @apply block;
                }
            }
        }
    }
</style>
