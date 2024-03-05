<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col min-h-screen container mx-auto">
    <main class="p-8">
      <RouterView />
    </main>
  </div>
</template>
