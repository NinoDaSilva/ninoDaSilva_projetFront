<script setup lang="ts">
const { data: habitsData, refresh } = await useAsyncData('dashboard', async () => {
    const result = await useTrackingApi('/dashboard', { method: 'GET' });
    return JSON.parse(JSON.stringify(result));
});

defineProps<{
    type: string,
}>();

// Requêtes
const isEditing = ref(false);
const currentHabit = ref<{ id: number; title: string; description: string } | null>(null);

const onEdit = (habit: { id: number; title: string; description: string }) => {
    isEditing.value = true;
    currentHabit.value = { ...habit }; //Pré-remplit le formulaire avec les données de l'habitude
};

const onDelete = async (habitId: number) => {
    try {
        const response = await useTrackingApi(`/habits/${habitId}`, {
            method: "DELETE",
        });

        if (response.error) throw new Error(response.error.message);
        refresh();
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
    }
};

const onHabitUpdate = () => {
    refresh();
    isEditing.value = false;
}

const toggleSelected = (item: { selected: boolean; }) => {
    item.selected = !item.selected;
};
</script>

<template>
    <div class="habits-card">
        <ul v-if="habitsData[type]" class="habits-card__list">
            <li v-for="item in habitsData[type]" :key="item.id" class="habits-card__item"
                @mouseover="item.hovered = true" @mouseleave="item.hovered = false" @click="toggleSelected(item)">
                <div class="habits-card__content">
                    <p class="habits-card__title">{{ item.title }}</p>
                    <p class="habits-card__description">{{ item.description }}</p>
                </div>

                <div v-if="item.hovered || item.selected" class="habits-card__actions">
                    <button class="habits-card__btn habits-card__btn--edit" @click="onEdit(item)">
                        <PensilIcon />
                    </button>
                    <button class="habits-card__btn habits-card__btn--delete" @click="onDelete(item.id)">
                        <TrashIcon />
                    </button>
                </div>
            </li>
        </ul>

        <p v-else class="habits-card__info">Aucune habitude enregistrée</p>

        <UpdateHabitsForm v-if="isEditing && currentHabit" :habit="currentHabit" @habit:update="onHabitUpdate"
            @form:cancel="isEditing = false" />
    </div>
</template>

<style lang="scss">
.habits-card {
    display: flex;
    flex-direction: column;
    padding: 2%;
    padding-bottom: rem(50px);
    max-width: rem(650px);

    &__list {
        display: grid;
        gap: rem(12px);
    }

    &__item {
        background-color: $PrimaryLightest;
        color: $PrimaryDark;
        padding: rem(20px);
        border-radius: 5px;
        box-shadow: 1px 2px 4px $PrimaryLighter;
        transition: all 0.3s ease;
        position: relative;

        &:hover {
            transform: scale(1.05);
            box-shadow: 1px 3px 5px $PrimaryLighter;
            cursor: pointer;

            .habits-card__actions {
                opacity: 1;
                visibility: visible;
            }
        }

        &--selected {
            box-shadow: 1px 3px 8px $PrimaryDark;

            .habits-card__actions {
                opacity: 1;
                visibility: visible;
            }
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
    }

    &__actions {
        position: absolute;
        top: rem(10px);
        right: rem(10px);
        display: flex;
        gap: rem(2px);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;

        @include medium-up {
            gap: rem(6px);
        }
    }

    &__btn {
        background-color: transparent;
        padding: rem(5px);
        cursor: pointer;
        border-radius: rem(5px);
        transition: background-color 0.3s ease;
        border: solid 1px $PrimaryLighter;
        transform: scale(0.85, 0.8);

        @include medium-up {
            transform: scale(0.95, 0.9);
        }

        &:hover {
            background-color: $PrimaryLighter;
        }

        &--edit {
            color: $PrimaryDark;
        }

        &--delete {
            color: $RedBase;
        }
    }

    &__title {
        font-weight: 600;
        font-size: rem(16px);
    }

    &__description {
        font-size: rem(14px);
        margin-top: rem(6px);
    }
}
</style>