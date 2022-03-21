<script setup>
defineEmits([])
const prop = defineProps({
    amountUsers: {
        type: String,
        require: true,
    },
})
</script>
 
<template>
    <div class="bg-teal-600 h-16 flex justify-center items-center">
        <h2 class="text-3xl text-white">User Manager</h2>
        <div class="bg-teal-600 text-white absolute right-6">Amount of Users : {{ amountUsers }}</div>
    </div>
</template>