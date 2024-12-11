<script setup lang="ts">
import addHabitsForm from '~/components/addHabitsForm.vue';
import HabitsCard from '~/components/HabitsCard.vue';

const error = ref<string>('');

const { data, refresh } = await useAsyncData('dashboard', async () => {
    return await useTrackingApi('/dashboard', { method: 'GET' });
})

async function onHabitCreate() {
    refresh()
}
</script>

<template>
    <div class="habits">
        <h1 class="habits__title">Dashboard</h1>

        <div v-if="data" class="habits__container">
            <div class="habits__wrapper">
                <h3 class="habits__title--subheading">Habitudes générales</h3>
                <HabitsCard type="globalHabits" />
            </div>

            <div class="habits__wrapper">
                <h3 class="habits__title--subheading">Habitudes personnelles</h3>
                <HabitsCard type="personalHabits" />
            </div>

            <addHabitsForm @habit:create="onHabitCreate()" />
        </div>

        <div v-else-if="error">
            <p>{{ error }}</p>
        </div>

        <div v-else>
            <p>Chargement...</p>
        </div>
    </div>
</template>

<style lang="scss">
.habits {
    padding: 5%;

    &__title {
        color: $PrimaryBase;
    }
}
</style>