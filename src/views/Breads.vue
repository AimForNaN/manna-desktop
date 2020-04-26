<template lang="html">
    <article class="breads">
        <nav class="navbar has-shadow">
            <div class="navbar-brand">
                <b-navbar-item class="brand">The Bread</b-navbar-item>
                <div class="navbar-burger">
                    <div class="buttons">
                        <b-button icon-right="sync" @click="reloadCache" />
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
        .breads {
            display: flex;
            flex-direction: column;

            nav {
                border-bottom: 1px solid @blue;
                color: @blue;

                .navbar-brand {
                    flex: 1;

                    .brand {
                        pointer-events: none;
                    }
                }

                .navbar-burger {
                    align-items: center;
                    display: flex;
                    justify-content: center;
                    margin-left: auto;

                    &:hover {
                        background-color: transparent
                    }

                    .buttons {
                        align-items: center;
                        display: flex;
                        justify-content: center;
                        margin: 0;

                        .button {
                            align-items: center;
                            display: flex;
                            height: auto;
                            justify-content: center;
                            line-height: normal;
                            margin: 0;
                            padding: 0.5rem;

                            .icon {
                                align-items: center;
                                background-color: transparent;
                                display: flex;
                                height: auto;
                                justify-content: center;
                                margin: 0;
                                position: relative;
                                top: unset;
                                width: auto;
                            }
                        }
                    }
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
