<script setup>
    import { computed, reactive, unref } from 'vue';
    import { Motion } from 'motion/vue';
    import { useMannaStore } from './../stores/manna.js';

    const MannaStore = useMannaStore();
    const state = reactive({
        InstallErrors: new Set(),
        InstallQueue: new Set(),
        Language: 'en',
        Type: 'Biblical Texts',
    });

    const remoteSource = computed(() => {
        return MannaStore.InstallSources.find((src) => {
            return src.Source == MannaStore.InstallSource;
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
    const remoteSources = computed(() => {
        return MannaStore.InstallSources.filter((src) => {
            return src.Type == 'FTP';
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
        state.InstallErrors.delete(Name);
        state.InstallQueue.add(Name);
        MannaStore.installModule({
            Name,
            Source,
        }).then(() => {
            MannaStore.fetchRepository();
            MannaStore.fetchInstall().then(() => {
                state.InstallQueue.delete(Name);
            });
        }).catch(() => {
            state.InstallQueue.delete(Name);
        });
    }
    function isInstalled(mod) {
        return mod.Status == 'installed';
    }
    function isNew(mod) {
        return mod.Status == 'new';
    }
</script>

<template>
    <article id="install">
        <header>
            <div class="remote-sources-wrapper">
                <select class="remote-sources" v-model="MannaStore.InstallSource" v-show="MannaStore.InstallSources.length">
                    <optgroup label="Remote Sources">
                        <option :value="src.Source" v-for="src in remoteSources">{{src.Source}}</option>
                    </optgroup>
                </select>
                <i class="mdi mdi-refresh" :class="{ disabled: !MannaStore.InstallSource }" @click="MannaStore.refreshInstallSource(MannaStore.InstallSource)" title="Refresh Source"></i>
            </div>
            <select v-model="state.Type" v-show="types.length">
                <option :value="type" v-for="type in types">{{type}}</option>
            </select>
            <select v-model="state.Language" v-show="languages.length">
                <option :value="lang" v-for="lang in languages">{{lang}}</option>
            </select>
        </header>
        <article v-if="MannaStore.InstallSource">
            <ul class="modules">
                <li class="module" v-for="mod in modules">
                    <span class="name">{{mod.Module}}</span>
                    <span class="desc">{{mod.Description}}</span>
                    <div class="module-actions">
                        <i class="mdi mdi-alert-circle-outline" v-show="state.InstallErrors.has(mod.Module)"></i>
                        <i class="mdi mdi-loading mdi-spin" v-show="state.InstallQueue.has(mod.Module)"></i>
                        <i class="mdi mdi-download" :class="{ disabled: state.InstallQueue.has(mod.Module) }" @click="installModule(mod.Module, MannaStore.InstallSource)" v-show="!state.InstallQueue.has(mod.Module)" v-if="isNew(mod)"></i>
                        <i class="mdi mdi-check" v-else></i>
                        <i class="mdi mdi-delete" v-if="isInstalled(mod)"></i>
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
            @apply flex flex-col items-center md:flex-row md:flex-wrap md:justify-end lg:space-x-2;

            > * {
                @apply m-1 self-stretch lg:m-0;
            }
        }

        .mdi-alert-circle-outline {
            @apply text-rose-300;
        }

        .mdi-refresh {
            @apply cursor-pointer;
        }

        .modules {
            @apply divide-y divide-slate-200;

            .module {
                @apply cursor-default flex px-2 e('py-1.5') items-center space-x-2 transition hover:bg-slate-50;

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

        .remote-sources-wrapper {
            @apply flex flex-1 items-center space-x-2;

            .remote-sources {
                @apply w-full md:w-auto;
            }
        }
    }
</style>
