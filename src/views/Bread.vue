<template lang="html">
    <article class="bible">
        <nav class="navbar is-fixed-top has-shadow">
            <div class="navbar-brand">
                <b-navbar-item class="brand">{{Description}}: {{Key}}</b-navbar-item>
            </div>
        </nav>
        <section class="book">
            <div class="text">
                <div class="title">Book of {{BiblicalBook}}</div>
                <ol class="verses">
                    <li class="verse" v-for="t in Text" v-html="t.Text"></li>
                </ol>
            </div>
            <b-menu :accordion="false" class="structure">
                <b-menu-list>
                    <b-menu-item :active="name == BiblicalBook" :expanded="name == BiblicalBook" :key="name" :label="name" v-for="[name, struct] in BiblicalStructure">
                        <b-button :active="name == BiblicalBook && chapter == BiblicalChapter" v-for="chapter in lodash.range(1, struct.Chapters + 1)" @click="loadChapter(name, chapter)">{{chapter}}</b-button>
                    </b-menu-item>
                </b-menu-list>
            </b-menu>
        </section>
    </article>
</template>

<script>
    import _ from 'lodash';

    import Helpers from '../store/helpers';
    const {Module,Modules} = Helpers;

    export default {
        mixins: [
            Module,
            Modules,
        ],
        data() {
            return {
                'lodash': _,
            };
        },
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
        methods: {
            loadChapter(book, chapter) {
                this.BiblicalBook = book;
                this.BiblicalChapter = chapter;
                this.loadModule(this.module);
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

                .brand {
                    pointer-events: none;
                }
            }

            .module {
                display: flex;
                padding: 0.5rem;
            }

            .book {
                display: flex;
                flex-direction: row;
                font-family: Amiri;
                font-size: 14pt;
                overflow: hidden;

                .text {
                    display: flex;
                    flex: 2;
                    flex-direction: column;

                    .title {
                        margin: 0;
                        padding: 1rem 3rem;
                        padding-top: 2rem;
                    }

                    .verses {
                        overflow-y: auto;
                        padding: 3rem 5rem;
                        padding-top: 1rem;
                    }
                }

                .structure {
                    border-left: 1px solid @pale-blueA200;
                    flex: 1;
                    max-width: 295px;
                    overflow: auto;

                    a {
                        padding: 0.5rem 1rem;

                        &:hover {
                            background-color: @pale-blueA300;
                        }

                        &.is-active {
                            background-color: @pale-blueA300;
                            color: #000;
                        }
                    }

                    .menu-list {
                        ul {
                            border: 0;
                            border-bottom: 1px solid @pale-blueA200;
                            display: grid;
                            grid-template-columns: auto auto auto auto;
                            margin: 0;
                            padding: 0.5rem;

                            > * {
                                margin: 0.25rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
