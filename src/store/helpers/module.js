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
