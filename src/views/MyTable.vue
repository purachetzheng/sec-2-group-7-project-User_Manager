<script setup>
import {
  ref,
  computed,
  reactive,
  nextTick,
  onBeforeMount,
  onMounted,
} from "vue";
import EditTable from "../components/EditTable.vue";
//router
import { useRoute, useRouter } from "vue-router";
const { params } = useRoute();
const router = useRouter();

console.log(params.userId);
//Get
const tables = ref({});
const getTables = async () => {
  console.log(params.userId);
  const res = await fetch(
    "http://localhost:5000/tables?userId=" + params.userId
  );
  if (res.status === 200) {
    tables.value = await res.json();
    console.log(tables.value);
  } else console.log("error, cannot get table");
};
onBeforeMount(async () => {
  await getTables();
});
const clickLink = (id) => {
  router.push({ name: "TableManager", params: { tableId: id } });
};

//CREATE
const createNewTable = async (newTable) => {
  if (tableNameText.value === "") {
    alert("Please type your table name");
  } else {
    const res = await fetch("http://localhost:5000/tables?userId=" + params.userId, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        tableName: newTable,
        userId: Number(params.userId),
      }),
    });
    if (res.status === 201) {
      const addedTable = await res.json();
      tables.value.push(addedTable);
      console.log("create table successfully");
      alert(`User ${newTable} has been created.`);
      location.reload();
    } else console.log("error, cannot create table");
  }
};

//DELETE
const removeTable = async () => {
  console.log("remove successed !");
  let deleteTableId = prompt("Enter table ID");
  if (deleteTableId === null) {
    console.log("Cancel delete");
    return;
  } else {
    const res = await fetch(`http://localhost:5000/tables/${deleteTableId}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      tables.value = tables.value.filter((table) => table.id !== deleteTableId);
      // table.value.rows = table.value.rows.filter((user) => user.id !== id)
      console.log("deleted successfully");
      location.reload();
    } else console.log("error, cannot delete");
  }
};
</script>

<template>
  <div class="p-4">
    <p class="text-xl">User {{ params.userId }} Table</p>
    <div class="flex space-x-4">
      <button
        class="bg-red-400"
        v-for="(table, index) in tables"
        :key="index"
        @click="clickLink(table.id)"
      >
        {{ table.tableName }}
      </button>
    </div>
    <div>
      <EditTable @createTable="createNewTable" />
      <button @click="removeTable">Delete</button>
    </div>
  </div>
</template>

<style></style>
