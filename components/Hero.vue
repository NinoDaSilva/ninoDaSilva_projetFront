<script setup lang="ts">
import Cbutton from '@/components/Cbutton.vue';

defineProps<{
    title: string,
    text?: string,
    backgroundImg?: string,
    buttonLabel?: string,
    buttonVariant?: "primary" | "outline",
    showButton: boolean,
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
    <slot name="stats"></slot>
</template>

<style lang="scss">
.hero {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-size: cover;
    background-position: center;
    padding: 1rem;
    max-width: 100%;
    height: auto;
    min-height: 40vh;

    &__content {
        max-width: 600px;
        color: $SkyWhite;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    &__title {
        font-size: rem(26px);
        font-weight: bold;
        margin-bottom: 1rem;
        @include small-up {
            font-size: rem(40px);
        }
    }

    &__text {
        font-size: rem(15px);
        margin-bottom: rem(32px);
        line-height: 1.1;
        @include small-up {
            font-size: rem(18px);
        }
    }

    &__button {
        margin-top: rem(5px);
    }
}
</style>