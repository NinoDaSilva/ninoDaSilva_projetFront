<script lang="ts" setup>
defineProps<{
    name: string,
    disabled?: boolean,
    checked?: boolean,
}>()
</script>

<template>
    <div class="e-radio">
        <input type="radio" :id="name" :name="name" :checked="checked" :disabled="disabled" class="e-radio__input" />
    </div>
</template>

<style lang="scss">
.e-radio {
    display: inline-block;

    &__input {
        appearance: none;
        display: inline-block;
        width: rem(25px);
        height: rem(25px);
        border: 1px solid $SkyBase;
        border-radius: 50px;
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
            transform: translate(-50%, -50%);
            width: 35%;
            height: 35%;
            border-radius: 50px;
            background-color: $SkyWhite;
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