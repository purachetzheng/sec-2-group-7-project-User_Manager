<script setup>
const props = defineProps({
    date: {
        type: String,
        default: "undefined"
    }
})
</script>
 
<template>
    <div>{{ date }}</div>
</template>