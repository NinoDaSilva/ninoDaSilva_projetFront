<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const filter= ref('');

const { data: posts } = await useSanityQuery<SanityDocument[]>(groq`*[
  _type == "post"
  && defined(slug.current)
  && ($filter == '' || $filter in (categories[]->slug.current))
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, "categories": categories[]->{ _id, title, slug }, "category": category->{ title, slug }}`, 
{ filter });

const { data: categories } = await useSanityQuery<SanityDocument[]>(groq`*[
  _type == "category"
  && defined(slug.current)]`);

function onCategoryClick (category: SanityDocument) {
    filter.value = category.slug.current;
}
</script>

<template>
    <main>
        <h1>Posts</h1>
        <ul>
            <li v-for="(category, index) in categories" :key="index">
                <button @click="onCategoryClick(category)">{{ category.title }}</button>
            </li>
        </ul>
        <ul>
            <li v-for="post in posts" :key="post._id">
                <NuxtLink :to="`/blog/` + post.slug.current">
                    <h2>{{ post.title }}</h2>
                </NuxtLink>
                <div v-for="(category, index) in post.categories" :key="index">
                    <div @click="onCategoryClick(category)">
                        <span>{{ category.title }}</span>
                    </div>
                </div>
            </li>
        </ul>
    </main>
</template>