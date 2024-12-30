<script lang="ts" setup>
import type { SanityDocument } from "@sanity/client"
import Hero from "@/components/Hero.vue";
import FeatureCard from "~/components/FeatureCard.vue";

const { data: homepage } = await useSanityQuery<SanityDocument>(groq`*[
_type == "homepage"][0]`);

// Sanity Image
const { urlFor } = useSanityImage();

const backgroundImgUrl = computed(() =>
    homepage.value?.hero?.backgroundImg ? urlFor(homepage.value.hero.backgroundImg) : "https://placehold.co/600x400"
);

useSeoMeta({
    title: 'Accueil | Habits app',
    description: 'Configurez, organisez et gérer toutes vos habitudes grâce à notre application !',
    ogTitle: 'Accueil | Habits app',
    ogDescription: 'Configurez, organisez et gérer toutes vos habitudes grâce à notre application !',
    ogImage: '/'
})
</script>

<template>
    <div v-if="homepage">
        <Hero v-if="homepage.hero" :showButton="homepage.hero.showButton" :buttonLabel="homepage.hero.buttonLabel"
            buttonVariant="primary" :title="homepage.hero.title" :text="homepage.hero.text"
            :backgroundImg="backgroundImgUrl">
            <template #stats>
                <div class="hero-stats">
                    <ul v-if="homepage.hero.stats" class="hero-stats__list">
                        <li class="hero-stats__item" v-for="stat in homepage.hero.stats" :key="stat">
                            <span class="hero-stats__value">{{ stat.value }}</span>
                            <p class="hero-stats__label">{{ stat.text }}</p>
                        </li>
                    </ul>
                </div>
            </template>
        </Hero>

        <section v-if="homepage.functionality" class="features">
            <h2 class="features__title">{{ homepage.functionality.title }}</h2>
            <p class="features__text">{{ homepage.functionality.text }}</p>
            <ul class="features__list">
                <li v-for="(feature, index) in homepage.functionality.features" :key="index" class="features__item">
                    <FeatureCard :featureIcon="urlFor(feature.icon)" :title="feature.title" :text="feature.description" />
                </li>
            </ul>
        </section>
    </div>
</template>

<style lang="scss">
.hero-stats {
    padding: 5%;
    color: $PrimaryDark;
    font-family: $SecondaryFont;
    max-width: 1000px;
    margin-inline: auto;

    @include medium-up {
        padding: 2%;
    }

    &__list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: center;
        gap: 5%;
        text-align: center;

        @include xsmall-down {
            grid-template-columns: 1fr;
        }
    }

    &__item {
        margin: rem(10px);

        @include small-up {
            margin: rem(10px);
        }
    }

    &__value {
        font-size: rem(25px);
        font-weight: bold;

        @include small-up {
            font-size: rem(35px);
        }
    }

    &__label {
        font-size: rem(14px);
        color: $InkBase;
        margin-top: rem(5px);

        @include small-up {
            font-size: rem(20px);
            margin-top: rem(10px);
        }
    }
}
</style>