<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount, onMounted } from 'vue'
//router
import { useRoute, useRouter } from 'vue-router'
const {params}= useRoute()
const router = useRouter()

console.log(params.username);
//Get
const userInform = ref({})
const getUserInform = async () => {
  const res = await fetch('http://localhost:5000/users?username=' + params.username)
  if (res.status === 200) {
    userInform.value = await res.json()
    userInform.value = userInform.value[0]
    console.log(userInform.value)
  } else console.log('error, cannot get table')
}
onBeforeMount(async () => {
  await getUserInform()
})
const clickLink = (id) => {
    router.push({ name: 'TableManager', params: { tableId: id } })
}
</script>
 
<template>
    <p class="text-xl">My Tables</p>
    <div class="flex space-x-4">
        <button class="bg-red-400" v-for="(table,index) in userInform.tableList" :key="index" @click="clickLink(table.id)">
            {{table.tableName}}
        </button>
    </div>
</template>
 
<style>

</style>