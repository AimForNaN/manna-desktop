export default {
    beforeRouteUpdate(to, from, next) {
        var {name, params} = to;
        var {key, mod} = params;
        switch (name) {
            case 'Bread': {
                this.BiblicalTextModule = mod;
                this.fetchModule({
                    Names: mod,
                    Key: key,
                }).then(() => {
                    console.log(to);
                    next();
                });
                break;
            }
            case 'Crumb': {
                // this.BiblicalTextModule = mod;
                this.fetchModule({
                    Names: mod,
                    Key: key,
                }).then(() => {
                    console.log(to);
                    next();
                });
                break;
            }
            default: {
                console.log(name);
                next();
            }
        }
    },
}
