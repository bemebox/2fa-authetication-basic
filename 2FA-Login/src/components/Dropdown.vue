<template>
    <div class="dropdown-wrapper" ref="dropDown">
        <div class="dropdown-selected-option" @click="isDropdownOpen = true">
            {{ dropdownSelectedOption }}
        </div>
    </div>
    <div class="options-wrapper" v-if="isDropdownOpen">
        <div class="option" v-for="(option, index) in props.options" :key="index" @click="toggleOptionSelect(option)">
            {{ option.description || option }}
        </div>
    </div>
</template>

<script setup>
    import {computed, ref, onMounted, onBeforeUnmount} from "vue"

    const props = defineProps({
        options: {
            type: Array,
            required: true
        },
        defaultOptionDescription: {
            type: String,
            required: false
        },
        modelValue: {
            default: null
        }
    })

    const dropDown = ref(null)

    const emit = defineEmits(["update:modelValue"])

    const selectedOption = ref(null)

    const isDropdownOpen = ref(false)

    const dropdownSelectedOption = computed(() => {
        return (selectedOption.value?.description || selectedOption.value) || props.defaultOptionDescription
    })

    const toggleOptionSelect = (option) => {
        selectedOption.value = option
        emit("update:modelValue", option)
        isDropdownOpen.value = false
        
    }

    const closeDropdown = (element) => {
        if (!dropDown.value.contains(element.target)) {
            isDropdownOpen.value = false
        }
    }

    onMounted(() => {
        window.addEventListener("click", closeDropdown)
    })

    onBeforeUnmount(() => {
        window.removeEventListener("click", closeDropdown)
    })

</script>

<style>
    .dropdown-wrapper {
        padding: 16px;
        cursor: pointer;
        border: solid 1px #000000;
        margin: 0 auto;
    }
    .dropdown-selected-option {
        padding: 16px;
        border: solid 1 #000000;
        border-radius: 8px;
        box-sizing: border-box;
        margin-bottom: 4px;
    }
    .option:hover {
        background: #c5c5c5;
    }
    .option {
        padding: 16px;
        cursor: pointer;
        border: solid 1px #000000;
        box-sizing: border-box;
    }
    .option:last-of-type {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
</style>