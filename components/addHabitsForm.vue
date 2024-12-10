<script setup lang="ts">
import Cbutton from './Cbutton.vue';

// Gestion de l'envoie
const title = ref('');
const description = ref('');
const error = ref('');

async function onSubmit() {
    try {
        const response = await fetch(`http://localhost:4000/habits`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${useCookie('api_tracking_jwt').value}`
            },
            body: JSON.stringify({
                title: title.value,
                description: description.value
            }),
        });

        if (!response.ok) throw new Error('Une erreur est survenue')
        // On récupère la partie json de la réponse
        await response.json()
        // On stocke le token dans un cookie
        emit('habit:created')

    } catch (err) {
        console.log(err);
        error.value = "Une erreur est survenue";
    }
}
</script>

<template>
    <div class="auth-form">
        <h1 class="auth-form__title">Ajouter une habitude</h1>
        <form class="auth-form__form" @submit="onSubmit">
            <FormInput v-model="title" label="Titre de l'habitude" type="text" name="title"
                placeholder="Titre" required />
            <FormInput v-model="description" label="Description" type="text" name="description"
                placeholder="Description" required />
            <!-- Gestion des erreurs -->
            <div v-if="error" class="auth-form__error">
                {{ error }}
            </div>

            <Cbutton label="Ajouter" variant="primary" class="auth-form__submit" />
        </form>
    </div>
</template>

<style lang="scss">
.auth-form {
    max-width: rem(400px);
    padding: 5%;
    background: $SkyWhite;
    border-radius: 8px;
    margin: auto;

    @include small-up() {
        padding: rem(30px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        margin: 5% auto;
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