<script setup>
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
console.log(props.rowTags);
setTimeout(()=> console.log(props.tagsList), 1000)
const addingTag = (e) => {
    const input = e.target.value
    emits('addTag', input)
}
</script>

<template>
    <td>
        <div class="flex space-x-2">
            <div v-for="(tagMember, index) in rowTags" :key="index">
                <span :style="{'background-color': tagMember.color}">[{{ tagMember.name }}] </span>
                <button @click="$emit('deleteTagMem', tagMember)">
                    <CarbonTrashCan class="flex-none my-auto -mr-1 h-4 w-4 text-red-700" />
                </button>
            </div>
            <select class="bg-gray-100" @change="addingTag($event)">
                <option ref="s" disabled selected value="0">add tag</option>
                <option :style="{'background-color': tag.color}" v-for="tag in tagsList" :value="tag.name" 
                    v-show="!rowTags.some(rowTag => rowTag.name === tag.name)">{{tag.name}}</option>
            </select>
        </div>


    </td>
</template>
