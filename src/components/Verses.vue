<template lang="html">
    <div class="verses" :class="{ 'line-by-line': LineByLine, 'verse-numbers': VerseNumbers, }" :style="TextStyle">
        <Verse :no-number="!VerseNumbers" :key="t.Verse" :struct="t" v-for="t in text"></Verse>
    </div>
</template>

<script>
    import Helpers from '../store/helpers';
    const {Module} = Helpers;

    import Verse from './Verse.vue';

    export default {
        mixins: [
            Module,
        ],
        components: {
            Verse,
        },
        props: {
            text: {
                type: Array,
                default() {
                    return [];
                },
            },
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
                    display: flex;
                    margin-left: -3rem;
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

            .verse {
                .verse-number {
                    color: @red;
                }
            }
        }
    }
</style>
