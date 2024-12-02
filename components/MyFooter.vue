<script lang="ts" setup>
import FacebookIcon from './icons/FacebookIcon.vue';
import InstagramIcon from './icons/InstagramIcon.vue';
import TiktokIcon from './icons/TiktokIcon.vue';

const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="footer">
        <nav class="footer__nav">
            <ul class="footer-nav__list">
                <li class="footer-nav__item">
                    <NuxtLink class="footer-nav__link" to="/">Accueil</NuxtLink>
                </li>
                <li class="footer-nav__item">
                    <NuxtLink class="footer-nav__link" to="/habits">Mes habitudes</NuxtLink>
                </li>
                <li class="footer-nav__item">
                    <NuxtLink class="footer-nav__link" to="/about">À propos</NuxtLink>
                </li>
                <li class="footer-nav__item">
                    <NuxtLink class="footer-nav__link" to="/contact">Contact</NuxtLink>
                </li>
            </ul>
        </nav>

        <ul class="footer__social">
            <li class="social__items">
                <NuxtLink class="social__link" to="https://instagram.com" target="_blank" aria-label="Instagram">
                    <InstagramIcon />
                </NuxtLink>
            </li>
            <li class="social__items">
                <NuxtLink class="social__link" to="https://facebook.com" target="_blank" aria-label="Facebook">
                    <FacebookIcon />
                </NuxtLink>
            </li>
            <li class="social__items">
                <NuxtLink class="social__link" to="https://tiktok.com" target="_blank" aria-label="TikTok">
                    <TiktokIcon />
                </NuxtLink>
            </li>
        </ul>

        <div class="footer__credit">
            <p>&copy;{{ currentYear }} Quotidien. Tous droits réservés.</p>
        </div>
    </footer>
</template>

<style lang="scss">
.footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: rem(30px) rem(20px) rem(20px) rem(20px);
    background-color: $PrimaryLight;
    color: $SkyWhite;

    &__credit {
        font-size: rem(13px);
        margin-top: rem(35px);
        color: $SkyLightest;
    }

    &__nav {
        margin-bottom: rem(15px);

        .footer-nav__list {
            display: flex;
            flex-wrap: wrap;
            gap: rem(15px);
            font-size: rem(18px);
            justify-content: center;

            .footer-nav__link {
                text-decoration: none;
                transition: all 0.3s ease;
                color: $SkyWhite;
                margin-inline: rem(20px);

                &:hover {
                    color: $PrimaryDark;
                }
            }
        }
    }

    &__social {
        display: flex;
        gap: rem(25px);

        .social__items {
            width: rem(30px);
            height: rem(30px);
        }

        &__link {
            color: $InkDark;

            &:hover {
                color: $PrimaryDark;
            }
        }
    }
}
</style>