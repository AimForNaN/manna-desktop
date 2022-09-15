<script setup>
    import { computed, ref, unref } from 'vue';
    import { Motion } from 'motion/vue';
    import { useMannaStore } from './../stores/manna.js';

    const MannaStore = useMannaStore();
    const language = ref('en');
    const source = ref(null);

    const remoteSource = computed(() => {
        return MannaStore.RemoteSources.find((src) => {
            return src.Source == source.value;
        }) || {
            Modules: [],
        };
    });
    const modules = computed(() => {
        var src = unref(remoteSource);
        var {Modules} = src;
        var l = unref(language);
        return Modules.filter((mod) => {
            return l == mod.Language;
        });
    });
    const languages = computed(() => {
        var src = unref(remoteSource);
        var {Modules} = src;
        return Array.from(Modules.reduce((ret, mod) => {
            ret.add(mod.Language);
            return ret;
        }, new Set())).sort((a,b) => {
            a = String(a);
            b = String(b);
            return a.localeCompare(b);
        });
    });

    function refreshSource(src) {
        MannaStore.refreshSource(src);
    }
</script>

<template>
    <article id="install">
        <header>
            <select v-model="language">
                <option :value="lang" v-for="lang in languages">{{lang}}</option>
            </select>
            <button :class="{ disabled: !source }" @click="refreshSource(source)">Refresh Source</button>
        </header>
        <article>
            <ul class="sources">
                <Motion :animate="{ opacity: 1, transform: 'scale(1)' }" :initial="{ opacity: 0, transform: 'scale(1.15)' }" :transition="{ delay: 0.65 + (idx * 0.05), duration: 2 }" v-for="(src,idx) in MannaStore.RemoteSources">
                    <li class="source" :class="{ active: source == src.Source}" @click="source = src.Source">{{src.Source}}</li>
                </Motion>
            </ul>
            <section v-if="source">
                <ul class="modules">
                    <li class="module" v-for="mod in modules">
                        <span class="name">{{mod.Module}}</span>
                        <span class="desc">{{mod.Description}}</span>
                    </li>
                </ul>
            </section>
        </article>
    </article>
</template>

<style lang="less">
    #install {
        @apply flex flex-col space-y-4;

        > article {
            @apply flex space-x-14;

            > section {
                @apply flex-1 min-w-0;
            }
        }

        > header {
            @apply flex justify-end space-x-2;
        }

        .modules {
            @apply space-y-3;

            .module {
                @apply cursor-pointer duration-500 flex space-x-2;

                &.active {
                    @apply font-bold;
                }

                .desc {
                    @apply text-gray-400 truncate;
                }

                .name {
                    @apply font-bold;
                }
            }
        }

        .sources {
            @apply flex-shrink-0 space-y-3 w-56;

            .source {
                @apply cursor-pointer duration-500 transition hover:translate-x-2;

                &.active {
                    @apply font-bold hover:translate-x-0;
                }
            }
        }
    }
</style>
