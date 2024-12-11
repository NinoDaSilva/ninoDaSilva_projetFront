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
            <div>
                <h3>Habitudes générales</h3>
                <ul>
                    <li v-for="item of data.globalHabits" :key="item.id">{{ item.title }} : {{ item.description }}</li>
                </ul>
                <p v-if="data.globalHabits.length == 0">Aucune habitude enregistrée</p>
            </div>

            <div>
                <h3>Habitudes personnelles</h3>
                <ul>
                    <li v-for="item of data.personalHabits" :key="item.id">{{ item.title }} : {{ item.description }}</li>
                </ul>
                <p v-if="data.personalHabits.length == 0">Aucune habitude enregistrée</p>
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