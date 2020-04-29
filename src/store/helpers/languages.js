import ISO6391 from 'iso-639-1';

export default {
    computed: {
        Languages() {
            var {ModulesArray} = this;
            return ModulesArray.reduce((ret, mod) => {
                var {Language} = mod;
                if (Language) {
                    ret[Language] = {
                        Name: ISO6391.getName(Language),
                        NativeName: ISO6391.getNativeName(Language)
                    };
                }
                return ret;
            }, {});
        },
    },
};
