<script lang="ts" setup>
import { ref } from "vue";

// Simule l'utilisateur connecté
const user = ref({
    isLoggedIn: true,
    name: "John Doe",
});
//
</script>

<template>
    <header class="header">
        <div class="header__welcome">
            <p>Bonjour <span v-if="user.isLoggedIn">{{ user.name }}</span></p>
        </div>

        <nav class="header__menu">
            <ul class="menu__list">
                <li class="menu__item"><a class="menu__link" href="/">Accueil</a></li>
                <li class="menu__item"><a class="menu__link" href="/habits">Mes habitudes</a></li>
                <li class="menu__item"><a class="menu__link" href="/new-habit">Nouvelle habitude</a></li>
            </ul>
        </nav>
    </header>
</template>

<style lang="scss">
.header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: rem(5px) rem(20px);
    background-color: $SkyWhite;
    font-size: rem(20px);

    @include large-up() {
        padding: rem(10px) rem(50px);
    }

    &__welcome {
        font-weight: bold;

        @include medium-up() {
            font-size: rem(25px);
        }

        span {
            color: $PrimaryDark;
        }
    }

    &__menu {
        display: none;

        @include medium-up() {
            display: block;
        }

        .menu__list {
            display: flex;
            gap: rem(30px);
            list-style: none;

            .menu__link {
                text-decoration: none;
                color: $InkDarker;
                transition: all 0.2s ease;

                &:hover {
                    color: $PrimaryDark;
                }
            }
        }
    }
}
</style>