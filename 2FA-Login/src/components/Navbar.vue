<script lang="ts" setup>
    import { useRouter } from "vue-router";

    const router = useRouter();

    function onHome() {
        router.push('/')
    }

    function onSignIn() {
        router.push('/login')
    }

    function onLogout() {

    }

    function onCreateAccount() {
        router.push('/register')
    }

</script>

<template>
    <div class="md:flex md:items-center md:justify-between mt-4">
        <div class="min-w-0 flex-1">
            <h2 @click="onHome" class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                <a href="#" @click="onHome">2FA Auth Demo</a></h2>
        </div>
        <div class="mt-5 flex md:ml-4 md:mt-0">
            <span class="hidden sm:block">
                <button type="button" @click="onSignIn" class="inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:text-gray-300">
                    Sign In
                </button>
            </span>
            <span class="hidden sm:block">
                <button type="button" @click="onLogout" class="inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:text-gray-300">
                    Logout
                </button>
            </span>
            <span class="sm:ml-3">
                <button type="button" @click="onCreateAccount" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Create Account
                </button>
            </span>
        </div>
    </div>
</template>