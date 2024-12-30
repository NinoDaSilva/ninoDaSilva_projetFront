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