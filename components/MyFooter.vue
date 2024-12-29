<script lang="ts" setup>
import FacebookIcon from './icons/FacebookIcon.vue';
import InstagramIcon from './icons/InstagramIcon.vue';
import TiktokIcon from './icons/TiktokIcon.vue';

const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="footer">
        <nav class="footer__nav">
            <ul class="footer__nav-list">
                <li class="footer-nav__item">
                    <NuxtLink class="footer__nav-link" to="/">Accueil</NuxtLink>
                </li>
                <li class="footer__nav-item">
                    <NuxtLink class="footer__nav-link" to="/app/dashboard">Mes habitudes</NuxtLink>
                </li>
                <li class="footer-nav__item">
                    <NuxtLink class="footer__nav-link" to="/blog">Blog</NuxtLink>
                </li>
            </ul>
        </nav>

        <ul class="footer__social">
            <li class="footer__social-item">
                <NuxtLink class="social__link" to="https://instagram.com" target="_blank" aria-label="Instagram">
                    <InstagramIcon />
                </NuxtLink>
            </li>
            <li class="footer__social-item">
                <NuxtLink class="social__link" to="https://facebook.com" target="_blank" aria-label="Facebook">
                    <FacebookIcon />
                </NuxtLink>
            </li>
            <li class="footer__social-item">
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
    padding: rem(30px) rem(30px) rem(20px);
    background-color: $PrimaryBase;
    color: $SkyWhite;

    &__nav {
        margin-bottom: rem(40px);

        &-list {
            display: flex;
            flex-wrap: wrap;
            gap: rem(40px);
            font-size: rem(18px);
            justify-content: center;

            @include small-down {
                flex-direction: column;
                gap: rem(25px);
                font-size: rem(16px);
            }
        }

        &-link {
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

    &__social {
        display: flex;
        gap: rem(35px);

        &-item {
            width: rem(30px);
            height: rem(30px);
            transition: all 0.3s ease;
            opacity: 0.9;

            &:hover {
                transform: scale(1.05);
                opacity: 1;
            }
        }
    }

    &__credit {
        font-size: rem(11px);
        margin-top: rem(60px);
        color: $SkyLightest;

        @include small-up {
            font-size: rem(14px);
        }
    }
}
</style>