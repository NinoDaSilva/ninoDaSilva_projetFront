<script lang="ts" setup>
</script>

<template>
    <main class="page-404">
        <div class="page-404__container">
            <p class="page-404__status">404</p>
            <h1 class="page-404__title">Page non trouvée !</h1>
            <p class="page-404__text">Désolé, la page que vous recherchez n'a pas été trouvée</p>
            <div class="page-404__actions">
                <NuxtLink to="/" class="page-404__primary-link">Retour à l'accueil</NuxtLink>
                <NuxtLink to="/app/dashboard" class="page-404__secondary-link">Tableau de bord <span
                        aria-hidden="true">&rarr;</span></NuxtLink>
            </div>
        </div>
    </main>
</template>

<style lang="scss">
.page-404 {
    display: grid;
    min-height: calc(100vh - 55px - 298px) ;
    place-items: center;

    &__container {
        text-align: center;
    }

    &__status {
        font-size: 5rem;
        font-weight: bold;
        color: $PrimaryBase;
    }

    &__title {
        margin-top: 1rem;
        font-size: 2.25rem;
        font-weight: 600;
        letter-spacing: -0.02em;
        color: #111827;

        @include medium-up {
            font-size: 4.5rem;
        }
    }

    &__text {
        margin-top: 1.5rem;
        font-size: 1.125rem;
        font-weight: 500;
        color: #6b7280;
    }

    &__actions {
        margin-top: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1.5rem;
    }

    &__primary-link {
        display: inline-block;
        padding: 0.625rem 1.375rem;
        font-size: 0.875rem;
        font-weight: 600;
        color: $SkyWhite;
        background-color: $PrimaryDark;
        border-radius: 0.375rem;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
        text-align: center;
        transition: background-color 0.2s;

        &:hover {
            background-color: $PrimaryBase;
        }

        &:focus-visible {
            outline: 2px solid $PrimaryBase;
            outline-offset: 2px;
        }
    }

    &__secondary-link {
        font-size: 0.875rem;
        font-weight: 600;
        color: #111827;
        text-decoration: none;

        span {
            display: inline-block;
            margin-left: 0.25rem;
        }
    }
}
</style>