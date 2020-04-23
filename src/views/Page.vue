<template lang="html">
    <router-view />
</template>

<script>
    import Helpers from '../store/helpers';
    const {Modules} = Helpers;

    export default {
        mixins: [
            Modules,
        ],
        beforeRouteUpdate(to, from, next) {
            var {name, params} = to;
            var {key, mod} = params;
            console.log(to);
            switch (name) {
                case 'Bread': {
                    this.fetchModule({
                        Names: mod,
                        Key: key,
                    }).then(() => {
                        next();
                    });
                }
                default: next();
            }
        },
    }
</script>
