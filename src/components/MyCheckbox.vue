<script lang="ts" setup>
defineProps<{
    name: string,
    disabled?: boolean,
    checked?: boolean,
}>()
</script>

<template>
    <div class="e-checkbox">
        <input type="checkbox" :name="name" :id="name" :disabled="disabled" :checked="checked" :class="{
            'e-checkbox__input': true,
            '-disable': disabled,
        }" />
    </div>
</template>

<style lang="scss">
.e-checkbox {
    display: inline-block;

    &__input {
        appearance: none;
        display: inline-block;
        width: rem(20px);
        height: rem(20px);
        border: 1px solid $SkyBase;
        border-radius: 4px;
        background-color: transparent;
        position: relative;
        cursor: pointer;
        transition: all 0.2s ease;
        padding: rem(10px);

        &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-55%, -65%) rotate(45deg);
            width: calc(rem(18px) * 0.25);
            height: calc(rem(18px) * 0.5);
            border: solid transparent;
            border-width: 0 2px 2px 0;
        }

        &:checked {
            background-color: $PrimaryBase;
            border-color: $PrimaryBase;

            &::after {
                border-color: $SkyWhite;
            }
        }

        &:hover {
            border-color: $PrimaryBase;
        }

        &:disabled {
            cursor: not-allowed;
            border-color: $SkyLight;

            &:checked {
                background-color: $SkyLight;

                &::after {
                    border-color: $SkyLighter;
                }
            }
        }
    }
}
</style>