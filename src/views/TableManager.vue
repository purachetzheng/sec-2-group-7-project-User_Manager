<script setup>
import {
    ref,
    computed,
    reactive,
    nextTick,
    onBeforeMount,
    toRefs,
    toRef,
} from 'vue'
import NavBar from '../components/NavBar.vue'
import Table from '../components/Table.vue'
import StatusDisplay from '../components/StatusDisplay.vue'
//router
import { useRoute, useRouter } from 'vue-router'
const { params } = useRoute()
const router = useRouter()
const tableId = params.tableId

//Search by Name
const keywords = ref('')
const filterUser = computed(() =>
    rows.value.filter((user) => user.name.includes(keywords.value))
)

//Get
const rows = ref([])
const getRows = async () => {
    const res = await fetch(
        `http://localhost:5000/rows?tableId=${tableId}&_embed=tagMembers`
    )
    if (res.status === 200) {
        rows.value = await res.json()
    } else console.log('error, cannot get table')
}
// Get Tags
const tags = ref([])
const getTags = async () => {
    const res = await fetch(
        `http://localhost:5000/tags?tableId=${tableId}&_embed=tagMembers`
    )
    if (res.status === 200) {
        tags.value = await res.json()
    } else console.log('error, cannot get tags')
}

onBeforeMount(async () => {
    await getRows()
    console.log('---- Get Rows ----')
    console.log(rows.value)
    console.log('------------------')
    await getTags()
    console.log('---- Get Tags ----')
    console.log(tags.value)
    console.log('------------------')
})
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
            date: new Date().toLocaleString('th-TH'),
            tableId: Number(tableId),
            //กันการหาไม่เจอเนื่องจากไม่ได้เรียก req get ใหม่
            tagMembers: [],
        }),
    })
    if (res.status === 201) {
        const addedUser = await res.json()
        rows.value.push(addedUser)
        console.log('created row successfully')
        newUser.name = ''
        newUser.email = ''
    } else console.log('error, cannot create')
}
const createTag = async (newTag) => {
    const res = await fetch(`http://localhost:5000/tags`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: newTag.name,
            tableId: Number(tableId),
            color: newTag.color,
            tagMembers: [],
        }),
    })
    if (res.status === 201) {
        const addedTag = await res.json()
        tags.value.push(addedTag)
        console.log('created tag successfully')
    } else console.log('error, cannot create')
}
const createTagMembers = async (rowId, tag) => {
    const res = await fetch(`http://localhost:5000/tagMembers`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            name: tag.name,
            rowId: rowId,
            tagId: tag.id,
            color: tag.color,
        }),
    })
    if (res.status === 201) {
        const addedTagMembers = await res.json()
        rows.value[rows.value.findIndex((el) => el.id === rowId)].tagMembers.push(
            addedTagMembers
        )
        tags.value[tags.value.findIndex((el) => el.id === tag.id)].tagMembers.push(
            addedTagMembers
        )
        console.log('created tagMember successfully')
    } else console.log('error, cannot create')
}

//REMOVE
const removeRow = async (id) => {
    const res = await fetch(`http://localhost:5000/rows/${id}`, {
        method: 'DELETE',
    })
    if (res.status === 200) {
        getTags()
        rows.value = rows.value.filter((user) => user.id !== id)
        console.log('deleted successfully')
    } else console.log('error, cannot delete')
}
const removeTag = async (id) => {
    const res = await fetch(`http://localhost:5000/tags/${id}`, {
        method: 'DELETE',
    })
    if (res.status === 200) {
        tags.value = tags.value.filter((tag) => tag.id !== id)
        //ถ้าเขียนแก้ตัวแปรต้องเขียนเยอะ
        getRows()
        console.log('deleted successfully')
    } else console.log('error, cannot delete')
}
const removeTagMembers = async (tagMember) => {
    const id = tagMember.id
    console.log(tagMember)
    const res = await fetch(`http://localhost:5000/tagMembers/${id}`, {
        method: 'DELETE',
    })
    if (res.status === 200) {
        const rowIndex = rows.value.findIndex((el) => el.id === tagMember.rowId)
        const tagIndex = tags.value.findIndex((el) => el.id === tagMember.tagId)
        rows.value[rowIndex].tagMembers = rows.value[rowIndex].tagMembers.filter(
            (tagM) => tagM.id != tagMember.id
        )
        tags.value[tagIndex].tagMembers = tags.value[tagIndex].tagMembers.filter(
            (user) => user.id !== id
        )
        console.log('deleted successfully')
    } else console.log('error, cannot delete')
}

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
    })
    if (res.status === 200) {
        const modifyNote = await res.json()
        rows.value = rows.value.map((user) =>
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
        )
        console.log('edited successfully')
    } else console.log('error, cannot edit')
}

const amountRows = computed(() => rows.value.length)

const sortRowsBy = (sorter, type = 'asc') => {
    switch (sorter) {
        case (sorter = 'id'):
            rows.value.sort((a, b) => (type === 'asc' ? a.id - b.id : b.id - a.id))
            break
        case (sorter = 'name'):
            rows.value.sort((a, b) => type === 'asc'
                ? a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
                : b.name.toUpperCase() > a.name.toUpperCase() ? 1 : -1
            )
            break
        case (sorter = 'email'):
            rows.value.sort((a, b) => type === 'asc'
                ? a.email.toUpperCase() > b.email.toUpperCase() ? 1 : -1
                : b.email.toUpperCase() > a.email.toUpperCase() ? 1 : -1
            )
            break
    }
    console.log(sorter === 'id' ? `undo sorting` : `sorted by ${sorter} with ${type}`)
}

const selectedTag = ref(null)
const selectRowByTag = (tag) => {
    console.log(`selected by tag: ${tag.name}`)
    selectedTag.value = tag.id
}

const addTag = (newTagName, rowId) => {
    const hasThisTag = tags.value.find((el) => el.name === newTagName)
    console.log(hasThisTag)
    createTagMembers(rowId, hasThisTag)
}
</script>

<template>
    <div class="w-full">
        <div class="flex h-full">
            <div class="w-72 bg-white h-full">
                <StatusDisplay :tags="tags" :amountRows="amountRows" @selectTag="selectRowByTag" @deleteTag="removeTag"
                    @createTag="createTag" />
            </div>
            <div class="w-full bg-gray-200">
                <div class="m-2">
                    <span> Search by Name: </span>
                    <input type="text" v-model="keywords" class="appearance-none" />
                </div>
                <Table :rows="filterUser" :tagsList="tags" :selectTag="selectedTag" :tableId="tableId"
                    @createRow="createRow" @deleteRow="removeRow" @editRow="updateRow" @sortRow="sortRowsBy"
                    @addTagMem="addTag" @deleteTagMem="removeTagMembers" />
            </div>
        </div>
    </div>
</template>

<style>
* {
    margin: 0;
    padding: 0;
}
</style>
