<script setup lang="ts">
import FormInput from '@/components/FormInput.vue';
import Button from '@/components/Cbutton.vue';

const props = defineProps<{
    isSignUp: boolean,
}>();
const emit = defineEmits(['update:isSignUp', 'submit']);

// Fonction pour basculer entre les deux états
const switchMode = () => {
    emit('update:isSignUp', !props.isSignUp);
};

// Gestion de l'envoie du formulaire
const handleSubmit = (event: Event) => {
    event.preventDefault();
    emit('submit', props.isSignUp ? 'Inscription' : 'Connexion');
    if (props.isSignUp) {
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
            <FormInput
v-if="isSignUp" label="Nom d'utilisateur" type="text" name="username"
                placeholder="Entrez votre nom d'utilisateur" />

            <FormInput label="Adresse email" type="email" name="email" placeholder="Entrez votre email" />
            <FormInput label="Mot de passe" type="password" name="password" placeholder="Entrez votre mot de passe" />
            <FormInput
v-if="isSignUp" label="Confirmer le mot de passe" type="password" name="confirmPassword"
                placeholder="Confirmez votre mot de passe" />

            <Button :label="isSignUp ? 'S\'inscrire' : 'Se connecter'" variant="primary" class="auth-form__submit" />
        </form>

        <div class="auth-form__switch">
            {{ isSignUp ? 'Vous avez un compte ?' : 'Pas encore inscrit ?' }}
            <a href="#" @click.prevent="switchMode">
                {{ isSignUp ? 'Se connecter' : 'S\'inscrire' }}
            </a>
        </div>
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

    &__switch {
        text-align: center;
        margin-top: rem(18px);
        font-size: rem(14px);

        a {
            color: #007bff;
            text-decoration: underline;
            cursor: pointer;

            &:hover {
                color: $BlueDarkest;
            }
        }
    }
}
</style>