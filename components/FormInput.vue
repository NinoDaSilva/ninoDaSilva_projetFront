<script lang="ts" setup>
defineProps<{
    label: string,
    type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url',
    name: string,
    placeholder: string,
    disabled?: boolean,
    required?: boolean,
    modelValue: string | number,
}>();

// Émet l'événement pour mettre à jour la valeur
const emit = defineEmits(['update:modelValue']);
</script>

<template>
    <div class="form-input">
        <label :for="name" class="form-input__label">{{ label }}</label>
        <input :id="name" :type="type" :name="name" :placeholder="placeholder" :required="required" :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" :class="{
            'form-input__input': true,
            '-disabled': disabled,
        }">
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
        transition: all 0.2s ease;

        &:hover,
        &:focus {
            border-color: $PrimaryBase;
            outline: 1px solid $PrimaryBase;
        }

        &:placeholder {
            color: $InkLighter;
        }

        &.-error {
            border-color: $RedBase;
            outline: 1px solid $RedBase;

            &:focus {
                border-color: $PrimaryBase;
                outline: 1px solid $PrimaryBase;
            }
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