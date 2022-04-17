<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount, toRefs, toRef, onBeforeUpdate } from 'vue';
import CarbonTrashCan from '../icons/CarbonTrashCan.vue';
const emits = defineEmits(['addTag', 'deleteTagMem']);
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
    tagsList: {
        type: Array,
        default: [],
    }
});
// console.log('$$$$');
// console.log(props.rowTags);
// console.log(props.tagsList);
const addingTag = (e) => {
    const input = e.target.value
    // if(!props.tagsList.some(el => el.name === input)) 
    emits('addTag', input)
}
</script>

<template>
    <td>
        <!-- <span v-for="(row, index) in rows" :key="index">[{{ row.tag.name }}]</span> -->
        <div class="flex space-x-2">
            <div v-for="(tagMember, index) in rowTags" :key="index">
                <span>[{{ tagMember.name }}] </span>
                <button @click="$emit('deleteTagMem', tagMember)">
                    <CarbonTrashCan class="flex-none my-auto -mr-1 h-4 w-4 text-red-700" />
                </button>
            </div>
            <!-- <input type="text" class="bg-gray-300" placeholder="add tag" list="tagname"
                @keyup.enter="addingTag($event)">
            <datalist id="tagname">
                <option v-for="tagMember in tagsList" :value="tagMember.name"></option>
            </datalist> -->
            <select class="bg-gray-100" @change="addingTag($event)">
                <option disabled selected>add tag</option>
                <option v-for="tag in tagsList" :value="tag.name" 
                    v-show="!rowTags.some(rowTag => rowTag.name === tag.name)">{{tag.name}}</option>
            </select>
        </div>


    </td>
</template>
