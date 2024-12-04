<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

useSeoMeta({
    title: 'Blog | Habits app',
    description: 'Retrouvez nos articles sur vos habitudes !',
    ogTitle: 'Blog | Habits app',
    ogDescription: 'Retrouvez nos articles sur vos habitudes !',
    ogImage: '/'
})

const perPage = 2;
const page = ref(1);
function onPageClick(index: number) {
    page.value = index;
}

const paginationStart = computed(() => (page.value - 1) * perPage);
const paginationEnd = computed(() => page.value * perPage);

const filter = ref('');
function onCategoryClick(category: SanityDocument) {
    page.value = 1;
    filter.value = category.slug.current;
}

const { data: categories } = await useSanityQuery<SanityDocument[]>(groq`*[
_type == "category"
&& defined(slug.current)]`);

const { data: totalPosts } = await useSanityQuery<number>(
    groq`count(*[
_type == "post"
&& defined(slug.current)
&& ($filter == '' || $filter in categories[]->slug.current)])`,
    { filter });

const totalPages = computed(() => {
    if (!totalPosts.value) return 0;
    return Math.ceil(totalPosts.value / perPage);
})

const { data: posts } = await useSanityQuery<SanityDocument[]>(
    groq`*[
    _type == "post"
    && defined(slug.current)
    && ($filter == '' || $filter in categories[]->slug.current)
  ]|order(publishedAt desc)[$start...$end]{
    _id, 
    title, 
    slug, 
    image, 
    "categories": categories[]->{ _id, title, slug }, 
    publishedAt
  }`,
    {
        filter,
        start: paginationStart,
        end: paginationEnd,
    }
);
</script>

<template>
    <main>
        <h1>Posts</h1>
        <ul>
            <li v-for="(category, index) in categories" :key="index">
                <button @click="onCategoryClick(category)">{{ category.title }}</button>
            </li>
        </ul>
        <ul v-if="posts && posts.length">
            <li v-for="(post, index) in posts" :key="index">
                <NuxtLink :to="`/blog/` + post.slug.current">
                    <h2>{{ post.title }}</h2>
                </NuxtLink>
                <div v-for="(category, Catindex) in post.categories" :key="Catindex">
                    <div @click="onCategoryClick(category)">
                        <span>{{ category.title }}</span>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else>
            <p>Aucun article</p>
        </div>
        <div>
            <p>Page {{ page }} <span>/ {{ totalPages }}</span></p>
            <div v-if="totalPages > 1">
                <p>Pages :</p>
                <div v-for="n in totalPages" :key="n" @click="onPageClick(n)">{{ n }}</div>
            </div>
        </div>
    </main>
</template>