<script setup lang="ts">
const data = ref();
const error = ref<string>('');
const router = useRouter();

const token = useCookie('api_tracking_jwt').value;

onMounted(async () => {
    if (!token) {
        error.value = `Connectez-vous pour accéder aux données !`;
        // Attendre un court délais avant de rediriger vers la page de connexion
        setTimeout(() => {
            router.push('/login');
        }, 5000);
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/dashboard', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors du chargement des données.');
        }

        data.value = await response.json();
        console.log(data.value)
    } catch (err) {
        console.log(err);
        error.value = 'Une erreur est survenue.';
    }
});
</script>

<template>
    <div>
        <h1>Dashboard</h1>

        <!-- <div v-if="data">
            <p>Bienvenue, {{ data.username }}!</p>
        </div> -->

        <div v-if="error">
            <p>{{ error }}</p>
        </div>

        <div v-else>
            <p>Chargement...</p>
        </div>
    </div>
</template>