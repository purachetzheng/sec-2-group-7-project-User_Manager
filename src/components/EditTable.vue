<script setup>
import { computed } from 'vue'
defineEmits(['createTable'])
const props = defineProps({
    table: {
        type: Object,
        default: {}
    }
})

const newTable = computed(()=> {
    return {id: props.table.id, tableName: props.table.tableName}
})
</script>
 
<template>
<div>
    <div>
        <label>Table Name: </label>
        <input id = "tableNameText" type="text" v-model="newTable.tableName">
    </div>
    <div>
        <button @click="$emit('createTable', newTable.tableName)">
            Create
        </button>
    </div>
</div>
</template>
 
<style>

</style>