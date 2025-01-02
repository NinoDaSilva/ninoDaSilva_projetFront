<script lang="ts" setup>
defineProps<{
    title: string,
    price: number,
    buttonLabel?: string,
    buttonVariant?: "primary" | "outline",
    contents: string[],
}>()
</script>

<template>
    <div class="pricing-card">
        <h4 class="pricing-card__title">{{ title }}</h4>
        <ul v-if="contents" class="pricing-card__list">
            <li v-for="(content, index) in contents" :key="index" class="pricing-card__item">
                {{ content }}
            </li>
        </ul>
        <div class="pricing-card__text">{{ price }}€/mois</div>
        <Cbutton :label="buttonLabel" :variant="buttonVariant" class="pricing-card__btn" />
    </div>
</template>

<style lang="scss">
.pricing-card {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    background-color: $PrimaryLighter;
    border-radius: 30px;
    padding: rem(25px);
    max-width: rem(250px);
    margin: auto;
    box-sizing: border-box;

    @include small-up {
        height: 100%;
    }

    &__title {
        font-size: rem(22px);
        color: $PrimaryDark;
        margin-bottom: rem(20px);
    }

    &__item {
        font-size: rem(15px);
        margin: rem(10px) 0;
    }

    &__text {
        font-size: rem(18px);
        margin: rem(25px) 0;
    }}
</style>