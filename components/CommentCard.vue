<script lang="ts" setup>
defineProps<{
    name: string,
    text: string,
    work?: string,
}>()
</script>

<template>
    <div class="comment-card">
        <p class="comment-card__text">{{ text }}</p>
        <h4 class="comment-card__title">{{ name }}</h4>
        <p class="comment-card__text --work">{{ work }}</p>
    </div>
</template>