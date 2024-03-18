<script lang="ts" setup>
    import { useAuthStore } from "@/stores/auth";
    import { reactive } from "vue";
    import { ref } from "vue";

    const authStore = useAuthStore();
    const errorMessage = ref<string>('');
    const errorOccurred = ref<boolean>(false);

    const user = reactive({
        username: null,
        password: null
    });

    async function onSubmit() {
        if(user.username != '' && user.password != ''){          
            try{  
                await authStore.login(user.username, user.password);
                errorMessage.value = '';
                errorOccurred.value = false;
            }catch(error){
                errorMessage.value = (error as Error).message;
                errorOccurred.value = true;
            }
        }

    }
</script>

<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4f46e5" class="mx-auto h-10 w-auto">
                <path fill-rule="evenodd" d="M12 3.75a6.715 6.715 0 00-3.722 1.118.75.75 0 11-.828-1.25 8.25 8.25 0 0112.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 01-1.395-.551A21.69 21.69 0 0018.75 10.5 6.75 6.75 0 0012 3.75zM6.157 5.739a.75.75 0 01.21 1.04A6.715 6.715 0 005.25 10.5c0 1.613-.463 3.12-1.265 4.393a.75.75 0 01-1.27-.8A6.715 6.715 0 003.75 10.5c0-1.68.503-3.246 1.367-4.55a.75.75 0 011.04-.211zM12 7.5a3 3 0 00-3 3c0 3.1-1.176 5.927-3.105 8.056a.75.75 0 11-1.112-1.008A10.459 10.459 0 007.5 10.5a4.5 4.5 0 119 0c0 .547-.022 1.09-.067 1.626a.75.75 0 01-1.495-.123c.041-.495.062-.996.062-1.503a3 3 0 00-3-3zm0 2.25a.75.75 0 01.75.75A15.69 15.69 0 018.97 20.738a.75.75 0 01-1.14-.975A14.19 14.19 0 0011.25 10.5a.75.75 0 01.75-.75zm3.239 5.183a.75.75 0 01.515.927 19.415 19.415 0 01-2.585 5.544.75.75 0 11-1.243-.84 17.912 17.912 0 002.386-5.116.75.75 0 01.927-.515z" clip-rule="evenodd" />
            </svg>
            <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
            <div v-show="errorOccurred" class="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
                <div class="flex">
                    <div class="py-1">
                        <svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
                    </div>
                    <div>                
                        <p class="font-bold">Error message</p>
                        <p class="text-sm">{{errorMessage}}</p>
                    </div>
                </div>
            </div>        
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit.prevent="onSubmit">
                <div>
                    <div class="flex items-center justify-between">
                        <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    </div>
                    <div class="mt-2">
                        <input id="username" name="username" type="text" v-model="user.username" autocomplete="current-username" required class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div class="mt-2">
                        <input id="password" name="password" type="password" v-model="user.password" autocomplete="current-password" required class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div>
                    <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
            </form>
            <p class="text-center text-gray-500 text-xs mt-3">
                &copy;2024 BEOM. All rights reserved.
            </p>            
        </div>
    </div>
</template>