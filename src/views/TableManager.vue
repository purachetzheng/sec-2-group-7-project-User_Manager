<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount, toRefs, toRef } from 'vue';
import NavBar from '../components/NavBar.vue';
import Table from '../components/Table.vue';
import StatusDisplay from '../components/StatusDisplay.vue';
//router
import { useRoute, useRouter } from 'vue-router';
const { params } = useRoute();
const router = useRouter();
const tableId = params.tableId;

//Get
const rows = ref([]);
// const table = ref({rows:[], tags:[]})
const getTable = async () => {
    const res = await fetch(`http://localhost:5000/rows?tableId=${tableId}&_embed=tagMembers`);
    // const res = await fetch(`http://localhost:5000/tables/${tableId}?_embed=rows&_embed=tags`)
    if (res.status === 200) {
        rows.value = await res.json();
        console.log(rows.value);
    } else console.log('error, cannot get table');
};
const getTableSort = async (sortBy) => {
    // const res = await fetch(`http://localhost:5000/rows?tableId=${tableId}&_embed=tagMembers`)
    const res = await fetch(`http://localhost:5000/rows?tableId=${tableId}&_embed=tagMembers&_sort=${sortBy}`);
    if (res.status === 200) {
        rows.value = await res.json();
        console.log(rows.value);
    } else console.log('error, cannot get table');
};
onBeforeMount(async () => {
    await getTable();
});
//CREATE
const createRow = async (newUser) => {
    const res = await fetch(`http://localhost:5000/rows`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: newUser.name,
            email: newUser.email,
            date: '11/11/2020',
            tableId: Number(tableId),
        }),
    });
    if (res.status === 201) {
        const addedUser = await res.json();
        // table.value.rows.push(addedUser)
        rows.value.push(addedUser);
        console.log('created successfully');
        newUser.name = '';
        newUser.email = '';
    } else console.log('error, cannot create');
};

//REMOVE
const removeRow = async (id) => {
    const res = await fetch(`http://localhost:5000/rows/${id}`, {
        method: 'DELETE',
    });
    if (res.status === 200) {
        rows.value = rows.value.filter((user) => user.id !== id);
        // table.value.rows = table.value.rows.filter((user) => user.id !== id)
        console.log('deleted successfully');
    } else console.log('error, cannot delete');
};

//UPDATE
const updateRow = async (event, userP, type) => {
    const res = await fetch(`http://localhost:5000/rows/${userP.id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: type === 'name' ? event.target.value : userP.name,
            email: type === 'email' ? event.target.value : userP.email,
            date: userP.date,
            tableId: userP.tableId,
        }),
    });
    if (res.status === 200) {
        const modifyNote = await res.json();
        rows.value = rows.value.map((user) =>
            // table.value.rows = table.value.rows.map((user) =>
            user.id === modifyNote.id
                ? {
                      ...user,
                      name: modifyNote.name,
                      email: modifyNote.email,
                      date: modifyNote.date,
                      tableId: modifyNote.tableId,
                  }
                : user
        );
        console.log('edited successfully');
    } else console.log('error, cannot edit');
};

const tester = (event, id, type) => {
    console.log(`id: ${id} value: ${event.target.value} type: ${type}`);
    console.log(event.target);
};

const amountRows = computed(() => rows.value.length);
// const amountRows = computed(() => table.value.rows.length);
// const amountTags = computed(() => table.value.tags.length);
const sortRowsBy = (sorter) => {
    switch (sorter) {
        case (sorter = 'id'):
            rows.value.sort((a, b) => a.id - b.id);
            // table.value.rows.sort((a, b) => a.id - b.id)
            break;
        case (sorter = 'name'):
            rows.value.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1));
            // table.value.rows.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase()? 1:-1)
            break;
    }
    console.log(rows.value);
    // table.value.rows.sort((a, b) => a[sorter] - b[sorter])
    // console.log(table.value.rows[0]['id']);
};
</script>

<template>
    <div class="min-w-full">
        <div class="flex">
            <Table :rows="rows" :tableId="tableId" @createRow="createRow" @deleteRow="removeRow" @editRow="updateRow" @testt="tester" />
            <StatusDisplay :tableId="tableId" :amountRows="amountRows" :amountTags="0" />
        </div>
        <div>
            <button class="btn-primary" @click="sortRowsBy('name')">Sort Name 1</button>
            <button class="btn-primary" @click="sortRowsBy('id')">Sort Id 1</button>
            <button class="btn-primary" @click="getTableSort('name')">Sort Name 2</button>
            <button class="btn-primary" @click="getTableSort('id')">Sort Id 2</button>
        </div>
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
}
</style>
