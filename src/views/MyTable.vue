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
    <p class="text-xl">My Tables</p>
    <div class="flex space-x-4">
        <button class="bg-red-400" v-for="(table, index) in tables" :key="index" @click="clickLink(table.id)">
            {{ table.tableName }}
        </button>
    </div>
</template>

<style></style>
