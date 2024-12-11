<script lang="ts" setup>
import type { SanityDocument } from "@sanity/client"
import Hero from "@/components/Hero.vue";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const { data: homepage } = await useSanityQuery<SanityDocument>(groq`*[
_type == "homepage"][0]`);

// Sanity Image
const { projectId, dataset } = useSanity().client.config();

const urlFor = (source: SanityImageSource) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source).url()
        : "https://placehold.co/600x400";

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
    <Hero v-if="homepage" :showButton="homepage.hero.showButton" :buttonLabel="homepage.hero.buttonLabel"
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