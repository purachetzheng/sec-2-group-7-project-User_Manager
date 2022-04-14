<script setup>
const props = defineProps({
    date: {
        type: String,
        default: 'undefined',
    },
});
</script>

<template>
    <td>{{ date }}</td>
</template>
