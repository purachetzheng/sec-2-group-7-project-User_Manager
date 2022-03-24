<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount } from 'vue'
import NavBar from '../components/NavBar.vue';
import UserTable from '../components/UserTable.vue';
import UserTable2 from '../components/UserTable2.vue';

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

let Users = reactive({
  users: JSON.parse(localStorage.getItem('users')),
  addUser(user) {
    this.users.push({
      name: user.name,
      email: user.email,
      status: user.email.length === 0 ? 'Incomplete' : 'Active',
      tag: [],
      date: new Date().toLocaleString('th-TH')
    });
    this.setLocalStorage();
  },
  removeUser(index) {
    // this.users.splice(this.users.findIndex((ele) => ele == user),1);
    this.users.splice(index, 1);
    this.setLocalStorage();
  },
  checkUser(user) {
    const isNameEmpty = user.name.length === 0;
    const isEmailEmpty = user.email.length === 0;
    user.status = isNameEmpty || isEmailEmpty ? 'incomplete' : 'Active';
  },
  // setEmail(event, user) {
  //   const inputEmail = event.target.value;
  //   const isEmailCorrect = checkEmailPattern(inputEmail);
  //   isEmailCorrect ? (user.email = inputEmail) : alert(`Please enter a valid email`);
  //   event.target.value = '';
  //   this.checkUser(user);
  //   // this.setLocalStorage();
  // },
  addTag(event, user) {
    user.tag.push(event.target.value);
    event.target.value = '';
    this.setLocalStorage();
  },
  removeTag(user, index) {
    user.tag.splice(index, 1);
    this.setLocalStorage();
  },
  setLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  },
  setUserName(event, user, index) {
    const inputName = event.target.value;
    const isNameEmpty = inputName.length === 0;
    if (!isNameEmpty) {
      user.name = inputName;
      hasEditName[index] = false;
      this.setLocalStorage()
    }
  },
  setUserEmail(event, user, index) {
    const inputEmail = event.target.value;
    const isEmailCorrect = checkEmailPattern(inputEmail);
    if (isEmailCorrect) {
      user.email = inputEmail;
      hasEditEmail[index] = false;
      this.checkUser(user);
    }
    else alert(`Please enter a valid email`);
  }
});

const tester = (event, id, type) => {
  console.log(`id: ${id} value: ${event.target.value} type: ${type}`)
  console.log(event.target)
}
</script>

<template>
  <div class="bg-gray-700 min-h-screen">
    <!-- Header -->

    <!-- Content Table -->

    <UserTable2 :users="users" @createUser="createUsers" @deleteUser="removeNote" @editUser="updateUser" @testt="tester" />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
