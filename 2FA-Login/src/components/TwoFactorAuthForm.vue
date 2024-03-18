<script lang="ts" setup>
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#4f46e5" class="mx-auto h-10 w-auto">
        <path fill="#4f46e5" d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/>
      </svg>
      <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Two-factor Authentication
      </h2>
    </div>
    <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
        <div class="flex">
          <div class="py-1">
            <svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/>
            </svg>
          </div>
          <div>
            <p class="font-bold">Error message</p>
            <p class="text-sm"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="w-full max-w-xm">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="authcode">
                Authentication code
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="authcode" type="text"placeholder="XXXXXX"/>
          </div>
          <div class="mb-4 flex items-center justify-between">
            <button class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" type="button">
              Verify
            </button>
          </div>          
          <div class="mb-6 my-6">
            <p class="text-gray-500 text-xs">Open your two-factor authenticator (TOTP) app or browser extension to view your authentication code.</p>
          </div>          
        </form>
        <p class="text-center text-gray-500 text-xs mt-3">
          &copy;2024 BEOM. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>
