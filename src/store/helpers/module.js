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
        Description: {
            cache: false,
            get() {
                var {module} = this;
                var {Description} = module;
                return Description;
            },
        },
        Direction: {
            cache: false,
            get() {
                var {module} = this;
                var {R2L} = module;
                return R2L ? 'rtl' : 'ltr';
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
        Headings: {
            cache: false,
            get() {
                var {Settings} = this.$store.state;
                var {Headings} = Settings;
                return Headings;
            },
            set(v) {
                this.$store.commit('SetHeadings', v);
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
        ModuleBook: {
            cache: false,
            get() {
                return null;
            },
        },
        ModuleChapter: {
            cache: false,
            get() {
                return null;
            },
        },
        ModuleStructure: {
            cache: false,
            get() {
                return [];
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
        Settings: {
            cache: false,
            get() {
                var {Settings} = this.$store.state;
                return Settings;
            },
        },
        ShowNotes: {
            cache: false,
            get() {
                var {Bible} = this.$store.state;
                var {Notes} = Bible;
                return Notes;
            },
            set(v) {
                this.$store.commit('SetShowNotes', v);
            },
        },
        ShowStrongs: {
            cache: false,
            get() {
                var {Bible} = this.$store.state;
                var {Strongs} = Bible;
                return Strongs;
            },
            set(v) {
                this.$store.commit('SetShowStrongs', v);
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
        WhiteSpace: {
            cache: false,
            get() {
                var {Settings} = this.$store.state;
                var {WhiteSpace} = Settings;
                return WhiteSpace;
            },
            set(v) {
                this.$store.commit('SetWhiteSpace', v);
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
    methods: {
        search() {},
    },
}
