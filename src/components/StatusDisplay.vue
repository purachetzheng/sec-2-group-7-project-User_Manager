<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount, onMounted } from 'vue';
defineEmits(['selectTag']);
const prop = defineProps({
    amountRows: {
        type: Number,
        default: 0,
        // require:true
    },
    // amountTags: {
    //   type: Number,
    //   default: 0,
    //   // require:true
    // },
    tableId: {
        type: String,
        require: true,
    },
});
// console.log(tags);

// Get Tags
const tags = ref([]);
const getTags = async () => {
    const res = await fetch('http://localhost:5000/tags?tableId=' + prop.tableId);
    if (res.status === 200) {
        tags.value = await res.json();
        // console.log(tags.value)
        // console.log(tags.value[0].name)
    } else console.log('error, cannot get tags');
};
//Get Rows
const rows = ref([]);
const getRows = async () => {
    const res = await fetch('http://localhost:5000/rows?tableId=' + prop.tableId);
    if (res.status === 200) {
        rows.value = await res.json();
        // console.log(tags.value)
    } else console.log('error, cannot get rows');
};
onBeforeMount(async () => {
    await getTags();
    await getRows();
});
// onMounted(() => {
//   console.log(tags.value);
//   console.log(rows.value);
// })

// const table = ref(prop.table.rows)
// console.log(table);
const amountTags = ref(computed(() => tags.value.length));
// const amountTags = ref(computed(() => prop.amountTags))
const amountRows = ref(computed(() => prop.amountRows));
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
            <button class="bg-gray-300 text-left" @click="$emit('selectTag', 'all')">All</button>
            <button class="bg-gray-300 text-left" v-for="(tag, index) in tags" :key="index" @click="$emit('selectTag', tag.id)">
                {{ tag.name }} : {{ tag.member.length }}
            </button>
        </div>
    </div>
</template>

<style></style>
