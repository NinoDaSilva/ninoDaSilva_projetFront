<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const POSTS_QUERY = groq`*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const { data: posts } = await useSanityQuery<SanityDocument[]>(POSTS_QUERY);
</script>

<template>
    <main>
        <h1>Posts</h1>
        <ul>
            <li v-for="post in posts" :key="post._id">
                <NuxtLink :to="`/blog/` + post.slug.current">
                    <h2>{{ post.title }}</h2>
                    <div v-if="post.image">
                        <img :src="urlFor(post.image).url()" alt="img">
                    </div>
                </NuxtLink>
            </li>
        </ul>
    </main>
</template>