<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount, onMounted } from 'vue'
//router
import { useRoute, useRouter } from 'vue-router'
const {params}= useRoute()
const router = useRouter()
//Get
const users = ref([])
const getUsers = async () => {
  const res = await fetch('http://localhost:5000/users')
  if (res.status === 200) {
    users.value = await res.json()
    console.log(users.value)
  } else console.log('error, cannot get table')
}
onBeforeMount(async () => {
  await getUsers()
})

const clickLink = (id) => {
    router.push({ name: 'MyTable', params: { userId: id } })
}
</script>
 
<template>
    <p class="text-xl">Profile</p>
    <div class="flex space-x-4">
        <button class="bg-red-400" v-for="(user,index) in users" :key="index" @click="clickLink(user.id)">
            {{user.username}}
        </button>
    </div>
</template>
 
<style>

</style>