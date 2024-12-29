<script lang="ts" setup>
// Contrôle de l'état du menu burger
const isMenuOpen = ref(false);

// Fonction pour basculer le menu
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};


</script>

<template>
    <header class="header">
        <div class="header__container">
            <!-- Logo -->
            <!-- <div class=header__logo></div> -->

            <button class="header__burger" :class="{ 'header__burger--open': isMenuOpen }" @click="toggleMenu"
                aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav :class="{ 'header__menu--open': isMenuOpen }" class="header__menu">
                <ul class="header__list">
                    <li class="header__item">
                        <NuxtLink class="header__link" to="/app/dashboard">Tableau de bord</NuxtLink>
                    </li>
                    <li class="header__item">
                        <NuxtLink class="header__link" to="/app/dashboard">Mes habitudes</NuxtLink>
                    </li>
                    <li class="header__item">
                        <NuxtLink class="header__link" to="/login">Mon espace</NuxtLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<style lang="scss">
.header {
    background-color: $PrimaryBase;
    box-sizing: border-box;
    box-shadow: 0 0 6px $PrimaryDark;
    position: relative;

    &__container {
        display: flex;
        justify-content: end;
        align-items: center;
        padding: rem(18px) 5%;
        margin: 0 auto;
    }

    &__burger {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: rem(26px);
        height: rem(19px);
        background: none;
        border: none;
        cursor: pointer;
        z-index: 1001;

        @include medium-up {
            display: none;
        }

        span {
            display: block;
            height: 3px;
            width: 100%;
            border-radius: 50px;
            background: $SkyWhite;
            transition: all 0.3s ease;
        }

        &--open span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }

        &--open span:nth-child(2) {
            opacity: 0;
        }

        &--open span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    }

    &__menu {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: rem(80px) rem(20px);
        background-color: $PrimaryDark;
        display: flex;
        flex-direction: column;
        align-items: center;
        opacity: 0;
        visibility: hidden;
        transform: scale(1.1);
        transition: all 0.3s ease;
        z-index: 1000;

        &--open {
            opacity: 1;
            visibility: visible;
            transform: scale(1);
        }

        @include medium-up {
            position: static;
            padding: rem(10px);
            background: none;
            flex-direction: row;
            opacity: 1;
            visibility: visible;
            transform: none;
        }
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: rem(25px);

        @include medium-up {
            flex-direction: row;
            gap: rem(30px);
        }
    }

    &__item {
        font-size: rem(20px);

        @include medium-up {
            font-size: rem(18px);
        }
    }

    &__link {
        text-decoration: none;
        color: white;
        font-weight: 500;
        transition: all 0.3s ease;
        position: relative;

        &:hover {
            text-shadow: 0 0 2px $SkyWhite;
        }

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 0;
            height: 2px;
            background-color: $PrimaryLighter;
            transition: width 0.4s ease-in-out;
        }

        &:hover::after {
            width: 100%;
        }
    }
}
</style>