<template>
    <div class="dropdown" ref="dropdown" @click="isDropdownOpen = !isDropdownOpen">
        <div class="dropdown-content">
            <div class="dropdown-selected-option">
                {{ dropdownSelectedOption }}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" height="15" width="15" viewBox="0 0 512 512" class="dropdown-icon">
                <path fill="#4f46e5" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
            </svg>
        </div>
    </div>
    <div class="dropdownOptions" ref="dropdownOptions" v-if="isDropdownOpen">
        <div class="option" v-for="(option, index) in props.options" :key="index" @click="toggleOptionSelect(option)">
            {{ option.description || option }}
        </div>
    </div>
</template>

<script setup>
    import {computed, ref, onMounted, onBeforeUnmount, watchEffect} from "vue"

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

    const dropdown = ref(null)

    const dropdownOptions = ref(null)

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
        if (!dropdown.value.contains(element.target)) {
            isDropdownOpen.value = false
        }
    }

    onMounted(() => {
        watchEffect(() => {
            if (dropdown.value && dropdownOptions.value) {
                dropdownOptions.value.style.width = dropdown.value.offsetWidth + 'px';
            }
        });
        window.addEventListener("click", closeDropdown)
    })

    onBeforeUnmount(() => {
        window.removeEventListener("click", closeDropdown)
    })

</script>

<style>
    .dropdown {
        cursor: pointer;
        border: solid 1px #D1D5DB;
        margin: 0 auto;
        border-radius: 8px;
        line-height: 1.5rem;
        font-size: 0.875rem;
        position: relative;
    }

    .dropdownOptions {
        position: absolute;
        background: #FFFFFF;
    }

    .dropdown-content {
        display: flex !important;
        align-items: center;
        padding-left: 5px;        
        padding-right: 5px;
    }

    .dropdown-icon {
        margin-left: auto; /* Align to the right */
        fill: #4f46e5;
        cursor: pointer;
    }

    .dropdown-selected-option {
        border: solid 1 #D1D5DB;
        border-radius: 8px;
        box-sizing: border-box;
        padding: 0.375rem;
        margin-bottom: 4px;
        font-size: 0.875rem;
    }
    .option:hover {
        background: #6366F1;
        color: #FFFFFF;
    }
    .option {
        padding: 0.375rem;
        cursor: pointer;
        border-left: solid 1px #D1D5DB;
        border-right: solid 1px #D1D5DB;
        border-bottom: 0px;
        box-sizing: border-box;
        font-size: 0.875rem;
    }
    .option:first-of-type {
        margin-top: 5px;
        border-top: solid 1px #D1D5DB;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    .option:last-of-type {
        border-bottom: solid 1px #D1D5DB;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
</style>