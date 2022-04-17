<script setup>
import { computed } from 'vue';
defineEmits(['createUser', 'cancelRegister', 'updateUser']);
const props = defineProps({
    currentUser: {
        type: Object,
        default: {},
    },
});

const newUser = computed(() => {
    return { id: props.currentUser.id, username: props.currentUser.username, password: props.currentUser.password };
});
</script>

<template>
    <div class="absolute w-full h-full bg-gray-300 transition-all opacity-60"></div>
    <div class="bg-red-300 absolute w-1/2 rounded-md">
        <div class="flex flex-col p-4 w-full">
            <div v-if="newUser.id > 0" class="">Editing User</div>
            <div v-else class="font-bold">Add New User</div>
            <div>
                <label>Username: </label>
                <input
                    id="usernameText"
                    class="input border-b-2 appearance-none border-gray-400 p-1 w-1/2"
                    type="text"
                    placeholder="type your username here..."
                    v-model="newUser.username"
                />
            </div>
            <div>
                <label>Password: </label>
                <input
                    id="passwordText"
                    class="input border-b-2 appearance-none border-gray-400 p-1 pl-2 pr-2 w-1/2"
                    type="password"
                    placeholder="type your password here..."
                    v-model="newUser.password"
                />
            </div>
            <div class="flex gap-2">
                <button v-if="newUser.id > 0" class="p-2 bg-gray-300 rounded-sm" @click="$emit('updateUser', newUser)">SAVE</button>
                <button v-else class="p-2 bg-gray-300 rounded-sm" @click="$emit('createUser', newUser.username, newUser.password)">
                    ADD
                </button>
                <button class="" @click="$emit('cancelRegister', $event)">CANCEL</button>
            </div>
        </div>
    </div>
</template>

<style></style>
