<script setup lang="ts">
import type { SanityDocument } from "@sanity/client";

const filter = ref('');
const page = ref(1);
const perPage = 2;

const paginationStart = computed(() => {
    return (page.value - 1) * perPage
});
const paginationEnd = computed(() => {
    return (page.value - 1) * perPage
});

const { data: posts } = await useSanityQuery<SanityDocument[]>(groq`*[
    _type == "post"
    && defined(slug.current)
    && ($filter == '' || $filter in (categories[]->slug.current))
]|order(publishedAt desc)[0...12]{
    _id, 
    title, 
    slug, 
    publishedAt, 
    "categories": categories[]->{ _id, title, slug }, 
    "category": category->{ title, slug }}`,
    {
        filter,
        start: paginationStart,
        end: paginationEnd
    });

const { data: categories } = await useSanityQuery<SanityDocument[]>(groq`*[
    _type == "category"
    && defined(slug.current)]`);

const { data: totalPosts } = await useSanityQuery<number>(groq`count(*[
    _type == "category"
    && defined(slug.current)
    && ($filter == '' || $filter in (categories[]->slug.current))])`,
    { filter: filter });

const totalPages = computed(() => {
    if (!totalPosts.value) {
        return 0
    } else {
        return Math.ceil(totalPosts.value / perPage)
    }
})


function onCategoryClick(category: SanityDocument) {
    filter.value = category.slug.current;
};

function onPageClick(index: number) {
    page.value = index;
};
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
    <div>
        <p>Page {{ page }} <span>/ {{ totalPages }}</span></p>
        <div v-if="totalPages > 1">
            <p>Pages :</p>
            <div v-for="n in totalPages" :key="n" @click="onPageClick(n)">{{ n }}</div>
        </div>
    </div>
</template>