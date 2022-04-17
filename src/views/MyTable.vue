<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount, onMounted } from 'vue';
//router
import { useRoute, useRouter } from 'vue-router';
const { params } = useRoute();
const router = useRouter();

console.log(params.userId);
//Get
const tables = ref({});
const getTables = async () => {
    console.log(params.userId);
    const res = await fetch('http://localhost:5000/tables?userId=' + params.userId);
    if (res.status === 200) {
        tables.value = await res.json();
        console.log(tables.value);
    } else console.log('error, cannot get table');
};
onBeforeMount(async () => {
    await getTables();
});
const clickLink = (id) => {
    router.push({ name: 'TableManager', params: { tableId: id } });
};
</script>

<template>
    <div class="flex flex-col container p-4">
        <div class="flex flex-col space-y-4">
            <p class="text-xl font-bold">User {{ params.userId }} Table</p>
            <div class="flex space-x-4 text-white">
                <div v-for="(table, index) in tables" :key="index">
                    <button
                        class="flex flex-col w-40 p-2 bg-blue-700 text-left hover:bg-blue-800 rounded-sm relative"
                        @click="clickLink(table.id)"
                    >
                        {{ table.tableName }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
