<script setup lang="ts">
import { errorMessages } from 'vue/compiler-sfc';
import Cbutton from './Cbutton.vue';

defineProps<{
    isSignUp: boolean,
}>();
const isSignUp = ref(true);
// Fonction pour basculer entre les deux états
const switchMode = () => {
    isSignUp.value = !isSignUp.value;

    // Redirection vers la bonne page
    const targetRoute = isSignUp.value ? '/register' : '/login';
    router.push(targetRoute);
};

// Gestion de l'envoie
const username = ref('');
const password = ref('');
const email = ref('');
const error = ref('');

const router = useRouter();

async function onSubmit(event: Event) {
    event.preventDefault();

    try {
        const route = isSignUp.value ? '/auth/register' : '/auth/login';

        const response = await fetch(`http://localhost:4000/${route}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })

        if (!response.ok) throw new Error('Une erreur est survenue')
        // On récupère la partie json de la réponse
        const data = await response.json()
        // On stocke le token dans un cookie
        const cookieJwt = useCookie('api_tracking_jwt')
        cookieJwt.value = data.token

        await router.push('/app/dashboard')
    } catch (err) {
        error.value = "Une erreur est survenue"
    }
}
</script>

<template>
    <div class="auth-form">
        <h1 class="auth-form__title">{{ isSignUp ? 'Inscription' : 'Connexion' }}</h1>
        <form class="auth-form__form" @submit="onSubmit">
            <FormInput label="Nom d'utilisateur" type="text" name="username" v-model="username"
                placeholder="Entrez votre nom d'utilisateur" />
            <FormInput v-if="isSignUp" label="Adresse email" type="email" name="email" v-model="email"
                placeholder="Entrez votre email" />
            <FormInput label="Mot de passe" type="password" name="password" v-model="password"
                placeholder="Entrez votre mot de passe" />
            <FormInput v-if="isSignUp" label="Confirmer le mot de passe" type="password" name="confirmPassword"
                v-model="password" placeholder="Confirmez votre mot de passe" />

            <Cbutton :label="isSignUp ? 'S\'inscrire' : 'Se connecter'" variant="primary" class="auth-form__submit" />
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