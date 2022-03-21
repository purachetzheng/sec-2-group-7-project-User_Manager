<script setup>
const props = defineProps({
    email: {
        type: String,
        default: "undefined"
    }
})
</script>
 
<template>
    <div>{{ email }}</div>
</template>