<template>
    <main id="app">
		<nav class="navbar main" :is-active="true" :mobile-burger="false" :open="$route.path !== '/'" :transparent="true">
            <b-navbar-item class="navbar-brand" tag="router-link" to="/manna">&#127474;</b-navbar-item>
            <div class="navbar-menu">
                <b-navbar-item :active="isActive('/bread')" tag="router-link" :to="{ name: 'Breads' }">B</b-navbar-item>
                <b-navbar-item tag="router-link" to="/crumbs">C</b-navbar-item>
                <b-navbar-item tag="router-link" to="/bakery">K</b-navbar-item>
            </div>
		</nav>
		<transition name="page">
			<router-view class="view" />
		</transition>
	</main>
</template>

<script>
    import Helpers from './store/helpers';
    const {Modules} = Helpers;

    export default {
        mixins: [
            Modules,
        ],
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
            z-index: 999;
        }
        35% {
            opacity: 1;
        }
        80% {
            clip-path: circle(100% at 50% 50%);
            opacity: 1;
        }
        100% {
            clip-path: circle(100% at 50% 50%);
            opacity: 0;
            z-index: 0;
        }
    }

    @keyframes page-transition-fade-in {
        from {
            opacity: 0;
            transform: scale(1.1);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes page-transition-fade-out {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }

    .page-enter-active {
        animation-duration: 0.7s;
        animation-fill-mode: forwards;
        animation-name: page-transition-fade-in;
        animation-play-state: running;
    }

    .page-leave-active {
        animation-duration: 0.7s;
        animation-fill-mode: forwards;
        animation-name: page-transition-fade-out;
        animation-play-state: running;
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
                        background-color: @blue !important
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
                }

                .navbar-item {
                    align-items: center;
                    display: flex;
                    justify-content: center;
                }

                .navbar-menu {
                    align-items: stretch;
                    background-color: @blue;
                    display: flex;
                    flex-direction: column;
                    padding: 0.25rem 0;
                }
            }

            .view {
                background-color: #FFF;
                border-left: 4px solid @red;
                bottom: 0;
                left: 0;
                overflow: hidden;
                position: absolute;
                right: 0;
                top: 0;

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
</style>
