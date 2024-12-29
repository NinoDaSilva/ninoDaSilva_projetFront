<script setup lang="ts">
const { data: habitsData } = await useAsyncData('dashboard', async () => {
    const result = await useTrackingApi('/dashboard', { method: 'GET' });
    return JSON.parse(JSON.stringify(result));
});

defineProps<{
    type: string,
}>();
</script>

<template>
    <div class="habits-card">
        <ul class="habits-card__list" v-if="habitsData[type]">
            <li class="habits-card__item" v-for="item in habitsData[type]" :key="item.id">
                <p class="habits-card__title">{{ item.title }}</p>
                <p class="habits-card__description">{{ item.description }}</p>
            </li>
        </ul>
        <p class="habits-card__info" v-else>Aucune habitude enregistrée</p>
    </div>
</template>

<style lang="scss">
.habits-card {
    display: flex;
    flex-direction: column;
    padding: 2%;
    padding-bottom: rem(50px);
    max-width: rem(650px);

    &__list {
        display: grid;
        gap: rem(12px);
    }

    &__item {
        background-color: $PrimaryLightest;
        color: $PrimaryDark;
        padding: rem(20px);
        border-radius: 5px;
        box-shadow: 1px 2px 4px $PrimaryLighter;
        transition: all 0.3s ease;

        &:hover {
            transform: scale(1.05);
            box-shadow: 1px 3px 5px $PrimaryLighter;
            cursor: pointer;
        }
    }

    &__title {
        font-weight: 600;
        font-size: rem(16px);
    }

    &__description {
        font-size: rem(14px);
        margin-top: rem(6px)
    }
}
</style>