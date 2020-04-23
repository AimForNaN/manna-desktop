<template lang="html">
    <article class="bible">
        <nav class="navbar is-fixed-top has-shadow">
            <div class="navbar-brand">
                <b-navbar-item>{{Description}}: {{Key}}</b-navbar-item>
            </div>
        </nav>
    </article>
</template>

<script>
    import Helpers from '../store/helpers';
    const {Module,Modules} = Helpers;

    export default {
        mixins: [
            Module,
            Modules,
        ],
        watch: {
            module: {
                immediate: true,
                handler(v) {
                    console.log(v);
                },
            },
        },
        computed: {
            module: {
                cache: false,
                get() {
                    var {
                        Modules,
                        Params,
                    } = this;
                    var {mod} = Params;
                    return Modules.get(mod);
                },
            },
            Params: {
                cache: false,
                get() {
                    var {$route} = this;
                    var {params} = $route;
                    return params;
                },
            },
        },
    }
</script>

<style lang="less">
    @import "../styles/base.less";

    #app {
        .bible {
            overflow: auto;
            padding-top: 3.25rem;

            nav {
                border-bottom: 1px solid @hot-pink;
                color: @blue;
                margin-left: calc(3rem + 4px);
            }

            .module {
                display: flex;
                padding: 0.5rem;
            }
        }
    }
</style>
