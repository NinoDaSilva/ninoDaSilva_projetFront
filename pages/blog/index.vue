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
    <main class="blog border-padding">
        <h1 class="blog__title">Posts</h1>
        <ul class="blog__list--categories">
            <li v-for="(category, index) in categories" :key="index" class="blog__item--category">
                <button @click="onCategoryClick(category)" class="blog__category-btn">{{ category.title }}</button>
            </li>
        </ul>
        <ul v-if="posts && posts.length" class="blog__list--posts">
            <li v-for="(post, index) in posts" :key="index" class="blog__post">
                <NuxtLink :to="`/blog/` + post.slug.current" class="blog__title--post">
                    <h2>{{ post.title }}</h2>
                </NuxtLink>
                <ul v-for="(category, Catindex) in post.categories" :key="Catindex" class="blog__list--post-category">
                    <li @click="onCategoryClick(category)" class="blog__item--post-category">
                        <span>{{ category.title }}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div v-else class="blog__message">
            <p>Aucun article</p>
        </div>
        <div class="blog__footer">
            <div v-if="totalPages > 1" class="blog__pagination-container">
                <p class="blog__pagination-label">Pages :</p>
                <div v-for="n in totalPages" :key="n" @click="onPageClick(n)" class="blog__pagination-controls">{{ n }}
                </div>
            </div>
            <p class="blog__pagination-info">{{ page }}<span>/{{ totalPages }}</span></p>
        </div>
    </main>
</template>

<style lang="scss">
.blog {
    @include medium-up {
        margin-top: rem(40px);
    }

    &__title {
        color: $PrimaryBase;

        &--post {
            color: $PrimaryDark;
            transition: all 0.3s ease;
            font-size: rem(13px);

            @include medium-up {
                font-size: rem(16px);
            }

            &:hover,
            &:focus {
                color: $BlueDarkest;
            }
        }
    }

    &__list {
        &--posts {
            display: grid;
            gap: rem(10px);
            margin: rem(10px) 0;
        }

        &--post-category {
            margin-top: rem(10px);
        }
    }

    &__post {
        border-bottom: solid 2px $SkyLight;
        padding: rem(15px);
    }

    &__item {
        &--post-category {
            font-size: rem(14px);
            color: $InkDarker;
            transition: all 0.3s ease;

            @include medium-up {
                font-size: rem(16px);
            }

            &:hover {
                color: $BlueDarkest;
                cursor: pointer;
            }
        }
    }

    &__category-btn {
        background: none;
        border: solid 1px $PrimaryDark;
        border-radius: 50px;
        padding: rem(6px) rem(10px);
        font-size: rem(15px);
        color: $PrimaryDark;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover, &:focus {
            color: $SkyWhite;
            background-color: $PrimaryBase;
        }
    }

    &__footer {
        position: absolute;
        display: flex;
        flex-direction: column;
        bottom: 3%;
        left: 5%;
        right: 5%;
    }

    &__pagination-info {
        font-size: rem(14px);
        text-align: center;
        color: $InkLight;
    }

    &__pagination-container {
        display: flex;
        gap: rem(10px);
        margin-bottom: rem(10px);
    }

    &__pagination-controls {
        color: $BlueDarkest;
        cursor: pointer;

        &:focus {
            color: $PrimaryBase;
        }
    }

    &__pagination-label {
        color: $InkDarker;
    }
}
</style>