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
        Description: {
            cache: false,
            get() {
                var {module} = this;
                var {Description} = module;
                return Description;
            },
        },
        Key: {
            cache: false,
            get() {
                var {module} = this;
                var {Key} = module;
                return Key;
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
    },
}
