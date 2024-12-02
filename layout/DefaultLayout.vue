<script lang="ts" setup>
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