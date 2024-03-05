<script setup lang="ts">
    import { RouterLink, RouterView } from 'vue-router'
    import Navbar from '@/components/Navbar.vue'
</script>

<template>
    <div class="flex flex-col min-h-screen container mx-auto">
        <header>
            <nav>
                <Navbar />
            </nav>
        </header>
        <main class="p-8">
            <RouterView />
        </main>        
    </div>
</template>

