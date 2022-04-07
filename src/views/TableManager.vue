<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount } from 'vue'
import NavBar from '../components/NavBar.vue';
import UserTable from '../components/UserTable.vue';
import UserTable2 from '../components/UserTable2.vue';
import StatusDisplay from '../components/StatusDisplay.vue';

//Get
const users = ref([])
const getUsers = async () => {
  const res = await fetch('http://localhost:5000/table')
  if (res.status === 200) {
    users.value = await res.json()
    console.log(users.value)
  } else console.log('error, cannot get table')
}
onBeforeMount(async () => {
  await getUsers()
})

//CREATE
const createUsers = async (newUser) => {
  const res = await fetch(`http://localhost:5000/table`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ 
      name: newUser.name,
      email: newUser.email,
      date: "11/11/2020",
      tags: []
    })
  })
  if (res.status === 201) {
    const addedUser = await res.json()
    users.value.push(addedUser)
    console.log('created successfully')
    newUser.name = ''
    newUser.email = ''
  } else console.log('error, cannot create')
}

//REMOVE
const removeNote = async (id) => {
  const res = await fetch(`http://localhost:5000/table/${id}`, {
    method: 'DELETE'
  })
  if (res.status === 200) {
    users.value = users.value.filter((user) => user.id !== id)
    console.log('deleted successfully')
  }
  else console.log('error, cannot delete')
}

//UPDATE
const updateUser = async (event, userP, type) => {
  const res = await fetch(`http://localhost:5000/table/${userP.id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ 
      name: type ==='name'? event.target.value : userP.name,
      email: type ==='email'? event.target.value : userP.email,
      date: userP.date,
      tags: userP.tags
    })

    })
  if (res.status === 200) {
    const modifyNote = await res.json()
    users.value = users.value.map((user) => 
      user.id === modifyNote.id 
        ? { 
          ...user, 
          name: modifyNote.name,
          email: modifyNote.email,
          date: modifyNote.date,
          tags: modifyNote.tags
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

//
const amountUsers = computed(() => users.value.length);
</script>

<template>
  <div class="bg-gray-700 min-h-screen">
    <!-- Header -->

    <!-- Content Table -->
    <div class="flex space-x-2">
      <UserTable2 class="w-10/12" :users="users" @createUser="createUsers" @deleteUser="removeNote" @editUser="updateUser" @testt="tester" />
      <StatusDisplay class="w-2/12" :amountUsers="amountUsers" />
    </div>
    
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
