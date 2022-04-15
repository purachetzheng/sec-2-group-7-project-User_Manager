<script setup></script>

<template>
    <div class="flex flex-col flex-wrap min-h-screen">
        <nav
            class="min-w-full bg-white flex flex-col md:flex-row items-center md:justify-between px-6 py-4 border-b border-b-gray-60 shadow-sm max-w-screen-2xl mx-auto"
        >
            <div class="rounded-lg px-3 py-2 text-slate-700 font-medium hover:bg-slate-100 hover:text-slate-900">
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
    color: rgb(50, 106, 239);
}
</style>
