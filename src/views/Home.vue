<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount, onMounted } from 'vue';
import RiDeleteBin5Line from '../components/icons/RiDeleteBin5Line.vue';
import IcSharpAddCircle from '../components/icons/IcSharpAddCircle.vue';
import MdiTextBoxEdit from '../components/icons/MdiTextBoxEdit.vue';
import RegisterUser from '../components/RegisterUser.vue';
//router
import { useRoute, useRouter } from 'vue-router';
const { params } = useRoute();
const router = useRouter();
const isShow = ref(false);
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

//CREATE
const createNewUser = async (newUsername, newPassword) => {
    if (usernameText.value === '' && passwordText.value === '') {
        alert('type your username and password');
    } else if (usernameText.value === '') {
        alert('type your username');
    } else if (passwordText.value === '') {
        alert('type your password');
    } else {
        const res = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({ username: newUsername, password: newPassword }),
        });
        if (res.status === 201) {
            const addedUser = await res.json();
            users.value.push(addedUser);
            console.log('create account successfully');
            alert(`User ${newUsername} has been created.`);
            location.reload();
        } else console.log('error, cannot create account');
    }
};

//DELETE
const deleteUser = async () => {
    console.log('delete working!');
    let removeUserId = prompt('Enter user ID that you want to delete.');
    if (removeUserId === null) {
        console.log('cancel');
        return;
    } else {
        const res = await fetch(`http://localhost:5000/users/${removeUserId}`, {
            method: 'DELETE',
        });
        if (res.status === 200) {
            users.value = users.value.filter((user) => user.id !== removeUserId);
            console.log('delete succesfully');
            alert(`Delete succesfully, user ID number ${removeUserId} has been removed`);
            location.reload();
        } else {
            console.log('error, cannot delete');
            alert(`Delete unsuccessfully, user ID number ${removeUserId} is not in the system.`);
        }
    }
};

//UPDATE
const editingUser = ref({});
const toEditingMode = async () => {
    console.log('editing work!');
    let editUser = prompt('Enter user ID that you want to edit');
    if (editUser === null) {
        return;
    } else {
        const res = await fetch(`http://localhost:5000/users/${editUser}`);
        if (res.status === 200) {
            editingUser.value = await res.json();
            isShow.value = true;
        } else {
            alert(`Cannot edit since user ID number ${editUser} is not in the system.`);
        }
        console.log(editingUser.value);
    }
};

const modifyUser = async (editingUser) => {
    const res = await fetch(`http://localhost:5000/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
            'content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: editingUser.username,
            password: editingUser.password,
        }),
    });
    if (res.status === 200) {
        const modifyUser = await res.json();
        users.value = users.value.map((user) =>
            user.id === modifyUser.id ? { ...user, username: modifyUser.username, password: modifyUser.password } : user
        );
        alert(`User ID number ${modifyUser.id} has been edited.`);
        isShow.value = false;
    }
};

const callRegisterUser = () => {
    isShow.value = true;
    console.log('register working!');
};

const cancelRegisterProcess = () => {
    console.log('register cancel');
    isShow.value = false;
    usernameText.value = '';
    passwordText.value = '';
    editingUser.value = '';
};
</script>

<template>
    <div class="flex flex-col container p-4">
        <div class="flex flex-col space-y-4">
            <div>
                <p class="text-xl font-bold">Profile</p>
            </div>
            <div>
                <div class="flex space-x-4">
                    <button v-for="(user, index) in users" :key="index" @click="clickLink(user.id)">
                        <div class="flex flex-col p-2 bg-gray-300 text-left hover:bg-gray-400">
                            <span> ID: {{ user.id }} </span>
                            <span> USERNAME: {{ user.username }} </span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        <div class="mt-4">
            <div class="flex gap-2">
                <button @click="callRegisterUser" :disabled="isShow"><IcSharpAddCircle /></button>
                <button @click="toEditingMode" :disabled="isShow"><MdiTextBoxEdit /></button>
                <button @click="deleteUser"><RiDeleteBin5Line /></button>
            </div>
            <div v-show="isShow" class="absolute min-h-screen top-0 left-0 w-full h-full flex justify-center items-center">
                <RegisterUser
                    @cancelRegister="cancelRegisterProcess"
                    @createUser="createNewUser"
                    :currentUser="editingUser"
                    @updateUser="modifyUser"
                />
            </div>
        </div>
    </div>
</template>

<style></style>
