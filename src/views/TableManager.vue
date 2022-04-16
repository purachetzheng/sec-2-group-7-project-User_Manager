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
const getRows = async () => {
    const res = await fetch(`http://localhost:5000/rows?tableId=${tableId}&_embed=tagMembers`);
    // const res = await fetch(`http://localhost:5000/tables/${tableId}?_embed=rows&_embed=tags`)
    if (res.status === 200) {
        rows.value = await res.json();
        console.log(rows.value);
    } else console.log('error, cannot get table');
};
// Get Tags
const tags = ref([]);
const getTags = async () => {
    const res = await fetch(`http://localhost:5000/tags?tableId=${tableId}`);
    if (res.status === 200) {
        tags.value = await res.json();
        // console.log(tags.value)
        // console.log(tags.value[0].name)
    } else console.log('error, cannot get tags');
};

onBeforeMount(async () => {
    await getRows();
    await getTags();
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
            tagMembers: [],
        }),
    });
    if (res.status === 201) {
        const addedUser = await res.json();
        // table.value.rows.push(addedUser)
        rows.value.push(addedUser);
        console.log('created successfully');
        // console.log(addedUser)
        // console.log(rows.value)
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
            tagMembers: userP.tagMembers,
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
                    tagMembers: modifyNote.tagMembers,
                }
                : user
        );
        console.log('edited successfully');
    } else console.log('error, cannot edit');
};

const amountRows = computed(() => rows.value.length);

const sortRowsBy = (sorter, type = 'asc') => { 
    switch (sorter) {
        case (sorter = 'id'):
            rows.value.sort((a, b) => (type === 'asc' ? a.id - b.id : b.id - a.id));
            break;
        case (sorter = 'name'):
            rows.value.sort((a, b) =>
                type === 'asc' ? a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
                    : b.name.toUpperCase() > a.name.toUpperCase() ? 1 : -1
            );
            break;
        case (sorter = 'email'):
            rows.value.sort((a, b) =>
                type === 'asc' ? a.email.toUpperCase() > b.email.toUpperCase() ? 1 : -1
                    : b.email.toUpperCase() > a.email.toUpperCase() ? 1 : -1
            );
            break;
    }
    console.log(`sorted by ${sorter} with ${type}`);
};

const selectedTag = ref(null);
const selectRowByTag = (tag) => {
    console.log(`selected by tag: ${tag.name}`);
    selectedTag.value = tag.id;
};
</script>

<template>
    <div class="min-w-full">
        <!-- Header -->

        <!-- Content Table -->
        <div class="flex space-x-2">
            <Table :rows="rows" :tagsList="tags" :selectTag="selectedTag" :tableId="tableId" @createRow="createRow"
                @deleteRow="removeRow" @editRow="updateRow" @sortRow="sortRowsBy" />
            <StatusDisplay :tags="tags" :amountRows="amountRows" @selectTag="selectRowByTag" />
        </div>
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
}
</style>
