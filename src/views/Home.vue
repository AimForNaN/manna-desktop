<template>
    <article class="home">
        <section class="wrapper-logo">
			<div class="logo"></div>
		</section>
        <section class="nav">
            <b-navbar id="nav" :is-active="true" :mobile-burger="false" :shadow="false" :transparent="true">
                <template slot="start">
                    <b-navbar-item tag="router-link" :to="{ name: 'Breads' }">The Bread</b-navbar-item>
                    <b-navbar-item tag="router-link" to="/crumbs">The Crumbs</b-navbar-item>
                    <b-navbar-item tag="router-link" to="/bakery">The Bakery</b-navbar-item>
                </template>
            </b-navbar>
        </section>
    </article>
</template>

<script>
    import flowtype from '../../../flowtypejs';

    export default {
        name: 'Home',
        data() {
            return {
                flowtype: null,
            };
        },
        components: {
        },
        mounted() {
            this.flowtype = new flowtype('.home a', {
                parent: 'section.nav',
                maxFont: 18,
                minFont: 8,
            });
        },
        destroyed() {
            this.flowtype.destroy();
        },
    }
</script>

<style lang="less">
    @import "../styles/base.less";

    .home {
        align-items: center;
        background-color: white;
        background-image: url(../assets/bg.jpg);
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        flex: 1;
        flex-direction: column;
        overflow: hidden;
        position: relative;

        &::before {
            background-color: white;
            bottom: 0;
            content: '';
            display: block;
            left: 0;
            opacity: 0.5;
            position: absolute;
            right: 0;
            top: 0;
        }

        > * {
            position: relative;
            z-index: 1;

            &:first-child {
                height: 50vh;
            }

            &:last-child {
                height: 50vh;
            }
        }

        nav {
            align-items: flex-start;
            background-color: transparent;
            display: flex;
            font-family: Khand;
            justify-content: center;
            text-transform: uppercase;

            .navbar-menu {
                background-color: transparent;
                box-shadow: none;
                display: flex;
                padding: 0;
            }

            .navbar-start {
                background-image: radial-gradient(farthest-side, #FFF, #FFF7, #FFF0);
                border-top: 1px solid @pink;
                box-shadow: 0 15px 30px -19px rgba(246, 187, 218, 0.5);
                display: flex;
                list-style: none;
                margin: 0;
                padding: 0;
                transition: all 300ms;

                &:hover {
                    border-color: @hot-pink;
                }

                &:hover a {
                    color: @red;
                }

                a {
                    border-bottom-left-radius: 2px;
                    border-bottom-right-radius: 2px;
                    color: @hot-pink;
                    cursor: pointer;
                    font-size: 18pt;
                    margin-top: -1px;
                    outline: none;
                    overflow: hidden;
                    padding: 0.5rem 2rem;
                    position: relative;
                    transition: all 200ms;
                    z-index: 1;

                    &::before {
                        background-color: @red;
                        bottom: 0;
                        content: '';
                        display: block;
                        height: 100%;
                        left: 0;
                        opacity: 0;
                        position: absolute;
                        right: 0;
                        transition: all 300ms;
                        transform: perspective(10rem) rotateX(80deg);
                        z-index: -1;
                    }

                    &:hover::before {
                        opacity: 1;
                        transform: rotateX(0);
                    }

                    &:hover {
                        color: white !important;
                    }
                }
            }
        }

        .wrapper-logo {
            align-items: flex-end;
            display: flex;
            filter: drop-shadow(-4px 4px 0px #162A4A22);
            flex: 1;
            text-align: center;
            width: 100%;

            .logo {
                background-color: @red;
                flex: 1;
                height: 100px;
                width: 100%;
                -webkit-mask: url(../assets/logo.svg) center/300px no-repeat;
            }
        }
    }
</style>
