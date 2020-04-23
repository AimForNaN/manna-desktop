<template lang="html">
    <article class="bread">
        <b-navbar :fixed-top="true" :shadow="true">
            <template slot="brand">
                <b-navbar-item>The Bread</b-navbar-item>
            </template>
            <template slot="start">
                <!-- <b-navbar-item>The Bread</b-navbar-item> -->
            </template>
        </b-navbar>
        <section class="modules">
            <ModuleCard :key="mod.Name" :module="mod" v-for="mod in Bibles"></ModuleCard>
        </section>
    </article>
</template>

<script>
    import ModuleCard from '../components/ModuleCard.vue';

    export default {
        components: {
            ModuleCard,
        },
        computed: {
            Bibles: {
                cache: false,
                get() {
                    var {Modules} = this;
                    console.log(Modules);
                    return Modules.reduce((ret, mod) => {
                        if (mod.Type == 'Biblical Texts') {
                            ret.push(mod);
                        }
                        return ret;
                    }, []);
                },
            },
            Modules: {
                cache: false,
                get() {
                    return Array.from(this.$store.state.Modules);
                },
            },
        },
    }
</script>

<style lang="less">
    @import "../styles/base.less";

    #app {
        .bread {
            overflow: auto;
            padding-top: 3.25rem;

            nav {
                border-bottom: 1px solid @hot-pink;
                color: @blue;
                margin-left: calc(3rem + 4px);
            }

            .modules {
                display: flex;
                flex-wrap: wrap;
                padding: 0.5rem;

                .module.card {
                    margin: 0.5rem;
                }
            }
        }
    }
</style>
