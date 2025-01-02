<script lang="ts" setup>
defineProps<{
    featureIcon?: string | null,
    title: string,
    text: string,
}>()
</script>

<template>
    <div class="feature-card">
        <img v-if="featureIcon" :src="featureIcon" alt="Feature icon" class="feature-card__img">
        <h4 class="feature-card__title">{{ title }}</h4>
        <p class="feature-card__text">{{ text }}</p>
    </div>
</template>

<style lang="scss">
.feature-card {
    background-color: $GreenDarkest;
    border-radius: 20px;
    padding: rem(20px);
    font-size: rem(13px);
    color: $GreenLightest;
    box-shadow: 1px 1px 4px $GreenDarkest;
    max-width: 300px;
    margin: auto;

    @include medium-up {
        font-size: rem(15px);
    }

    &__title {
        font-size: rem(18px);
        margin-bottom: rem(8px);

        @include medium-up {
            font-size: rem(20px);
        }
    }

    &__img {
        filter: brightness(100);
        width: rem(50px);
        height: rem(50px);
        margin-bottom: rem(12px);
        
        @include medium-up {
            width: rem(70px);
            height: rem(70px);
        }
    }
}
</style>