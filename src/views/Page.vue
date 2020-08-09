<template lang="html">
    <div>
        <transition name="page">
            <router-view class="child-view" />
        </transition>
    </div>
</template>

<script>
    import {Modules, Nav} from '../store/helpers';

    export default {
        mixins: [
            Modules,
            Nav,
        ],
    }
</script>
