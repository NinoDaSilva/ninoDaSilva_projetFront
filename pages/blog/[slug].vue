<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const route = useRoute();

const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, { slug: route.params.slug });

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Le post est introuvable'})
}

useSeoMeta({
    title: `${post.value.title} | Blog`,
    description: 'Retrouvez nos articles sur vos habitudes !',
    ogTitle: post.value.title,
    ogDescription: 'Retrouvez nos articles sur vos habitudes !',
    ogImage: '/'
})
</script>

<template>
  <main v-if="post" class="post">
    <RouterLink to="/blog" class="post__link">&larr; Back to posts</RouterLink>
    <SanityImage v-if="post.image" class="post__img" :asset-id="post.image.asset._ref" :alt="post.title"/>
    <h1 class="post__title">{{ post.title }}</h1>
    <SanityContent class="post__content" v-bind="{ blocks: post.body }" />
  </main>
</template>

<style lang="scss">
.post {
  &__img {
    max-width: 100%;
    height: auto;
  }
}
</style>