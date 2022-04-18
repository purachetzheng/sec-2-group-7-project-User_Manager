<script setup></script>

<template>
    <div class="flex flex-col flex-wrap min-h-screen">
        <nav
            class="min-w-full bg-gray-800 flex flex-col md:flex-row items-center md:justify-between px-6 py-4 border-b border-b-gray-60 shadow-sm max-w-screen-2xl mx-auto">
            <div class="rounded-lg px-3 py-2 text-gray-400 font-medium hover:text-white">
                <router-link :to="{ name: 'Home' }">Home</router-link>
            </div>
        </nav>
        <div class="flex flex-1 flex-col flex-wrap min-w-full">
            <div class="flex flex-1 bg-white">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style>
.router-link-active {
    color: white;
}
</style>
