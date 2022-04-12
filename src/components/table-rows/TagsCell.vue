<script setup>
const props = defineProps({
    tags: {
        type: Array,
        default: ["all",2]
    }
})
</script>
 
<template>
    <td>
        <span v-for="(tag, index) in tags" :key="index">[{{ tag }}]</span>
    </td>
</template>