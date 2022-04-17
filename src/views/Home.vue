<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount, onMounted } from 'vue';
import RiDeleteBin5Line from '../components/icons/RiDeleteBin5Line.vue';
import IcSharpAddCircle from '../components/icons/IcSharpAddCircle.vue';
import MdiTextBoxEdit from '../components/icons/MdiTextBoxEdit.vue';
import RegisterUser from '../components/RegisterUser.vue';
//router
import { useRoute, useRouter } from 'vue-router';
import CarbonEdit from '../components/icons/CarbonEdit.vue';
import CarbonTrashCanProfile from '../components/icons/CarbonTrashCanProfile.vue';
const { params } = useRoute();
const router = useRouter();
const isShow = ref(false);
//Get
const users = ref([]);
const getUsers = async () => {
    const res = await fetch('http://localhost:5000/users?_embed=tables');
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
const deleteUser = async (removeUserId) => {
    // console.log('delete working!');
    // let removeUserId = prompt('Enter user ID that you want to delete.');
    // if (removeUserId === null) {
    //     console.log('cancel');
    //     return;
    // } else {
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
    // }
};

//UPDATE
const editingUser = ref({});
const toEditingMode = async (id) => {
    // console.log('editing work!');
    // let editUser = prompt('Enter user ID that you want to edit');
    // if (editUser === null) {
    //     return;
    // } else {
        const res = await fetch(`http://localhost:5000/users/${id}`);
        if (res.status === 200) {
            editingUser.value = await res.json();
            isShow.value = true;
        } else {
            alert(`Cannot edit since user ID number ${id} is not in the system.`);
        }
        console.log(editingUser.value);
    // }
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
            <div class="flex items-center">
                <div class="text-xl font-bold mr-2">Profile</div>
                <button @click="callRegisterUser" :disabled="isShow"><IcSharpAddCircle /></button>
            </div>
            <div>
                <div class="flex space-x-4 text-white">
                    <div v-for="(user, index) in users" :key="index">
                        <div class="relative">
                            <button
                                class="flex flex-col w-40 p-2 bg-blue-700 text-left hover:bg-blue-800 rounded-sm relative"
                                @click="clickLink(user.id)"
                            >
                                <span>{{ user.username }}</span>
                                <span>Tables: {{ user.tables.length }}</span>
                            </button>
                            <button @click="toEditingMode(user.id)" class="absolute top-1.5 right-8 bg-transparent text-xl text-blue-600">
                                <CarbonEdit />
                            </button>
                            <button
                                @click="deleteUser(user.id)"
                                class="absolute bg-transparent top-1.5 right-2 bg-gray-100 text-xl text-red-600"
                            >
                                <CarbonTrashCanProfile />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="isShow" class="absolute min-h-screen top-0 left-0 w-full h-full flex justify-center items-center z-99">
            <RegisterUser
                @cancelRegister="cancelRegisterProcess"
                @createUser="createNewUser"
                :currentUser="editingUser"
                @updateUser="modifyUser"
            />
        </div>
    </div>
</template>

<style></style>
