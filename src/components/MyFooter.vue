<script lang="ts" setup>
const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="footer">
        <nav class="footer__nav">
            <ul class="footer-nav__list">
                <li class="footer-nav__item">
                    <RouterLink class="footer-nav__link" to="/">Accueil</RouterLink>
                </li>
                <li class="footer-nav__item">
                    <RouterLink class="footer-nav__link" to="/habits">Mes habitudes</RouterLink>
                </li>
                <li class="footer-nav__item">
                    <RouterLink class="footer-nav__link" to="/about">À propos</RouterLink>
                </li>
                <li class="footer-nav__item">
                    <RouterLink class="footer-nav__link" to="/contact">Contact</RouterLink>
                </li>
            </ul>
        </nav>

        <ul class="footer__social">
            <li class="social__items">
                <RouterLink class="social__link" to="https://instagram.com" target="_blank" aria-label="Instagram">
                </RouterLink>
            </li>
            <li class="social__items">
                <RouterLink class="social__link" to="https://facebook.com" target="_blank" aria-label="Facebook">
                </RouterLink>
            </li>
            <li class="social__items">
                <RouterLink class="social__link" to="https://x.com" target="_blank" aria-label="X">
                </RouterLink>
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
        margin-top: rem(15px);
        color: $SkyLightest;
    }

    &__nav {
        .footer-nav__list {
            display: flex;
            flex-direction: column;
            gap: rem(20px);
            font-size: rem(18px);

            .footer-nav__link {
                text-decoration: none;
                transition: all 0.3s ease;
                color: $SkyWhite;

                &:hover {
                    color: $PrimaryDark;
                }
            }
        }
    }

    &__social {
        display: flex;
        gap: rem(20px);

        &__link {
            color: $InkDark;

            &:hover {
                color: $PrimaryDark;
            }
        }
    }
}
</style>