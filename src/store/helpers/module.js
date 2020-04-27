import {firstBy} from 'thenby';

export default {
    computed: {
        About: {
            cache: false,
            get() {
                var {module} = this;
                var {About} = module;
                return About;
            },
        },
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
        Description: {
            cache: false,
            get() {
                var {module} = this;
                var {Description} = module;
                return Description;
            },
        },
        Font: {
            cache: false,
            get() {
                var {Settings} = this.$store.state;
                var {Font} = Settings;
                return Font;
            },
            set(v) {
                this.$store.commit('SetFont', v);
            },
        },
        Fonts: {
            cache: false,
            get() {
                var {Fonts} = this.$store.state;
                return Fonts;
            },
        },
        FontSize: {
            cache: false,
            get() {
                var {Settings} = this.$store.state;
                var {FontSize} = Settings;
                return FontSize;
            },
            set(v) {
                this.$store.commit('SetFontSize', v);
            },
        },
        Key: {
            cache: false,
            get() {
                var {module} = this;
                var {Key} = module;
                return String(Key).replace(/(?:\+|\%20)+/gm, ' ');
            },
        },
        LetterSpacing: {
            cache: false,
            get() {
                var {Settings} = this.$store.state;
                var {LetterSpacing} = Settings;
                return LetterSpacing;
            },
            set(v) {
                this.$store.commit('SetLetterSpacing', v);
            },
        },
        LineByLine: {
            cache: false,
            get() {
                var {Bible} = this.$store.state;
                var {LineByLine} = Bible;
                return LineByLine;
            },
            set(v) {
                this.$store.commit('SetLineByLine', v);
            },
        },
        LineHeight: {
            cache: false,
            get() {
                var {Settings} = this.$store.state;
                var {LineHeight} = Settings;
                return LineHeight;
            },
            set(v) {
                this.$store.commit('SetLineHeight', v);
            },
        },
        Name: {
            cache: false,
            get() {
                var {module} = this;
                var {Name} = module;
                return Name;
            },
        },
        Structure: {
            cache: false,
            get() {
                var {module} = this;
                var {Structure} = module;
                return Structure;
            },
        },
        Text: {
            cache: false,
            get() {
                var {module} = this;
                var {Text} = module;
                return Text;
            },
        },
        WordSpacing: {
            cache: false,
            get() {
                var {Settings} = this.$store.state;
                var {WordSpacing} = Settings;
                return WordSpacing;
            },
            set(v) {
                this.$store.commit('SetWordSpacing', v);
            },
        },
        VerseNumbers: {
            cache: false,
            get() {
                var {Bible} = this.$store.state;
                var {VerseNumbers} = Bible;
                return VerseNumbers;
            },
            set(v) {
                this.$store.commit('SetVerseNumbers', v);
            },
        },
    },
}
