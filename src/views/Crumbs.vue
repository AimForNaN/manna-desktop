<template lang="html">
    <article class="crumbs">
        <nav class="navbar has-shadow">
            <b-navbar-item class="navbar-brand">The Crumbs</b-navbar-item>
            <b-select class="languages" v-model="Language">
                <option value="">All</option>
                <option :value="klng" v-for="(lng, klng) in Languages">{{lng.NativeName}} ({{lng.Name}})</option>
            </b-select>
            <b-button icon-right="sync" @click="reloadCache" />
        </nav>
        <section class="modules" ref="viewport">
            <ModuleCard :key="mod.Name" :module="mod" v-for="mod in ModuleListing" @open="loadModule"></ModuleCard>
        </section>
    </article>
</template>

<script>
    import ScrollBooster from 'scrollbooster';

    import {Languages, Modules, Nav} from '../store/helpers';

    import ModuleCard from '../components/ModuleCard.vue';

    export default {
        mixins: [
            Languages,
            Modules,
            Nav,
        ],
        components: {
            ModuleCard,
        },
        data() {
            return {
                Language: '',
                ScrollBooster: null,
            };
        },
        computed: {
            ModuleListing: {
                cache: false,
                get() {
                    return this.GenericTexts.filter((mod) => {
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
        mounted() {
            var el = this.$refs.viewport;
            this.ScrollBooster = new ScrollBooster({
                viewport: el,
                content: el,
                scrollMode: 'native',
                direction: 'vertical',
                // textSelection: true,
            });
        },
        destroyed() {
            this.ScrollBooster.destroy();
        },
    }
</script>

<style lang="less">
    @import "../styles/base.less";

    #app {
        .crumbs {
            display: flex;
            flex-direction: column;

            nav {
                border-bottom: 1px solid @blue;
                color: @blue;
            }

            .modules {
                display: flex;
                flex-wrap: wrap;
                overflow-y: auto;
                padding: 0.5rem;

                .module.card {
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
