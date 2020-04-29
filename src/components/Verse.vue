<template lang="html">
    <div class="verse" @contextmenu.prevent="$refs.menu.open">
        <span class="verse-number" v-if="!noNumber">{{Verse}}.</span>
        <vue-context ref="menu">
            <li v-for="action in Actions">
                <a @click="action.Action">
                    <b-icon :icon="action.Icon" />
                    {{action.Label}}
                </a>
            </li>
        </vue-context>
        <p class="verse-text" :dir="direction" v-html="Text"></p>
    </div>
</template>

<script>
    import {VueContext} from 'vue-context';

    export default {
        components: {
            VueContext,
        },
        props: {
            direction: {
                type: String,
                default: 'ltr',
            },
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
            Actions: {
                cache: false,
                get() {
                    return [
                        {
                            Action: this.onCopy,
                            Label: 'Copy',
                            Icon: 'clipboard-text',
                        },
                        {
                            Action: this.onBookmark,
                            Label: 'Bookmark',
                            Icon: 'bookmark-plus',
                        },
                        {
                            Action: this.onHighlight,
                            Label: 'Highlight',
                            Icon: 'marker',
                        },
                    ];
                },
            },
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
        methods: {
            onCopy() {
            },
            onBookmark() {
            },
            onHighlight() {
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
