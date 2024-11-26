<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
    label: String,
    type: {
        type: String,
        default: 'text',
    },
    name: String,
    placeholder: String,
});
</script>

<template>
    <div class="form-input">
        <label :for="name" class="form-input__label">{{ label }}</label>
        <input :id="name" :type="type" :name="name" :placeholder="placeholder" class="form-input__input" />
    </div>
</template>

<style lang="scss">
.form-input {
    display: flex;
    flex-direction: column;

    &__label {
        font-size: rem(14px);
        margin-bottom: rem(5px);
        color: $InkLighter;
    }

    &__input {
        background-color: $SkyWhite;
        padding: rem(16px);
        border: 1px solid $SkyLight;
        color: $InkDarkest;
        max-width: 100%;
        height: auto;
        border-radius: 8px;

        &:hover,
        &:focus {
            border-color: $PrimaryBase;
            outline: 1px solid $PrimaryBase;
        }

        &:placeholder {
            color: $InkLighter;
        }

        &.-error {
            outline: 2px solid $RedBase;
        }

        &.-disable {
            background-color: $SkyLightest;
            border-color: $SkyLighter;
            color: $SkyBase;
            cursor: not-allowed;
        }
    }
}
</style>