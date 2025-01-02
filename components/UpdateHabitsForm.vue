<script setup lang="ts">
// Props pour recevoir l'habitude actuelle
const props = defineProps<{
    habit: { id: number; title: string; description: string };
}>();

// Gestion des champs de formulaire
const habit = props.habit;

const title = ref(habit.title); // Pré-rempli avec le titre de l'habitude
const description = ref(habit.description); // Pré-rempli avec la description de l'habitude
const error = ref('');

// Émission d'événements
const emit = defineEmits(['habit:update', 'form:cancel']);

async function onSubmit() {
    try {
        // Envoi des modifications à l'API
        await useTrackingApi(`/habits/${habit.id}`, {
            method: 'PUT',
            body: { title: title.value, description: description.value },
        });

        // Émission de l'événement pour indiquer que l'habitude a été modifiée
        emit('habit:update');
    } catch (err) {
        console.error(err);
        error.value = "Une erreur est survenue lors de la modification";
    }
}

function onCancel() {
    // Émission de l'événement pour annuler la modification
    emit('form:cancel');
}
</script>

<template>
    <div class="auth-form">
        <h1 class="auth-form__title">Modifier une habitude</h1>
        <form class="auth-form__form" @submit.prevent="onSubmit">
            <FormInput v-model="title" label="Titre de l'habitude" type="text" name="title" placeholder="Titre"
                required />
            <FormInput v-model="description" label="Description" type="text" name="description"
                placeholder="Description" required />

            <div v-if="error" class="auth-form__error">
                {{ error }}
            </div>

            <div class="auth-form__actions">
                <Cbutton type="submit" label="Sauvegarder" variant="primary" class="auth-form__submit" />
                <Cbutton type="button" label="Annuler" variant="outline" class="auth-form__cancel" @click="onCancel" />
            </div>
        </form>
    </div>
</template>

<style lang="scss">
.auth-form {
    padding: 5%;
    background: $SkyWhite;
    border-radius: 8px;
    margin: auto;

    @include small-up() {
        width: 100%;
        padding: rem(30px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    &__title {
        font-size: rem(26px);
        font-weight: bold;
        text-align: center;
        margin-bottom: rem(30px);
        margin-top: 0;
        color: $InkDarkest;
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: rem(15px);
    }

    &__submit {
        margin-top: rem(10px);
    }

    &__error {
        font-size: rem(14px);
        color: $RedBase;
    }

    &__actions {
        display: flex;
        justify-content: space-between;
        gap: rem(10px);
    }
}
</style>
