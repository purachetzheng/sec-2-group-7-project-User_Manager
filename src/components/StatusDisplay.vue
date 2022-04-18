<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount, onMounted } from 'vue';
import CarbonTrashCan from './icons/CarbonTrashCan.vue';
const emits = defineEmits(['selectTag', 'deleteTag', 'createTag']);
const props = defineProps({
    amountRows: {
        type: Number,
        default: 0,
        // require:true
    },
    tags: {
        type: Array,
        default: [1],
    },
});
// setTimeout(() => console.log(props.tags), 1000)
const amountRows = ref(computed(() => props.amountRows));
const amountTags = ref(computed(() => props.tags.length));
const tagList = ref(props.tags)
const newTag = ref({ name: null, color: '#ff0000' });

const creatingTag = () => {
    props.tags.some(el => el.name === newTag.value.name) ? alert('have the same name tag') : emits('createTag', newTag.value)
}
const deletingTag = (tag) => {
    confirm(`Are you sure to delete : ${tag.name} ?`) ? emits('deleteTag', tag.id) : ''
}
</script>

<template>
    <div class="p-4 space-y-2">
        <div class="flex gap-4">
            <div class="flex flex-col">
                <span class="font-bold"> Users </span>
                <span class="text-2xl font-light  "> {{ amountRows }} </span>
            </div>
            <div class="flex flex-col">
                <span class="font-bold"> Tags </span>
                <span class="text-2xl font-light ">
                    {{ amountTags }}
                </span>
            </div>
        </div>
        <div class="border-b border-gray-300"></div>
        <div class="flex flex-col space-y-2">
            <div class="text-left flex mr-2">
                <button class="flex items-center" @click="$emit('selectTag', { id: null, name: 'all' })">
                    <div class="rounded-full p-2 bg-gradient-to-r from-green-400 to-blue-700"></div>
                    <div class="flex px-2 mr-2 hover:underline">
                        All Tags
                    </div>
                </button>
            </div>
            <div class="text-left flex justify-between mr-2" v-for="(tag, index) in tags" :key="index">
                <button class="flex items-center" @click="$emit('selectTag', tag)">
                    <div class="rounded-full p-2" :style="{ 'background-color': tag.color }"></div>
                    <div class="flex px-2 mr-2 hover:underline">{{ tag.name }} : {{ tag.tagMembers.length }}</div>
                </button>
                <!-- delete tag -->
                <button class @click="deletingTag(tag)">
                    <CarbonTrashCan class="my-auto -mr-1 h-4 w-4 text-red-700" />
                </button>
            </div>
        </div>
        <div class="border-b border-gray-300"></div>
        <div class="text-xs text-blue-700 flex items-center">
            <span class="mr-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </span>
            <span>Create New Tags </span>
        </div>
        <div class="flex items-center">
            <div>
                <input
                    class="text-sm placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-l-md py-2 pl-2 pr-3 shadow-sm focus:outline-none"
                    type="text" placeholder="Input New Tag" v-model="newTag.name" @keyup.enter="creatingTag()" />
            </div>
            <div class="p-1 bg-gray-800 rounded-r-md overflow-hidden shadow-sm">
                <input type="color" class="bg-gray-800 scale-[3]" v-model="newTag.color" />
            </div>
        </div>
    </div>
</template>

<style>
</style>
