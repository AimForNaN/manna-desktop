<template lang="html">
    <article class="bible">
        <nav class="navbar is-fixed-top has-shadow">
            <div class="navbar-brand">
                <b-navbar-item>{{Description}}: {{Key}}</b-navbar-item>
            </div>
        </nav>
        <section class="text">
            <ol class="verses">
                <li class="verse" v-for="t in Text" v-html="t.Text"></li>
            </ol>
            <b-menu class="structure">
                <b-menu-list>
                    <b-menu-item :active="name == BiblicalBook" :label="name" v-for="[name, struct] in BiblicalStructure"></b-menu-item>
                </b-menu-list>
            </b-menu>
        </section>
    </article>
</template>

<script>
    import Helpers from '../store/helpers';
    const {Module,Modules} = Helpers;

    export default {
        mixins: [
            Module,
            Modules,
        ],
        watch: {
            Key: {
                immediate: true,
                handler(v) {
                    if (v) {
                        var [book, chapter] = String(v).split(/[\s\.\:]/);
                        this.BiblicalBook = book;
                        this.BiblicalChapter = chapter;
                    }
                },
            },
            module: {
                immediate: true,
                handler(v) {
                    console.log(v);
                },
            },
        },
        computed: {
            module: {
                cache: false,
                get() {
                    var {
                        Modules,
                        Params,
                    } = this;
                    var {mod} = Params;
                    return Modules.get(mod);
                },
            },
            Params: {
                cache: false,
                get() {
                    var {$route} = this;
                    var {params} = $route;
                    return params;
                },
            },
        },
    }
</script>

<style lang="less">
    @import "../styles/base.less";

    #app {
        .bible {
            display: flex;
            flex-direction: column;
            padding-top: 3.25rem;

            nav {
                border-bottom: 1px solid @hot-pink;
                color: @blue;
                margin-left: calc(3rem + 4px);
            }

            .module {
                display: flex;
                padding: 0.5rem;
            }

            .text {
                display: flex;
                flex-direction: row;
                flex: 1;
                font-family: Amiri;
                font-size: 14pt;
                overflow: hidden;

                .structure {
                    border-left: 1px solid @grey;
                    min-height: 0;
                    overflow: auto;

                    a {
                        padding: 0.5rem 1rem;

                        &.is-active {
                            background-color: @grey400;
                        }
                    }
                }

                .verses {
                    flex: 1;
                    min-height: 0;
                    padding: 3rem 5rem;
                }
            }
        }
    }
</style>
