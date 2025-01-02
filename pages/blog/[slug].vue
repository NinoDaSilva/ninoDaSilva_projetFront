<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const POST_QUERY = groq`*[_type == "post" && slug.current == $slug][0]`;
const route = useRoute();

const { data: post } = await useSanityQuery<SanityDocument>(POST_QUERY, { slug: route.params.slug });

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Le post est introuvable' })
}

const title = post.value.seo && post.value.seo.title ? post.value.seo.title : post.value.title || 'Post';

useSeoMeta({
  title: title ? `${title} | Blog` : 'Blog',
  description: 'Retrouvez nos articles sur vos habitudes !',
  ogTitle: title,
  ogDescription: 'Retrouvez nos articles sur vos habitudes !',
  ogImage: '/'
})
</script>

<template>
  <main v-if="post" class="post border-padding">
    <RouterLink to="/blog" class="post__link">&larr; Voir tous les posts</RouterLink>
    <h1 class="post__title">{{ post.title }}</h1>
    <SanityImage v-if="post.image" class="post__img" :asset-id="post.image.asset._ref" :alt="post.title" />
    <div class="post__content">
      <SanityContent v-bind="{ blocks: post.body }" />
    </div>
  </main>
</template>

<style lang="scss">
.post {
  display: flex;
  flex-direction: column;
  max-width: rem(1200px);
  margin: rem(30px) auto;

  &__link {
    @include medium-up {
      font-size: rem(18px);
    }
  }

  &__img {
    max-width: 100%;
    max-height: rem(500px);
    object-fit: cover;
  }

  &__content {
    margin: rem(10px) auto;
    font-size: rem(15px);

    @include medium-up {
      font-size: rem(18px);
      margin-top: rem(20px);
    }
  }
}
</style>