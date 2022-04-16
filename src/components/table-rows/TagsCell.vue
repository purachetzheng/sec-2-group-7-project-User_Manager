<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount, toRefs, toRef, onBeforeUpdate } from 'vue';
const props = defineProps({
    rowTags: {
        type: Array,
        default: ['all', 2],
    },
    rowId: {
        type: Number,
        require: true,
    },
    tableId: {
        type: String,
        require: true,
    },
    tagsList:{
        type: Array,
        default: [],
    }
});

</script>

<template>
    <td>
        <!-- <span v-for="(row, index) in rows" :key="index">[{{ row.tag.name }}]</span> -->
        <span v-for="(tag, index) in rowTags" :key="index">[{{ tag.name }}]</span>
        <input type="text" class="bg-gray-300" placeholder="add tag" list="tagname">
            <datalist id="tagname">
                <option v-for="tag in tagsList" :value="tag.name"></option>
            </datalist>
    </td>
</template>
