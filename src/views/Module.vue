<template lang="html">
    <article class="module">
        <nav class="navbar has-shadow">
            <b-navbar-item class="navbar-brand">{{Description}}</b-navbar-item>
            <ChapterSelector class="navbar-item" :book="ModuleBook" :chapter="ModuleChapter" :struct="ModuleStructure" @selection="setKey"></ChapterSelector>
            <b-button icon-right="magnify" @click="onSearch" />
        </nav>
        <section class="book">
            <div class="text">
                <div class="module-actions field has-addons">
                    <div class="control">
                        <b-icon icon="chevron-left" @click.native="prev"></b-icon>
                    </div>
                    <div class="control">
                        <b-icon icon="chevron-right" @click.native="next"></b-icon>
                    </div>
                </div>
                <div class="title">{{Title}}</div>
                <div class="heading" v-if="SubTitle">{{SubTitle}}</div>
                <Verses :direction="Direction" :no-headings="!Headings" :no-line-by-line="!LineByLine" :no-notes="!ShowNotes" :no-strongs="!ShowStrongs" :no-verse-numbers="!VerseNumbers" :no-white-space="!WhiteSpace" :text="Text" ref="viewport"></Verses>
            </div>
            <b-menu :accordion="false" class="side-panel">
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
                            <b-switch v-model="Headings">Headings</b-switch>
                        </b-field>
                        <b-field>
                            <b-switch v-model="LineByLine">Line by Line</b-switch>
                        </b-field>
                        <b-field>
                            <b-switch v-model="ShowNotes">Notes</b-switch>
                        </b-field>
                        <b-field>
                            <b-switch v-model="ShowStrongs">Strongs Numbers</b-switch>
                        </b-field>
                        <b-field>
                            <b-switch v-model="VerseNumbers">Verse Numbers</b-switch>
                        </b-field>
                        <b-field>
                            <b-switch :disabled="LineByLine" v-model="WhiteSpace">WhiteSpace</b-switch>
                        </b-field>
                    </b-menu-item>
                </b-menu-list>
            </b-menu>
        </section>
    </article>
</template>

<script>
    import ScrollBooster from 'scrollbooster';

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
                ScrollBooster: null,
            };
        },
        watch: {
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
            SubTitle: {
                cache: false,
                get() {
                    return '';
                },
            },
            Title: {
                cache: false,
                get() {
                    return '';
                },
            },
        },
        methods: {
            onSearch() {},
            prev() {},
            next() {},
            setKey() {},
        },
        mounted() {
            var el = this.$refs.viewport.$el;
            this.ScrollBooster = new ScrollBooster({
                viewport: el,
                content: el,
                scrollMode: 'native',
                direction: 'vertical',
                // textSelection: true,
            });
        },
        beforeDestroy() {
            this.ScrollBooster.destroy();
        },
    }
</script>

<style lang="less">
    @import "../styles/base.less";

    #app {
        .module {
            display: flex;
            flex-direction: column;

            nav {
                align-items: center;
                border-bottom: 1px solid @blue;
                color: @blue;
                display: flex;

                .navbar-brand {
                    align-items: center;
                    display: flex;
                    flex: 1;

                    .brand {
                        flex: 1;
                        pointer-events: none;
                    }
                }
            }

            .module-actions {
                position: absolute;
                right: 0;

                .control {
                    &:last-child {
                        border-left: 1px solid @grey;
                    }
                }

                .icon {
                    cursor: pointer;
                    padding: 2.5rem 2rem;

                    &:hover {
                        background-color: @greyA200;
                    }
                }
            }

            .book {
                display: flex;
                flex: 1;
                flex-direction: row;
                overflow: hidden;

                .text {
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    font-family: Amiri;
                    position: relative;

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

                        .verse {
                            .verse-text:hover, .v-context[aria-hidden="false"] + .verse-text {
                                background-color: @greyA;
                            }
                        }
                    }
                }

                .side-panel {
                    border-left: 1px solid @pale-blueA200;
                    flex: 1;
                    max-width: 350px;
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
