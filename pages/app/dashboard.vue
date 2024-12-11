<script setup lang="ts">
import addHabitsForm from '~/components/addHabitsForm.vue';

const error = ref<string>('');

const { data, refresh } = await useAsyncData('dashboard', async () => {
    return await useTrackingApi('/dashboard', { method: 'GET'});
})

async function onHabitCreate() {
    refresh()
}
</script>

<template>
    <div>
        <h1>Dashboard</h1>

        <div v-if="data">
            <p>Habitudes générales</p>
            <ul>
                <li v-for="item of data.globalHabits" :key="item.id">{{ item.title }} : {{ item.description }}</li>
            </ul>

            <p>Habitudes personnelles</p>
            <ul>
                <li v-for="item of data.personalHabits" :key="item.id">{{ item.title }} : {{ item.description }}</li>
            </ul>

            <AddHabitForm @habit:create="onHabitCreate()" />
        </div>

        <div v-if="error">
            <p>{{ error }}</p>
        </div>

        <div v-else>
            <p>Chargement...</p>
        </div>

        <div>
            <addHabitsForm @habit:create="onHabitCreate()"/>
        </div>
    </div>
</template>