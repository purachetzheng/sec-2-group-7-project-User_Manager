<script setup>
const props = defineProps({
    tags: {
        type: Array,
        default: "undefined"
    }
})
</script>
 
<template>
    <div>
        <span v-for="(tag, index) in tags" :key="index">[{{ tag }}]</span>
    </div>
</template>