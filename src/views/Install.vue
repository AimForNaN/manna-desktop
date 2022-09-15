<script setup>
    import { computed, reactive, unref } from 'vue';
    import { Motion } from 'motion/vue';
    import { useMannaStore } from './../stores/manna.js';

    const MannaStore = useMannaStore();
    const state = reactive({
        Language: 'en',
        Queue: new Set(),
        Source: null,
        Type: 'Biblical Texts',
    });

    const remoteSource = computed(() => {
        return MannaStore.RemoteSources.find((src) => {
            return src.Source == state.Source;
        }) || {
            Modules: [],
        };
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
    const modules = computed(() => {
        var src = unref(remoteSource);
        var {Modules} = src;
        return Modules.filter((mod) => {
            return state.Language == mod.Language;
        }).filter((mod) => {
            return state.Type == mod.Type;
        });
    });
    const types = computed(() => {
        var src = unref(remoteSource);
        var {Modules} = src;
        return Array.from(Modules.reduce((ret, mod) => {
            ret.add(mod.Type);
            return ret;
        }, new Set())).sort((a,b) => {
            a = String(a);
            b = String(b);
            return a.localeCompare(b);
        });
    });


    function installModule(Name, Source) {
        state.Queue.add(Name);
        MannaStore.installModule({
            Name,
            Source,
        }).then(() => {
            state.Queue.delete(Name);
        });
    }
    function refreshSource(src) {
        MannaStore.refreshSource(src);
    }
</script>

<template>
    <article id="install">
        <header>
            <button :class="{ disabled: !state.Source }" @click="refreshSource(state.Source)">Refresh Source</button>
            <span class="flex-1"></span>
            <select v-model="state.Type" v-show="types.length">
                <option :value="type" v-for="type in types">{{type}}</option>
            </select>
            <select v-model="state.Language" v-show="languages.length">
                <option :value="lang" v-for="lang in languages">{{lang}}</option>
            </select>
        </header>
        <article>
            <ul class="sources">
                <Motion :animate="{ opacity: 1, transform: 'scale(1)' }" :initial="{ opacity: 0, transform: 'scale(1.15)' }" :transition="{ delay: 0.65 + (idx * 0.05), duration: 2 }" v-for="(src,idx) in MannaStore.RemoteSources">
                    <li class="source" :class="{ active: state.Source == src.Source}" @click="state.Source = src.Source">{{src.Source}}</li>
                </Motion>
            </ul>
            <section v-if="state.Source">
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
            @apply divide-y;

            .module {
                @apply cursor-default flex e('py-1.5') space-x-2;

                .desc {
                    @apply text-slate-400 truncate;
                }

                .name {
                    @apply font-medium;
                }
            }
        }

        .sources {
            @apply flex-shrink-0 w-56;

            .source {
                @apply border-l-4 border-transparent cursor-pointer duration-300 pl-3 e('py-1.5') transition hover:border-slate-200;

                &.active {
                    @apply border-slate-700 font-bold;
                }
            }
        }
    }
</style>
