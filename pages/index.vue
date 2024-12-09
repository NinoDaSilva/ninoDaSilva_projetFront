<script lang="ts" setup>
import type { SanityDocument } from "@sanity/client"
import Hero from "@/components/Hero.vue";

const { data: homepage } = await useSanityQuery<SanityDocument>(groq`*[
_type == "homepage"][0]`);

useSeoMeta({
    title: 'Accueil | Habits app',
    description: 'Configurez, organisez et gérer toutes vos habitudes grâce à notre application !',
    ogTitle: 'Accueil | Habits app',
    ogDescription: 'Configurez, organisez et gérer toutes vos habitudes grâce à notre application !',
    ogImage: '/'
})
</script>

<template>
    <Hero v-if="homepage" :showButton="true" buttonLabel="Get started !" buttonVariant="primary" :title="homepage.hero.title" :text="homepage.hero.text" />
</template>