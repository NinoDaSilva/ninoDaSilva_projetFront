<script lang="ts" setup>
import MyHeader from '@/components/MyHeader.vue';
import MyFooter from '@/components/MyFooter.vue';
</script>

<template>
    <MyHeader>
        <slot name="header"/>
    </MyHeader>
    <main>
        <slot/>
    </main>
    <MyFooter>
        <slot name="footer"/>
    </MyFooter>
</template>