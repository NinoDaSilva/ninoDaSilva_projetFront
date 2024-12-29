<script lang="ts" setup>
</script>

<template>
    <div>
        <MyHeader>
            <slot name="header" />
        </MyHeader>
        <main class="main__container">
            <slot />
        </main>
        <MyFooter>
            <slot name="footer" />
        </MyFooter>
    </div>
</template>

<style lang="scss">
.main__container {
    min-height: calc(100vh - 298px - 55px );
    @include small-up {
        min-height: calc(100vh - 216px - 55px - 40px);
    }
    @include medium-up {
        min-height: calc(100vh - 216px - 77px - 40px);
    }
}
</style>