<template lang="html">
    <article class="bread">
        <nav class="navbar is-fixed-top has-shadow">
            <div class="navbar-brand">
                <b-navbar-item>The Bread</b-navbar-item>
                <div class="navbar-burger">
                    <div class="buttons">
                        <button class="button" @click="fetchModules">R</button>
                    </div>
                </div>
            </div>
        </nav>
        <section class="modules">
            <ModuleCard :key="mod.Name" :module="mod" v-for="mod in Bibles" @click="loadModule"></ModuleCard>
        </section>
    </article>
</template>

<script>
    import Helpers from '../store/helpers';
    const {Modules} = Helpers;

    import ModuleCard from '../components/ModuleCard.vue';

    export default {
        mixins: [
            Modules,
        ],
        components: {
            ModuleCard,
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

                .navbar-burger {
                    align-items: center;
                    display: flex;
                    justify-content: center;

                    &:hover {
                        background-color: transparent
                    }
                }
            }

            .modules {
                display: flex;
                flex-wrap: wrap;
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
