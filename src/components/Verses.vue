<template lang="html">
    <div class="verses" :class="{ 'line-by-line': !noLineByLine, 'verse-numbers': !noVerseNumbers, }" :style="TextStyle">
        <Verse :direction="direction" :no-headings="noHeadings" :no-notes="noNotes" :no-verse-numbers="noVerseNumbers" :no-strongs="noStrongs" :no-white-space="noWhiteSpace" :key="t.Verse" :struct="t" v-for="t in text"></Verse>
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
            direction: {
                type: String,
                default: 'ltr',
            },
            noHeadings: {
                type: Boolean,
                default: false,
            },
            noLineByLine: {
                type: Boolean,
                default: false,
            },
            noNotes: {
                type: Boolean,
                default: false,
            },
            noStrongs: {
                type: Boolean,
                default: false,
            },
            noVerseNumbers: {
                type: Boolean,
                default: false,
            },
            noWhiteSpace: {
                type: Boolean,
                default: false,
            },
            text: {
                type: Array,
                default() {
                    return [];
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
