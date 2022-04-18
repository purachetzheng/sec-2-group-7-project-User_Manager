<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount, onMounted } from 'vue';
import CarbonTrashCan from './icons/CarbonTrashCan.vue';
defineEmits(['selectTag', 'deleteTag', 'createTag']);
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

const newTag = ref({ name: null, color: '#ff0000' });
</script>

<template>
    <div class="p-4 space-y-2">
        <div class="flex gap-4">
            <div class="flex flex-col bg-rose-400">
                <span class="font-bold"> Users </span>
                <span class="text-2xl font-light"> {{ amountRows }} </span>
            </div>
            <div class="flex flex-col bg-sky-400">
                <span class="font-bold"> Tags </span>
                <span class="text-2xl font-light">
                    {{ amountTags }}
                </span>
            </div>
        </div>
        <div class="flex flex-col space-y-2">
            <button class="bg-gray-200 text-left" @click="$emit('selectTag', { id: null, name: 'all' })">
                All Tags
            </button>
            <div class="text-left flex justify-between mr-2" v-for="(tag, index) in tags" :key="index">
                <button class="flex items-center" @click="$emit('selectTag', tag)">
                    <div class="rounded-full p-2" :style="{ 'background-color': tag.color }"></div>
                    <div class="flex px-2 mr-2">{{ tag.name }} : {{ tag.tagMembers.length }}</div>
                </button>
                <button class @click="$emit('deleteTag', tag.id)">
                    <CarbonTrashCan class="my-auto -mr-1 h-4 w-4 text-red-700" />
                </button>
            </div>
            <div class="flex items-center">
                <input class="bg-gray-200 p-1" type="text" placeholder="Input New Tag" v-model="newTag.name"
                    @keyup.enter="$emit('createTag', newTag)" />
                <input type="color" v-model="newTag.color" />
            </div>
        </div>
    </div>
</template>

<style>
</style>
