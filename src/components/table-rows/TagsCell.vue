<script setup>
import CarbonTrashCan from '../icons/CarbonTrashCan.vue';
const emits = defineEmits(['addTagMem', 'deleteTagMem']);
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
const addingTagMem = (e) => {
    const input = e.target.value
    emits('addTagMem', input)
}
const deletingTagMem = (tagMember) => {
    emits('deleteTagMem', tagMember)
}
</script>

<template>
    <td>
        <div class="flex flex-wrap space-x-2">
            <div v-for="(tagMember, index) in rowTags" :key="index">
                <span class="px-2 text-black" :style="{'background-color': tagMember.color}">{{ tagMember.name }} </span>
                <button @click="deletingTagMem(tagMember)">
                    <CarbonTrashCan class="flex-none my-auto -mr-1 h-4 w-4 text-red-700" />
                </button>
            </div>
            <select class="bg-gray-100" @change="addingTagMem($event)">
                <option ref="s" disabled selected value="0">add tag</option>
                <option :style="{'background-color': tag.color}" v-for="tag in tagsList" :value="tag.name" 
                    v-show="!rowTags.some(rowTag => rowTag.name === tag.name)">{{tag.name}}</option>
            </select>
        </div>


    </td>
</template>
