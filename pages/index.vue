<script lang="ts" setup>
import type { SanityDocument } from "@sanity/client"

const { data: homepage } = await useSanityQuery<SanityDocument>(groq`*[
_type == "homepage"][0]`);

// Sanity Image
const { urlFor } = useSanityImage();

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

// Carrousel commentaires
const activeIndex = ref(0);

// Fonction pour changer de slide
const changeSlide = (index: number) => {
    activeIndex.value = index;
};
</script>

<template>
    <div v-if="homepage">
        <Hero v-if="homepage.hero" :showButton="homepage.hero.showButton" :buttonLabel="homepage.hero.buttonLabel"
            :link="homepage.hero.buttonLink" buttonVariant="primary" :title="homepage.hero.title" :text="homepage.hero.text"
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

        <section v-if="homepage.functionality" class="features">
            <h2 class="features__title">{{ homepage.functionality.title }}</h2>
            <p class="features__text">{{ homepage.functionality.text }}</p>
            <ul class="features__list">
                <li v-for="(feature, index) in homepage.functionality.features" :key="index" class="features__item">
                    <FeatureCard :featureIcon="urlFor(feature.icon)" :title="feature.title"
                        :text="feature.description" />
                </li>
            </ul>
        </section>

        <section v-if="homepage.pricing" class="pricing">
            <h2 class="pricing__title">{{ homepage.pricing.title }}</h2>
            <p class="pricing__text">{{ homepage.pricing.text }}</p>
            <ul class="pricing__list">
                <li v-for="(price, index) in homepage.pricing.offers" :key="index" class="pricing__item">
                    <PricingCard :title="price.title" :price="price.price" :buttonLabel="homepage.pricing.buttonLabel"
                        :content="price.content" />
                </li>
            </ul>
        </section>

        <section v-if="homepage.client" class="client">
            <h2 class="client__title">{{ homepage.client.title }}</h2>
            <p class="client__text">{{ homepage.client.text }}</p>
            <div class="client__comment">
                <div class="client__carousel">
                    <ul class="client__list" :style="{ transform: `translateX(-${activeIndex * 100}%)` }">
                        <li v-for="(comment, index) in homepage.client.comment" :key="index" class="client__item">
                            <CommentCard :text="comment.text" :name="comment.name" :work="comment.work" />
                        </li>
                    </ul>
                </div>
                <div class="client__pagination">
                    <span v-for="(_, index) in homepage.client.comment" :key="index" class="client__dot"
                        :class="{ 'client__dot--active': index === activeIndex }" @click="changeSlide(index)"></span>
                </div>
            </div>
        </section>
    </div>
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

.client {
    &__comment {
        position: relative;
        overflow: hidden;
        max-width: 800px;
        margin: auto;
    }

    &__carousel {
        overflow: auto hidden;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    &__list {
        display: flex;
        transition: transform 0.5s ease-in-out;
    }

    &__item {
        flex: 0 0 100%;
        justify-content: center;
        align-items: center;
        cursor: grab;
        box-sizing: border-box;
    }

    &__pagination {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
        gap: 0.5rem;
    }

    &__dot {
        width: 10px;
        height: 10px;
        background-color: #ccc;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    &__dot--active {
        background-color: #333;
    }
}
</style>