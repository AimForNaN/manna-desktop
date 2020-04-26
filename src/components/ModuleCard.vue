<template>
    <div class="card module button">
        <div class="card-header" @click="onClick">
            <div class="card-header-title">
                {{Name}}
            </div>
        </div>
        <div class="card-content" @click="onClick">
            {{Description}}
        </div>
        <footer class="card-footer">
            <a class="card-footer-item" @click="onAbout">
                <!-- <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon> -->
                About
            </a>
        </footer>
    </div>
</template>

<script>
    import Helpers from '../store/helpers';
    const {Module} = Helpers;

    export default {
        mixins: [
            Module,
        ],
        props: {
            module: {
                type: Object,
                default() {
                    return {};
                },
            },
        },
        methods: {
            onAbout() {
                var {About, Description} = this;
                this.$buefy.dialog.alert({
                    title: Description,
                    message: String(About).replace(/\\par/gm, '<br>'),
                    confirmText: 'Close',
                });
            },
            onClick() {
                this.$emit('click', this.module);
            },
        },
    }
</script>

<style lang="less">
    #app {
        .module.card {
            align-items: unset;
            display: flex;
            flex-direction: column;
            height: auto;
            justify-content: unset;
            padding: 0;
            text-align: left;
            width: 250px;
            white-space: normal;

            .about {
                word-break: break-word;
            }

            .card-content {
                flex: 1;
            }

            .collapse {
                display: flex;
                flex: 1;
                flex-direction: column;
                overflow: hidden;

                .collapse-content {
                    max-height: 200px;
                    overflow-x: hidden;
                    overflow-y: auto;
                    padding: 1rem;
                }

                .collapse-trigger {
                    align-items: center;
                    display: flex;
                    flex: 1;
                    justify-content: center;
                }
            }
        }
    }
</style>
