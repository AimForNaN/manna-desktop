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
            <select v-model="state.Source" v-show="MannaStore.RemoteSources.length">
                <option :value="src.Source" v-for="src in MannaStore.RemoteSources">{{src.Source}}</option>
            </select>
            <button :class="{ disabled: !state.Source }" @click="refreshSource(state.Source)">Refresh Source</button>
            <span class="flex-1"></span>
            <select v-model="state.Type" v-show="types.length">
                <option :value="type" v-for="type in types">{{type}}</option>
            </select>
            <select v-model="state.Language" v-show="languages.length">
                <option :value="lang" v-for="lang in languages">{{lang}}</option>
            </select>
        </header>
        <article v-if="state.Source">
            <ul class="modules">
                <li class="module" v-for="mod in modules">
                    <span class="name">{{mod.Module}}</span>
                    <span class="desc">{{mod.Description}}</span>
                    <div class="module-actions">
                        <i class="mdi mdi-download"></i>
                    </div>
                </li>
            </ul>
        </article>
    </article>
</template>

<style lang="less">
    #install {
        @apply flex flex-col space-y-4;

        > article {
            @apply flex flex-col;
        }

        > header {
            @apply flex justify-end space-x-2;
        }

        .modules {
            @apply divide-y divide-slate-200;

            .module {
                @apply cursor-default flex e('py-1.5') items-center space-x-2;

                .module-actions {
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
            }
        }
    }
</style>
