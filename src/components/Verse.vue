<template lang="html">
    <div class="verse">
        <span class="verse-number" v-if="!noNumber">{{Verse}}.</span>
        <p class="verse-text" v-html="Text"></p>
    </div>
</template>

<script>
    export default {
        props: {
            noNumber: {
                type: Boolean,
                default: false,
            },
            struct: {
                type: Object,
                default() {
                    return {};
                },
            },
        },
        computed: {
            Book: {
                cache: false,
                get() {
                    var {struct} = this;
                    var {Book} = struct;
                    return Book;
                },
            },
            Chapter: {
                cache: false,
                get() {
                    var {struct} = this;
                    var {Chapter} = struct;
                    return Chapter;
                },
            },
            Text: {
                cache: false,
                get() {
                    var {struct} = this;
                    var {Text} = struct;
                    var div = document.createElement('div');
                    div.innerHTML = Text;
                    return div.innerText + '&nbsp;';
                },
            },
            Verse: {
                cache: false,
                get() {
                    var {struct} = this;
                    var {Verse} = struct;
                    return Verse;
                },
            },
        },
    }
</script>

<style lang="less">
    #app {
        .verse {
            .verse-number {
                display: inline-block;
                margin-right: 0.5rem;
                min-width: 2.5rem;
                text-align: right;
            }

            .verse-text {
                display: inline;
            }
        }
    }
</style>
