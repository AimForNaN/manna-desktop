<template lang="html">
    <b-dropdown aria-role="menu" class="bible-chapter-selector" position="is-bottom-left" ref="self" trap-focus>
        <b-button class="navbar-item trigger" slot="trigger" slot-scope="{ active }">
            <span>{{book}} {{chapter}}</span>
            <b-icon icon="menu-down"></b-icon>
        </b-button>
        <b-dropdown-item aria-role="menu-item" class="structure" custom :focusable="false">
            <b-field label="Book">
                <b-select class="books" expanded @input="bookKey = $event" v-model="bookKey">
                    <option v-for="b in Books">{{b}}</option>
                </b-select>
            </b-field>
            <b-field label="Chapters">
                <div class="chapters">
                    <b-button class="chapter" :active="bookKey == book && ch == chapter" :key="bookKey + ch" v-for="ch in lodash.range(1, Chapters + 1)" @click="onSelection(bookKey, ch)">{{ch}}</b-button>
                </div>
            </b-field>
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
    import _ from 'lodash';

    export default {
        data() {
            return {
                bookKey: '',
                lodash: _,
            };
        },
        props: {
            book: {
                type: String,
                default: 'Genesis',
            },
            chapter: {
                type: [Number, String],
                default: 1,
            },
            struct: {
                type: Array,
                default() {
                    return [];
                },
            },
        },
        watch: {
            book: {
                immediate: true,
                handler(v) {
                    this.bookKey = String(v);
                },
            },
        },
        computed: {
            Books: {
                cache: false,
                get() {
                    var {struct} = this;
                    return struct.map(([key, value]) => {
                        return key;
                    });
                },
            },
            Chapters: {
                cache: false,
                get() {
                    var {bookKey, struct} = this;
                    bookKey = struct.find(([b,c]) => {
                        return b == bookKey;
                    });
                    if (bookKey) {
                        let [, struct] = bookKey;
                        return struct.Chapters;
                    }
                    return 0;
                },
            },
        },
        methods: {
            onSelection(Book, Chapter) {
                this.$refs.self.toggle();
                this.$emit('selection', {
                    Book,
                    Chapter,
                });
            },
        },
    }
</script>

<style lang="less">
    @import "../styles/base.less";

    #app {
        .bible-chapter-selector {
            display: flex;
            flex-direction: column;

            .books {
                margin-bottom: 1rem;
            }

            .chapters {
                border: 1px solid @grey100;
                border-radius: 3px;
                display: grid;
                flex: 1;
                grid-template-columns: auto auto auto auto auto;
                max-height: 48vh;
                overflow: auto;
                padding: 0.5rem;

                .chapter {
                    margin: 0.5rem;
                }
            }

            .dropdown-content {
                box-shadow: 0 0 1rem @grey100;
            }

            .trigger {
                align-items: center;
                display: flex;
                padding: 0.25rem 0.5rem;
            }
        }
    }
</style>
