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

const router = useRouter();

onMounted(() => {
    const cookieJwt = useCookie('api_tracking_jwt');

    // Si le token existe, accéder à la page
    // Sinon, se connecter
    if (!cookieJwt.value) {
        router.push('/login');
    }
});
</script>

<template>
    <div class="habits">
        <h1 class="habits__title">Dashboard</h1>

        <div v-if="data" class="habits__container">
            <div class="habits__wrapper">
                <div class="habits__section">
                    <h3 class="habits__title--subheading">Habitudes générales</h3>
                    <HabitsCard type="globalHabits" />
                </div>
                <div class="habits__section">
                    <h3 class="habits__title--subheading">Habitudes personnelles</h3>
                    <HabitsCard type="personalHabits" />
                </div>
            </div>

            <addHabitsForm class="habits__form" @habit:create="onHabitCreate()" />
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
    max-width: rem(1650px);
    margin: auto;

    &__title {
        color: $PrimaryBase;
    }

    &__container {
        display: grid;
        grid-template-columns: 1fr;

        @include medium-up {
            gap: 3%;
            grid-template-columns: 1fr 1fr;
            align-items: start;
        }
    }

    &__form {
        @include medium-up {
            position: sticky;
            top: 5rem;
            margin-top: 20%;
            align-self: start;
        }
    }
}
</style>