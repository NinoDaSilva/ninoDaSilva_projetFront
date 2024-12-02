<script lang="ts" setup>
</script>

<template>
    <div>
        <MyHeader>
            <slot name="header" />
        </MyHeader>
        <main>
            <slot />
        </main>
        <MyFooter>
            <slot name="footer" />
        </MyFooter>
    </div>
</template>