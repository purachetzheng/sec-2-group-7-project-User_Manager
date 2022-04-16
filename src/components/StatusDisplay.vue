<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount, onMounted } from 'vue';
defineEmits(['selectTag']);
const prop = defineProps({
    amountRows: {
        type: Number,
        default: 0,
        // require:true
    },
    tags:{
        type: Array,
        default: [],
    }
});

const amountTags = ref(computed(() => prop.tags.length))
const amountRows = ref(computed(() => prop.amountRows))
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
            <button class="bg-gray-300 text-left" @click="$emit('selectTag', {id: null, name:'all'})">All</button>
            <button class="bg-gray-300 text-left" v-for="(tag, index) in tags" :key="index" @click="$emit('selectTag', tag)">
                {{ tag.name }} : {{ tag.member.length }}
            </button>
        </div>
    </div>
</template>

<style></style>
