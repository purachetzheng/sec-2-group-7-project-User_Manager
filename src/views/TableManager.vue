<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount,toRefs,toRef } from 'vue'
import NavBar from '../components/NavBar.vue';
import Table from '../components/Table.vue';
import StatusDisplay from '../components/StatusDisplay.vue';
//router
import { useRoute, useRouter } from 'vue-router'
const { params }= useRoute()
const router = useRouter()
const tableId = params.tableId

//Get
const table = ref({rows:[], tags:[]})
const getTable = async () => {
  const res = await fetch(`http://localhost:5000/tables/${tableId}?_embed=rows&_embed=tags`)
  if (res.status === 200) {
    table.value = await res.json()
    console.log(table.value)
    console.log(table.value.rows.length)
  } else console.log('error, cannot get table')
}
onBeforeMount(async () => {
  await getTable()
})
//CREATE
const createRow = async (newUser) => {
  const res = await fetch(`http://localhost:5000/rows`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ 
      name: newUser.name,
      email: newUser.email,
      date: "11/11/2020",
      tableId: Number(params.tableId)
    })
  })
  if (res.status === 201) {
    const addedUser = await res.json()
    table.value.rows.push(addedUser)
    console.log('created successfully')
    newUser.name = ''
    newUser.email = ''
  } else console.log('error, cannot create')
}

//REMOVE
const removeRow = async (id) => {
  const res = await fetch(`http://localhost:5000/rows/${id}`, {
    method: 'DELETE'
  })
  if (res.status === 200) {
    table.value.rows = table.value.rows.filter((user) => user.id !== id)
    console.log('deleted successfully')
  }
  else console.log('error, cannot delete')
}

//UPDATE
const updateRow = async (event, userP, type) => {
  const res = await fetch(`http://localhost:5000/rows/${userP.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ 
      name: type ==='name'? event.target.value : userP.name,
      email: type ==='email'? event.target.value : userP.email,
      date: userP.date,
      tableId: userP.tableId
    })

    })
  if (res.status === 200) {
    const modifyNote = await res.json()
    table.value.rows = table.value.rows.map((user) => 
      user.id === modifyNote.id 
        ? { 
          ...user, 
          name: modifyNote.name,
          email: modifyNote.email,
          date: modifyNote.date,
          tableId: modifyNote.tableId
          } 
        : user
    )
    console.log('edited successfully')
  } else console.log('error, cannot edit')
}

const tester = (event, id, type) => {
  console.log(`id: ${id} value: ${event.target.value} type: ${type}`)
  console.log(event.target)
}


const amountRows = computed(() => table.value.rows.length);
const amountTags = computed(() => table.value.tags.length);

</script>

<template>
  <div class="bg-gray-700 min-h-screen">
    <!-- Header -->

    <!-- Content Table -->
    <div class="flex space-x-2">
      <Table class="flex-none w-10/12" :table="table" @createRow="createRow" @deleteRow="removeRow" @editRow="updateRow" @testt="tester" />
      <StatusDisplay class="flex-none w-2/12"  :tableId="tableId" :amountRows="amountRows" :amountTags="amountTags" />
    </div>
    
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
