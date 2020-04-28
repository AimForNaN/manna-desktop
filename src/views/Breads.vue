<template lang="html">
    <article class="breads">
        <nav class="navbar has-shadow">
            <b-navbar-item class="navbar-brand">The Bread</b-navbar-item>
            <b-select class="languages" v-model="Language">
                <option value="">All</option>
                <option :value="klng" v-for="(lng, klng) in Languages">{{lng.NativeName}} ({{lng.Name}})</option>
            </b-select>
            <b-button icon-right="sync" @click="reloadCache" />
        </nav>
        <section class="modules">
            <ModuleCard :key="mod.Name" :module="mod" v-for="mod in ModuleListing" @click="loadModule"></ModuleCard>
        </section>
    </article>
</template>

<script>
    import Helpers from '../store/helpers';
    const {Languages, Modules} = Helpers;

    import ModuleCard from '../components/ModuleCard.vue';

    export default {
        mixins: [
            Languages,
            Modules,
        ],
        components: {
            ModuleCard,
        },
        data() {
            return {
                Language: '',
            };
        },
        computed: {
            ModuleListing: {
                cache: false,
                get() {
                    return this.Bibles.filter((mod) => {
                        var {Language} = this;
                        if (Language) {
                            if (mod.Language == Language) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                        return true;
                    });
                },
            },
        },
    }
</script>

<style lang="less">
    @import "../styles/base.less";

    #app {
        .breads {
            display: flex;
            flex-direction: column;

            nav {
                border-bottom: 1px solid @blue;
                color: @blue;

                > * {
                    margin-right: 0.5rem;
                }
            }

            .modules {
                display: flex;
                flex-wrap: wrap;
                overflow-y: auto;
                padding: 0.5rem;

                .module.card {
                    cursor: pointer;
                    margin: 0.5rem;
                    transition: all 0.25s;

                    &:hover {
                        // transform: scale(1.015);
                    }
                }
            }
        }
    }
</style>
