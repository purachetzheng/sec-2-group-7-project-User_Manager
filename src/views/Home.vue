<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount, onMounted } from 'vue';
import RiDeleteBin5Line from '../components/icons/RiDeleteBin5Line.vue'
//router
import { useRoute, useRouter } from 'vue-router';
const { params } = useRoute();
const router = useRouter();
//Get
const users = ref([]);
const getUsers = async () => {
    const res = await fetch('http://localhost:5000/users');
    if (res.status === 200) {
        users.value = await res.json();
        console.log(users.value);
    } else console.log('error, cannot get table');
};
onBeforeMount(async () => {
    await getUsers();
});

const clickLink = (id) => {
    router.push({ name: 'MyTable', params: { userId: id } });
};

const registerUser = () => {
    console.log("register working!");
    let userName = prompt("Enter your username")
    let passWord = prompt("Enter your password")
}

const deleteUser = async () => {
    console.log("delete working!");
    let removeUserId = prompt("Enter user ID that you want to delete.")
    if (removeUserId === null){
        console.log("cancel");
        return;
    }else{
        const res = await fetch(`http://localhost:5000/users/${removeUserId}`, {
            method: 'DELETE'
        })
        if(res.status===200){
            users.value = users.value.filter((user) => user.id !== removeUserId)
            console.log('delete succesfully');
            alert(`Delete succesfully, ID number ${removeUserId} has been removed`)
            location.reload();
        }else{
            console.log('error, cannot delete');
            alert(`Delete unsuccessfully, ID number ${removeUserId} is not in the system.`)
        }
    }
}
</script>

<template>
    <div class="p-4">
        <p class="text-xl">Profile</p>
        <div class="flex space-x-4">
            <button class="bg-red-400" v-for="(user, index) in users" :key="index" @click="clickLink(user.id)">
                {{ user.username }}
            </button>
            <button class = "bg-red-400" @click="registerUser">+</button>
            <button @click="deleteUser"><RiDeleteBin5Line/></button>
        </div>
    </div>
</template>

<style></style>
