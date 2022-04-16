<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount, onMounted } from 'vue';
import RiDeleteBin5Line from '../components/icons/RiDeleteBin5Line.vue'
import IcSharpAddCircle from '../components/icons/IcSharpAddCircle.vue'
import RegisterUser from '../components/RegisterUser.vue'
//router
import { useRoute, useRouter } from 'vue-router';
const { params } = useRoute();
const router = useRouter();
const isShow = ref(false)
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

const callRegisterUser = () => {
    isShow.value = true;
    console.log("register working!");
}

const cancelRegisterProcess = () => {
    console.log("register cancel");
    isShow.value = false;
    usernameText.value = ''
    passwordText.value = ''
}

//CREATE
const createNewUser = async (newUsername, newPassword) => {
    const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({username: newUsername, password: newPassword})
    })
    if(res.status === 201){
        const addedUser = await res.json();
        users.value.push(addedUser)
        console.log("create account successfully");
        alert(`User ${newUsername} has been created.`)
        location.reload();
    }
    else console.log('error, cannot create account');
}

//DELETE
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
            <button @click="deleteUser"><RiDeleteBin5Line/></button>
            <button @click="callRegisterUser" :disabled = "isShow"><IcSharpAddCircle/></button>
        </div>
    </div>
    <div v-show = "isShow">
                <RegisterUser
                    @cancelRegister = "cancelRegisterProcess"
                    @createUser = "createNewUser"
                />
    </div>
</template>

<style></style>
