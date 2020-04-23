<template>
    <main id="app">
		<b-navbar :is-active="true" :mobile-burger="false" :open="$route.path !== '/'" :transparent="true">
            <template slot="brand">
                <b-navbar-item tag="router-link" to="/manna">&#127474;</b-navbar-item>
            </template>
            <template slot="start">
                <b-navbar-item tag="router-link" to="/bread">B</b-navbar-item>
                <b-navbar-item tag="router-link" to="/crumbs">C</b-navbar-item>
                <b-navbar-item tag="router-link" to="/bakery">K</b-navbar-item>
            </template>
		</b-navbar>
		<transition name="page">
			<router-view/>
		</transition>
	</main>
</template>

<script>
    export default {
        methods: {
            fetchModules() {
                this.$store.dispatch('GetModules');
            },
        },
        mounted() {
            this.fetchModules();
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

        & {
            bottom: 0;
            display: flex !important;
            flex: 1;
            left: 0;
            position: fixed;
            right: 0;
            top: 0;

            > nav {
                background-color: @blue;
                color: #FFF;
                display: flex;
                flex-direction: column;
                opacity: 0;
                overflow: hidden;
                pointer-events: none;
                transition: all 0.7s;
                width: 0.75rem;
                z-index: 1000;

                &[open] {
                    pointer-events: all;
                    opacity: 1;
                    width: 3rem;
                }

                a {
                    align-items: center;
                    color: #FFF;
                    display: flex;
                    justify-content: center;
                    padding: 0.5rem;

                    &:hover {
                        background-color: @blue;
                    }
                }

                .navbar-brand {
                    align-items: stretch;
                    flex-direction: column;
                    min-height: 0;
                    outline: none;
                }

                .navbar-menu {
                    background-color: @blue;
                    display: flex;
                    flex-direction: column;

                    .navbar-start {
                        align-items: stretch;
                        display: flex;
                        flex-direction: column;
                        margin-right: 0;
                    }
                }
            }


            article {
                background-color: #FFF;
                flex: 1;
                border-left: 4px solid @red;
                overflow: hidden;
                position: relative;
                z-index: 1;
            }
        }

        a {
            text-decoration: none;
        }
    }

    body, html {
        overflow: hidden;
    }

</style>
