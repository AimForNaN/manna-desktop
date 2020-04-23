<template>
    <div class="card module">
        <div class="card-header">
            <div class="card-header-title">
                {{Name}}
            </div>
        </div>
        <div class="card-content">
            {{Description}}
        </div>
        <!-- <footer class="card-footer">
            <a href="#" class="card-footer-item">Open</a>
            <a href="#" class="card-footer-item">Uninstall</a>
        </footer> -->
    </div>
</template>

<script>
    export default {
        props: {
            module: {
                type: Object,
                default() {
                    return {};
                },
            },
        },
        computed: {
            Description: {
                cache: false,
                get() {
                    var {module} = this;
                    var {Description} = module;
                    return Description;
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
</script>

<style lang="less">
    #app {
        .module.card {
            display: flex;
            flex-direction: column;
            width: 250px;

            .card-content {
                flex: 1;
            }
        }
    }
</style>
