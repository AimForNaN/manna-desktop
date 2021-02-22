<template lang="html">
    <div class="verses" :class="{ 'line-by-line': LineByLine, 'verse-numbers': VerseNumbers, }" :style="TextStyle">
        <Verse :key="t.Verse" :struct="t" v-for="t in Text" v-model="VerseData.Value"></Verse>
    </div>
</template>

<script>
    import Helpers from '../store/helpers';
    import Verse from './Verse.vue';

    export default {
        components: {
            Verse,
        },
        props: {
            value: {
                type: Object,
                default() {
                    return {};
                },
            },
        },
        watch: {
            text() {
                this.$el.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
        },
        computed: {
            Direction: {
                cache: false,
                get() {
                    var {value} = this;
                    var {Direction} = value;
                    return Direction;
                },
            },
            Font: {
                cache: false,
                get() {
                    var {value} = this;
                    var {Font} = value;
                    return Font;
                },
            },
            Headings: {
                cache: false,
                get() {
                    var {value} = this;
                    var {Headings} = value;
                    return Headings;
                },
            },
            LineByLine: {
                cache: false,
                get() {
                    var {value} = this;
                    var {LineByLine} = value;
                    return LineByLine;
                },
            },
            ShowNotes: {
                cache: false,
                get() {
                    var {value} = this;
                    var {ShowNotes} = value;
                    return ShowNotes;
                },
            },
            ShowStrongs: {
                cache: false,
                get() {
                    var {value} = this;
                    var {ShowStrongs} = value;
                    return ShowStrongs;
                },
            },
            TextStyle: {
                cache:false,
                get() {
                    var {
                        Font,
                        FontSize,
                        LetterSpacing,
                        LineHeight,
                        VerseNumbers,
                        WordSpacing,
                    } = this;
                    return {
                        'font-family': Font,
                        'font-size': FontSize + 'rem !important',
                        'letter-spacing': LetterSpacing + 'px',
                        'line-height': LineHeight + 'rem',
                        'word-spacing': WordSpacing + 'px',
                    };
                }
            },
            VerseNumbers: {
                cache: false,
                get() {
                    var {value} = this;
                    var {VerseNumbers} = value;
                    return VerseNumbers;
                },
            },
            WhiteSpace: {
                cache: false,
                get() {
                    var {value} = this;
                    var {WhiteSpace} = value;
                    return WhiteSpace;
                },
            },
            Text: {
                cache: false,
                get() {
                    var {value} = this;
                    var {Text} = value;
                    return Text;
                },
            },
            VerseData: {
                cache: false,
                get() {
                    var {value} = this;
                    var VerseData = {
                        Value: value,
                    };
                    return VerseData;
                },
            },
        },
    }
</script>

<style lang="less">
    @import "../styles/base.less";

    #app {
        .verses {
            display: block;
            overflow-y: auto;

            &.line-by-line {
                .verse {
                    align-items: baseline;
                    display: flex;
                    margin-left: -3rem;

                    .new-line, .paragraph {
                        display: none;
                    }
                }
            }

            &:not(.line-by-line) {
                .verse {
                    display: inline;

                    .verse-number {
                        margin-right: 0.25rem;
                        min-width: auto;
                    }
                }
            }

            &.verse-numbers {
                margin: inherit;
            }

            &:not(.verse-numbers) {
                margin: 0;

                .verse {
                    margin-left: 0;
                }
            }

            .verse-wrapper {
                &:first-child {
                    .verse-heading {
                        padding: 0 !important;
                    }
                }
            }

            .verse {
                .verse-number {
                    color: @red;
                }
            }
        }
    }
</style>
