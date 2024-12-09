<script lang="ts" setup>
defineProps<{
    label?: string,
    variant?: "primary" | "outline";
    disabled?: boolean;
}>();
</script>

<template>
    <button
:class="{
        'e-button': true,
        '-outline': variant === 'outline',
        '-disabled': disabled,
    }">
        {{ label }}
    </button>
</template>

<style lang="scss">
.e-button {
    background: $PrimaryBase;
    color: $SkyWhite;
    padding: rem(16px) rem(32px);
    border-radius: rem(48px);
    border: 1px solid $PrimaryBase;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        background: $PrimaryDark;
    }

    &.-outline {
        background: transparent;
        color: $PrimaryBase;

        &:hover {
            color: $PrimaryDark;
            border-color: $PrimaryDark;
        }

        &.-disabled {
            background: transparent;
            color: $SkyBase;
            border-color: $SkyBase;
        }
    }

    &.-disabled {
        background: $SkyLight;
        border-color: $SkyLight;
        color: $SkyDark;
        cursor: not-allowed;
    }

    &.-small {
        padding: rem(8px) rem(16px);
    }

    @include small-down() {
        padding: rem(8px) rem(16px);
    }
}
</style>