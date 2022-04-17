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
    tags:{
        type: Array,
        default: [1],
    }
});
// setTimeout(() => console.log(props.tags), 1000)
const amountRows = ref(computed(() => props.amountRows))
const amountTags = ref(computed(() => props.tags.length))

</script>

<template>
    <div class="bg-white p-4 space-y-2 w-1/4">
        <div class="flex gap-4">
            <div class="flex flex-col">
                <span class="font-bold"> Users </span>
                <span class="text-2xl font-light"> {{ amountRows }} </span>
            </div>
            <div class="flex flex-col">
                <span class="font-bold"> Tags </span>
                <span class="text-2xl font-light">
                    {{ amountTags }}
                </span>
            </div>
        </div>
        <div class="flex flex-col space-y-2">
            <button class="bg-gray-200 text-left" @click="$emit('selectTag', {id: null, name:'all'})">All</button>
            <div class="text-left" v-for="(tag, index) in tags" :key="index">
                <button class="bg-gray-200" @click="$emit('selectTag', tag)">
                    <div class="flex justify-between mr-2">
                    {{ tag.name }} : {{ tag.tagMembers.length }}
                    </div>
                </button>
                <button class @click="$emit('deleteTag', tag.id)">
                        <CarbonTrashCan class="my-auto -mr-1 h-4 w-4 text-red-700" />
                </button>
            </div>
            <input class="bg-gray-200" type="text" placeholder="Input tag" @keyup.enter="$emit('createTag', $event.target.value)">
        </div>
    </div>
</template>

<style></style>
