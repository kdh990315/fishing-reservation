<template>
    <header-section></header-section>
    <router-view></router-view>
    <footer-section></footer-section>
</template>

<script>
import HeaderSection from './components/layout/HeaderSection.vue';
import FooterSection from './components/layout/FooterSection.vue';

export default {
    components: {
        HeaderSection,
        FooterSection,
    },
    created() {
        this.$store.dispatch('auth/autoLogin');
    }
}
</script>

<style></style>
