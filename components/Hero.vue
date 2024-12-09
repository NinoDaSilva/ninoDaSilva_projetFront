<script setup lang="ts">
import Cbutton from '@/components/Cbutton.vue';

defineProps<{
    title: string,
    text?: string,
    backgroundImg?: string,
    buttonLabel?: string,
    buttonVariant?: "primary" | "outline",
    showButton: Boolean,
}>();
</script>

<template>
    <section class="hero" :style="{ backgroundImage: `url(${backgroundImg})` }">
        <div class="hero__content">
            <h1 class="hero__title">{{ title }}</h1>
            <p class="hero__text">{{ text }}</p>
            <Cbutton v-if="showButton" :label="buttonLabel" :variant="buttonVariant" class="hero__button" />
        </div>
    </section>
</template>

<style lang="scss">
.hero {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-size: cover;
    background-position: center;
    padding: 2rem;
    max-width: 100%;
    height: auto;

    &__content {
        max-width: 600px;
        color: $SkyWhite;
        text-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    }

    &__title {
        font-size: rem(20px);
        font-weight: bold;
        margin-bottom: 1rem;
    }

    &__text {
        font-size: rem(18px);
        margin-bottom: rem(32px);
        line-height: 1.6;
    }

    &__button {
        margin-top: rem(16px);
        display: inline-block;
    }
}
</style>