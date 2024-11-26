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

<style lang="scss" scoped>
.form-input {
    display: flex;
    flex-direction: column;

    &__label {
        font-size: 14px;
        margin-bottom: 5px;
        color: #555;
    }

    &__input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
        transition: border-color 0.2s ease;

        &:focus {
            outline: none;
            border-color: #007bff;
        }
    }
}
</style>