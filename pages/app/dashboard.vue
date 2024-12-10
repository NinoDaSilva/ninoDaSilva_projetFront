<script setup lang="ts">
import addHabitsForm from '~/components/addHabitsForm.vue';

const error = ref<string>('');
const router = useRouter();

const token = useCookie('api_tracking_jwt').value;

const { data, refresh } = await useAsyncData('dashboard', async () => {
    if (!token) {
        error.value = `Connectez-vous pour accéder aux données !`;
        // Attendre un court délais avant de rediriger vers la page de connexion
        setTimeout(() => {
            router.push('/login');
        }, 4000);
        return;
    }


    const response = await fetch('http://localhost:4000/dashboard', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors du chargement des données.');
    }

    return await response.json();

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
            <addHabitsForm />
        </div>
    </div>
</template>