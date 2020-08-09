<script>
    import {firstBy} from 'thenby';

    import ModuleView from './Module.vue';

    import ChapterSelector from '../components/BibleChapterSelector.vue';

    export default {
        extends: ModuleView,
        components: {
            ChapterSelector,
        },
        watch: {
            Key: {
                immediate: true,
                handler(v) {
                    if (v) {
                        var [book, chapter] = String(v).split('.');
                        this.BiblicalBook = book;
                        this.BiblicalChapter = chapter;
                    }
                },
            },
        },
        computed: {
            BiblicalBook: {
                cache: false,
                get() {
                    var {Bible} = this.$store.state;
                    var {Book} = Bible;
                    return Book;
                },
                set(v) {
                    this.$store.commit('SetBiblicalBook', v);
                },
            },
            BiblicalChapter: {
                cache: false,
                get() {
                    var {Bible} = this.$store.state;
                    var {Chapter} = Bible;
                    return Chapter;
                },
                set(v) {
                    this.$store.commit('SetBiblicalChapter', v);
                },
            },
            BiblicalStructure: {
                cache: false,
                get() {
                    var {Structure} = this;
                    Structure = Array.from(Object.entries(Structure)).sort(firstBy(([,a], [,b]) => {
                        return a.Testament - b.Testament;
                    }).thenBy(([,a], [,b]) => {
                        return a.Index - b.Index;
                    }));
                    return Structure;
                },
            },
            ModuleBook: {
                cache: false,
                get() {
                    var {BiblicalBook} = this;
                    return BiblicalBook;
                },
            },
            ModuleChapter: {
                cache: false,
                get() {
                    var {BiblicalChapter} = this;
                    return BiblicalChapter;
                },
            },
            ModuleStructure: {
                cache: false,
                get() {
                    var {BiblicalStructure} = this;
                    return BiblicalStructure;
                },
            },
            SubTitle: {
                cache: false,
                get() {
                    var {BiblicalChapter} = this;
                    return `Chapter ${BiblicalChapter}`;
                },
            },
            Title: {
                cache: false,
                get() {
                    var {BiblicalBook} = this;
                    return `Book of ${BiblicalBook}`;
                },
            },
        },
        methods: {
            onSearch() {
            },
            prev() {
                var {BiblicalBook, BiblicalChapter, BiblicalStructure, Structure} = this;
                var struct = BiblicalStructure.find(([b,s]) => {
                    return b == BiblicalBook;
                });
                struct = struct[1];
                var {Chapters} = struct;
                if (BiblicalChapter > 1) {
                    this.loadChapter({
                        Book: BiblicalBook,
                        Chapter: BiblicalChapter - 1,
                    });
                } else {
                    let keys = BiblicalStructure.map(([k,v]) => {
                        return k;
                    });
                    let idx = keys.indexOf(BiblicalBook);
                    if ((idx - 1) > 0) {
                        BiblicalBook = keys[idx - 1];
                        BiblicalChapter = 1;
                    } else {
                        BiblicalBook = 'Revelation of John';
                        BiblicalChapter = Structure[BiblicalBook].Chapters;
                    }
                    this.loadChapter({
                        Book: BiblicalBook,
                        Chapter: BiblicalChapter,
                    });
                }
            },
            next() {
                var {BiblicalBook, BiblicalChapter, BiblicalStructure} = this;
                var struct = BiblicalStructure.find(([b,s]) => {
                    return b == BiblicalBook;
                });
                struct = struct[1];
                var {Chapters} = struct;
                if (BiblicalChapter < Chapters) {
                    this.loadChapter({
                        Book: BiblicalBook,
                        Chapter: BiblicalChapter + 1,
                    });
                } else {
                    let keys = BiblicalStructure.map(([k,v]) => {
                        return k;
                    });
                    let idx = keys.indexOf(BiblicalBook);
                    if ((idx + 1) < keys.length) {
                        BiblicalBook = keys[idx + 1];
                        BiblicalChapter = 1;
                    } else {
                        BiblicalBook = 'Genesis';
                        BiblicalChapter = 1;
                    }
                    this.loadChapter({
                        Book: BiblicalBook,
                        Chapter: BiblicalChapter,
                    });
                }
            },
            setKey({Book, Chapter}) {
                this.BiblicalBook = Book;
                this.BiblicalChapter = Chapter;
                this.loadModule(this.module);
            },
        },
    }
</script>
