<script lang="ts" setup>
import MyHeader from '@/components/MyHeader.vue';
import MyFooter from '@/components/MyFooter.vue';
</script>

<template>
    <MyHeader>
        <slot name="header"></slot>
    </MyHeader>
    <main>
        <slot></slot>
    </main>
    <MyFooter>
        <slot name="footer"></slot>
    </MyFooter>
</template>