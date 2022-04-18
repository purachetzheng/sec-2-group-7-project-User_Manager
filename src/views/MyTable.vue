<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount } from 'vue';
import IcSharpAddCircle from '../components/icons/IcSharpAddCircle.vue';
import CarbonEdit from '../components/icons/CarbonEdit.vue';
import CarbonTrashCanProfile from '../components/icons/CarbonTrashCanProfile.vue';
//router
import { useRoute, useRouter } from 'vue-router';
const { params } = useRoute();
const router = useRouter();

//Get
const tables = ref([]);
const getTables = async () => {
  const res = await fetch(`http://localhost:5000/tables?userId=` + params.userId + '&_embed=rows');
  if (res.status === 200) {
    tables.value = await res.json();
  } else console.log('error, cannot get table');
};

onBeforeMount(async () => {
  await getTables();
});

//CREATE
const createTables = async (newTable) => {
  const res = await fetch(`http://localhost:5000/tables`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      tableName: newTable.tableName,
      userId: newTable.userId
    }),
  })
  if (res.status === 201) {
    const addedTable = await res.json()
    tables.value.push(addedTable)
    console.log('created successfully')
  } else console.log('error, cannot create')
}

//REMOVE
const removeTable = async (id) => {
    const res = await fetch(`http://localhost:5000/tables/${id}`, {
        method: 'DELETE',
    })
    if (res.status === 200) {
        tables.value = tables.value.filter((table) => table.id !== id)
        console.log('deleted successfully')
    } else console.log('error, cannot delete')
}

const clickLink = (id) => {
  router.push({ name: 'TableManager', params: { tableId: id } });
};

const newTable = ref({tableName: null, userId:params.userId})

const deleteMid = (table) => {
    confirm(`Want to delete this Table?: ${table.tableName}`)? removeTable(table.id):''
}
</script>

<template>
  <div class="flex flex-col container p-4">
        <div class="flex flex-col space-y-4">
            <div class="flex items-center">
                <div class="text-xl font-bold mr-2">Table</div>
                <!-- create Table -->
                <input type="text" placeholder="Input table name" v-model="newTable.tableName" @keyup.enter="createTables(newTable)">
                <button @click="createTables(newTable)"><IcSharpAddCircle /></button>
            </div>
            <div>
                <div class="flex space-x-4 text-white">
                    <div v-for="(table, index) in tables" :key="index">
                        <div class="relative">
                            <button
                                class="flex flex-col w-40 p-2 bg-blue-700 text-left hover:bg-blue-800 rounded-sm relative"
                                @click="clickLink(table.id, table.name)"
                            >
                                <span>{{ table.tableName }}</span>
                            </button>
                            <!-- <button @click="toEditingMode(table.id)" class="absolute top-1.5 right-8 bg-transparent text-xl text-gray-50">
                                <CarbonEdit />
                            </button> -->
                            <button @click="deleteMid(table)" class="absolute bg-transparent top-1.5 right-2 text-xl text-red-600">
                                <CarbonTrashCanProfile />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
[v-cloak] {
  display: none;
}
</style>
