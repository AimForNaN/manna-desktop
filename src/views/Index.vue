<script setup>
    import { RouterLink } from 'vue-router';
    import { Motion } from 'motion/vue';
    import { useRoutes } from './../router/routes.js';

    const routes = useRoutes();
</script>

<template>
    <main id="index">
        <Motion :animate="{ opacity: 1, transform: 'translateY(0) scale(1)' }" :initial="{ opacity: 0, transform: 'translateY(25px) scale(1.2)' }" :transition="{ duration: 3 }">
            <article class="main">
                <div class="wrapper-logo">
                    <div class="logo"></div>
                </div>
                <Motion :animate="{ opacity: 1, transform: 'translateY(0) scale(1)' }" :initial="{ opacity: 0, transform: 'translateY(25px) scale(1.2)' }" :transition="{ delay: 1.5, duration: 2 }">
                    <nav class="main">
                        <router-link :to="route" v-for="route in routes">{{route.meta.title}}</router-link>
                    </nav>
                </Motion>
            </article>
        </Motion>
        <nav class="secondary">
            <a href="https://github.com/stars/truefusion/lists/manna">
                <i class="mdi mdi-github"></i>
            </a>
        </nav>
    </main>
</template>

<style lang="less">
    #index {
        @apply bg-center bg-cover bg-no-repeat fixed flex flex-col inset-0 z-20 md:bg-center md:items-center md:justify-center;
        background-image: url(/images/bg.avif);

        &::before {
            @apply absolute bg-white bg-opacity-50 inset-0;
            content: '';
        }

        article.main {
            @apply flex flex-1 flex-col items-center z-10 md:flex-none;
        }

        nav.main {
            @apply flex flex-col justify-center p-6 self-stretch text-2xl md:flex-row md:h-80 md:items-start md:p-0;

            a {
                @apply px-6 py-3 relative text-center;

                &::after {
                    @apply absolute bottom-0 bg-pink-500 duration-300 h-1 left-0 rounded scale-x-0 transition w-full;
                    content: '';
                }

                &:hover::after {
                    @apply scale-x-100;
                }
            }
        }

        nav.secondary {
            @apply bottom-0 fixed flex items-center justify-center p-4 w-screen lg:bottom-auto lg:top-0 lg:justify-end lg:px-6;
        }

        .wrapper-logo {
            filter: drop-shadow(-4px 4px 0 #162A4A22);

            .logo {
                @apply bg-pink-500 h-32 md:h-20;
                width: 300px;
                -webkit-mask: url(/images/logo.svg) center/300px no-repeat;
            }
        }
    }
</style>
