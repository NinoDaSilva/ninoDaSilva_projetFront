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
        : null;

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
        :backgroundImg="backgroundImgUrl" />
</template>