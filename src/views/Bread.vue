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
                <div class="heading">Chapter {{BiblicalChapter}}</div>
                <Verses :text="Text"></Verses>
            </div>
            <b-menu :accordion="false" class="structure">
                <b-menu-list>
                    <b-menu-item class="settings" expanded>
                        <template slot="label" slot-scope="props">
                            Settings
                            <b-icon icon="settings" size="is-small"></b-icon>
                        </template>
                        <b-field label="Font">
                            <b-select expanded placeholder="Font" v-model="Font">
                                <option :style="{ 'font-family': font, 'font-size': '2rem', 'line-height': '2rem', }" v-for="font in Fonts">{{font}}</option>
                            </b-select>
                        </b-field>
                        <b-field label="Font Size">
                            <b-numberinput controls-position="compact" step="0.05" type="is-dark" v-model="FontSize"></b-numberinput>
                        </b-field>
                        <b-field label="Letter Spacing">
                            <b-numberinput controls-position="compact" step="0.05" type="is-dark" v-model="LetterSpacing"></b-numberinput>
                        </b-field>
                        <b-field label="Line Height">
                            <b-numberinput controls-position="compact" step="0.05" type="is-dark" v-model="LineHeight"></b-numberinput>
                        </b-field>
                        <b-field label="Word Spacing">
                            <b-numberinput controls-position="compact" step="0.05" type="is-dark" v-model="WordSpacing"></b-numberinput>
                        </b-field>
                        <b-field>
                            <b-switch v-model="LineByLine">Line by Line</b-switch>
                        </b-field>
                        <b-field>
                            <b-switch v-model="VerseNumbers">Verse Numbers</b-switch>
                        </b-field>
                    </b-menu-item>
                    <b-menu-item :active="name == BiblicalBook" :expanded="name == BiblicalBook" :key="name" :label="name" v-for="[name, struct] in BiblicalStructure">
                        <b-button :active="name == BiblicalBook && chapter == BiblicalChapter" :key="name + chapter" v-for="chapter in lodash.range(1, struct.Chapters + 1)" @click="loadChapter(name, chapter)">{{chapter}}</b-button>
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

    import Verses from '../components/Verses.vue';

    export default {
        mixins: [
            Module,
            Modules,
        ],
        components: {
            Verses,
        },
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
                border-bottom: 1px solid @blue;
                color: @blue;
                margin-left: calc(3rem + 4px);

                .brand {
                    pointer-events: none;
                }
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

                    .heading {
                        margin: 0;
                        padding: 0 5rem;
                    }

                    .title {
                        margin: 0;
                        padding: 0 5rem;
                        padding-top: 2rem;
                    }

                    .verses {
                        padding: 3rem 5rem;
                        padding-top: 1rem;
                    }
                }

                .structure {
                    border-left: 1px solid @pale-blueA200;
                    flex: 1;
                    max-width: 295px;
                    overflow: auto;

                    * > a {
                        align-items: center;
                        border-top: 1px solid @grey;
                        display: flex;
                        justify-content: space-between;
                        padding: 0.5rem 1rem;

                        .mdi {
                            color: @pale-blueA100;
                        }

                        &:hover {
                            background-color: @pale-blueA300;
                            color: @black;
                        }

                        &.is-active {
                            background-color: transparent;
                            color: #000;

                            &:hover {
                                background-color: @pale-blueA300;
                                color: @black;
                            }
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

                    .settings {
                        ul {
                            display: flex;
                            flex-direction: column;
                        }
                    }
                }
            }

            .module {
                display: flex;
                padding: 0.5rem;
            }
        }
    }
</style>
