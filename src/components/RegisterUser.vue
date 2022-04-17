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
    <div class="absolute w-full h-full bg-gray-500 transition ease-in-out opacity-60"></div>
    <div class="bg-white absolute rounded-md shadow-xl">
        <div class="flex flex-col p-4 space-y-2">
            <div v-if="newUser.id > 0" class="font-bold">Editing User</div>
            <div v-else class="font-bold">Add New User</div>
            <div class="grid grid-cols-4 gap-2 items-center">
                <div class="col-span-1">Username:</div>
                <input
                    id="usernameText"
                    class="appearance-none bg-gray-300 rounded-sm placeholder-black/30 p-1 col-span-3"
                    type="text"
                    placeholder="username"
                    v-model="newUser.username"
                />
            </div>
            <div class="grid grid-cols-4 gap-2 items-center">
                <div class="col-span-1">
                    <label>Password: </label>
                </div>
                <input
                    id="passwordText"
                    class="appearance-none bg-gray-300 rounded-sm placeholder-black/30 p-1 col-span-3"
                    type="password"
                    placeholder="password"
                    v-model="newUser.password"
                />
            </div>
            <div class="flex gap-2 text-sm">
                <button
                    v-if="newUser.id > 0"
                    class="flex items-center gap-1 p-2 bg-blue-700 rounded-sm text-white"
                    @click="$emit('updateUser', newUser)"
                >
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </span>
                    <span>Save</span>
                </button>
                <button
                    v-else
                    class="flex items-center gap-1 p-2 bg-blue-700 rounded-sm text-white"
                    @click="$emit('createUser', newUser.username, newUser.password)"
                >
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </span>
                    <span>Add</span>
                </button>
                <button class="flex items-center p-2 gap-1 font-bold rounded-sm text-blue-700" @click="$emit('cancelRegister', $event)">
                    <span>Cancel</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style></style>
