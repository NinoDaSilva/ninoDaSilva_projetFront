<script lang="ts" setup>
defineProps<{
    title: string,
    price: number,
    buttonLabel?: string,
    buttonVariant?: "primary" | "outline",
    content: string[],
}>()
</script>

<template>
    <div class="princing-card">
        <h4 class="princing-card__title">{{ title }}</h4>
        <ul v-if="content" class="pricing-card__list">
            <li v-for="(content, index) in content" :key="index" class="pricing-card__item">
                {{ content }}
            </li>
        </ul>
        <span class="princing-card__text">{{ price }}€/mois</span>
        <Cbutton :label="buttonLabel" :variant="buttonVariant" />
    </div>
</template>