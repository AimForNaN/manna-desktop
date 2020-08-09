<template>
    <main id="app">
		<nav class="navbar main" :is-active="true" :mobile-burger="false" :open="$route.path !== '/'" :transparent="true">
            <b-navbar-item class="navbar-brand" tag="router-link" to="/manna">&#127474;</b-navbar-item>
            <div class="navbar-menu">
                <b-navbar-item :active="isActive('/bread')" tag="router-link" :to="toBreads">B</b-navbar-item>
                <b-navbar-item :active="isActive('/crumbs')" tag="router-link" to="/crumbs">C</b-navbar-item>
                <b-navbar-item :active="isActive('/bakery')" tag="router-link" to="/bakery">K</b-navbar-item>
            </div>
		</nav>
		<transition name="page">
			<router-view class="view" />
		</transition>
	</main>
</template>

<script>
    import {Modules, Nav} from './store/helpers';

    export default {
        mixins: [
            Modules,
            Nav,
        ],
        computed: {
            toBreads: {
                cache: false,
                get() {
                    var {$route} = this;
                    var {path} = $route;
                    if (!String(path).startsWith('/breads')) {
                        var {Bible} = this.$store.state;
                        var {Book, Chapter, Modules} = Bible;
                        var {Text} = Modules;
                        return {
                            name: 'Bread',
                            params: {
                                mod: Text,
                                key: `${Book}.${Chapter}`,
                            },
                        };
                    }
                    else if (String(path) == '/breads') {
                        return null;
                    }
                    return { name: 'Breads' };
                },
            },
        },
        methods: {
            isActive(page) {
                var {$route} = this;
                var {path} = $route;
                return String(path).startsWith(page);
            },
        },
        mounted() {
            this.fetchModules().then(() => {
                this.$forceUpdate();
            });
        },
    }
</script>

<style lang="less">
    @import "./styles/base.less";

    @keyframes page-transition-ripple {
        0% {
            clip-path: circle(0% at 50% 50%);
            opacity: 0.25;
        }
        100% {
            clip-path: circle(100% at 50% 50%);
            opacity: 1;
        }
    }

    @keyframes page-transition-scale-in {
        from {
            opacity: 0;
            transform: scale(1.1);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes page-transition-scale-out {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 2s;
    }
    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }

    .page-enter-active {
        animation-duration: 0.7s;
        animation-fill-mode: forwards;
        animation-name: page-transition-scale-in;
        animation-play-state: running;
    }

    .page-leave-active {
        animation-duration: 0.7s;
        animation-fill-mode: forwards;
        animation-name: page-transition-scale-out;
        animation-play-state: running;
    }

    .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }
    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }

    * {
		box-sizing: border-box;

		&::-webkit-scrollbar {
			height: 5px;
			width: 5px;
		}

		&::-webkit-scrollbar-track {
			background-color: #FAFAFA;
			border-radius: 1rem;

			&:hover {
				background-color: @bg;
			}
		}

		&::-webkit-scrollbar-thumb {
			background: @grey100;
			border-radius: 1rem;

			&:hover {
				background: @pale-blue;
			}
		}
	}

    #app {
        background-color: @blue;

        a {
            color: @blue;
            text-decoration: none;

            &:hover {
                color: @red;
            }
        }

        button {
            align-items: center;
            display: flex;
            justify-content: center;

            > * {
                align-items: center;
                display: flex;
                justify-content: center;
            }
        }

        button.is-dark, button.is-primary {
            background-color: @blue;
            border-color: @blue;
            color: #FFF;
        }

        input:focus, select:focus {
            border-color: @blue;
            box-shadow: none;
        }

        .button {
            &:focus, &.is-focused {
                border-color: @blue !important;
                box-shadow: 0 0 0 0.125em @grey !important;
            }
        }

        .dropdown-content {
            border: 1px solid @grey200;
        }

        .navbar {
            align-items: center;
            display: flex;

            .navbar-brand {
                align-items: center;
                display: flex;
                flex: 1;
                pointer-events: none;
            }

            > * {
                margin-right: 0.5rem;

                &.navbar-item {
                    padding: 0;

                    &.navbar-brand {
                        padding: 0 0.5rem;
                    }
                }
            }
        }

        .switch {
            .check {
                box-shadow: none;
            }

            input[type="checkbox"]:checked + .check {
                background-color: @blue;
            }
        }

        & {
            bottom: 0;
            left: 0;
            position: fixed;
            right: 0;
            top: 0;

            nav.main {
                align-items: stretch;
                background-color: @blue;
                color: #FFF;
                display: flex;
                flex-direction: column;
                height: 100vh;
                left: 0;
                max-width: 3rem;
                opacity: 0;
                overflow: hidden;
                pointer-events: none;
                position: fixed;
                top: 0;
                transition: all 0.7s;
                width: 0.75rem;
                z-index: 1000;

                &[open] {
                    border-right: 4px solid @red;
                    max-width: 3rem;
                    opacity: 1;
                    pointer-events: all;
                    width: 3rem;
                }

                a {
                    align-items: center;
                    color: #FFF;
                    display: flex;
                    justify-content: center;
                    outline: none;
                    padding: 0.5rem;

                    &:hover {
                        background-color: darken(@red, 15%) !important
                    }

                    &.is-active {
                        background-color: @red !important;
                    }
                }

                .navbar-brand {
                    flex: none;
                    flex-direction: column;
                    min-height: 0;
                    outline: none;

                    &:focus, &:focus-within, &:hover {
                        background-color: transparent !important;
                    }
                }

                .navbar-item {
                    align-items: center;
                    display: flex;
                    justify-content: center;
                    padding: 0.5rem !important;
                }

                .navbar-menu {
                    align-items: stretch;
                    background-color: @blue;
                    display: flex;
                    flex-direction: column;
                    padding: 0.25rem 0;
                }

                > * {
                    margin: 0;
                }
            }

            .view {
                background-color: #FFF;
                bottom: 0;
                left: 0;
                overflow: hidden;
                position: absolute;
                right: 0;
                top: 0;

                .child-view {
                    bottom: 0;
                    left: 0;
                    overflow: hidden;
                    position: absolute;
                    right: 0;
                    top: 0;

                }

                &:not(.home) {
                    left: 3rem;
                }
            }
        }
    }

    body, html {
        overflow: hidden !important;
    }

    .modal-card-foot {
        button.is-primary {
            background-color: @blue;
        }
    }

    .v-context {
        [role="menuitem"] {
            align-items: center;
            display: flex;
            font-family: Jaldi;
            font-size: 14pt;
            padding: 0 0.5rem;

            .icon {
                margin-right: 0.5rem;

                > * {
                    align-items: center;
                    display: flex;
                    height: 24px;
                    justify-content: center;
                    width: 24px;

                    &.mdi:before {
                        font-size: 14pt;
                    }
                }
            }
        }
    }
</style>
