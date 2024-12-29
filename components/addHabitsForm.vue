<script setup lang="ts">
import Cbutton from './Cbutton.vue';

// Gestion de l'envoie
const title = ref('');
const description = ref('');
const error = ref('');

const emit = defineEmits(['habit:create']);

async function onSubmit() {
    try {
        await useTrackingApi('/habits', {
            method: 'POST',
            body: { title: title.value, description: description.value }
        })
        // Emmettre l'événement pour créer l'habitude
        emit('habit:create')
        title.value = '';
        description.value = '';
    } catch (err) {
        console.log(err);
        error.value = "Une erreur est survenue";
    }
}
</script>

<template>
    <div class="auth-form">
        <h1 class="auth-form__title">Ajouter une habitude</h1>
        <form class="auth-form__form" @submit.prevent="onSubmit">
            <FormInput v-model="title" label="Titre de l'habitude" type="text" name="title" placeholder="Titre"
                required />
            <FormInput v-model="description" label="Description" type="text" name="description"
                placeholder="Description" required />
            <!-- Gestion des erreurs -->
            <div v-if="error" class="auth-form__error">
                {{ error }}
            </div>

            <Cbutton type="submit" label="Ajouter" variant="primary" class="auth-form__submit" />
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
}
</style>