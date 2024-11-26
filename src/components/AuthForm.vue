<script setup lang="ts">
import { ref } from 'vue';
import FormInput from '@/components/FormInput.vue';
import Button from '@/components/Cbutton.vue';

const isSignUp = ref(false);

const switchMode = () => {
    isSignUp.value = !isSignUp.value;
};

const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (isSignUp.value) {
        console.log('Inscription');
    } else {
        console.log('Connexion');
    }
};
</script>

<template>
    <div class="auth-form">
        <h1 class="auth-form__title">{{ isSignUp ? 'Inscription' : 'Connexion' }}</h1>
        <form class="auth-form__form" @submit="handleSubmit">
            <FormInput v-if="isSignUp" label="Nom d'utilisateur" type="text" name="username"
                placeholder="Entrez votre nom d'utilisateur" />

            <FormInput label="Adresse email" type="email" name="email" placeholder="Entrez votre email" />
            <FormInput label="Mot de passe" type="password" name="password" placeholder="Entrez votre mot de passe" />

            <FormInput v-if="isSignUp" label="Confirmer le mot de passe" type="password" name="confirmPassword"
                placeholder="Confirmez votre mot de passe" />

            <Button :label="isSignUp ? 'S\'inscrire' : 'Se connecter'" variant="primary" class="auth-form__submit" />
        </form>

        <div class="auth-form__switch">
            {{ isSignUp ? 'Vous avez un compte ?' : 'Pas encore inscrit ?' }}
            <a @click.prevent="switchMode" href="#">
                {{ isSignUp ? 'Se connecter' : 'S\'inscrire' }}
            </a>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.auth-form {
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 5%;
    margin-inline: auto;

    &__title {
        font-size: 24px;
        text-align: center;
        margin-bottom: 20px;
        color: #333;
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    &__submit {
        margin-top: 10px;
    }

    &__switch {
        text-align: center;
        margin-top: 15px;
        font-size: 14px;

        a {
            color: #007bff;
            text-decoration: underline;
            cursor: pointer;

            &:hover {
                color: #0056b3;
            }
        }
    }
}
</style>