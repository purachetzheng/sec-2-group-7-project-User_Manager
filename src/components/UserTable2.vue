<script setup>
import { reactive } from 'vue'
import TextRow from './table-rows/TextRow.vue'
import EmailRow from './table-rows/EmailRow.vue';
import TagRow from './table-rows/TagsRow.vue';
import DateRow from './table-rows/DateRow.vue';
import CarbonTrashCan from './icons/CarbonTrashCan.vue';
import BaseInputType from './Base/BaseInputType.vue';
defineEmits(['createUser', 'deleteUser', 'editUser', 'testt'])
const prop = defineProps({
    users: {
        type: Array,
        require: true,
    },
})
const newUsers = reactive({ name: '', email: '' })
const test = () => {
    this.$emit('testt', 'hello')
}
</script>
 
<template>
    <div class="container flex justify-center mx-auto">
        <button @click="test">Test</button>
        <div class="flex flex-col w-full border-b border-gray-200 shadow">
            <table class="border-b border-gray-200 shadow">
                <thead class="bg-gray-50">
                    <tr class="px-6 py-2 text-xs text-gray-500">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Tag</th>
                        <th>Status</th>
                        <th>Add Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-300">
                    <tr
                        v-for="(user, index) in users"
                        :key="index"
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                    >
                        <td>
                            <TextRow :text="user.name" :index="index" :checker="/\w+/" alertText="Name not null!" @editText="$emit('editUser', $event, user, 'name')" />
                        </td>
                        <td>
                            <TextRow :text="user.email" :index="index" :checker="/.*@.*\..*|^$/" alertText="Please enter a valid email" @editText="$emit('editUser', $event, user, 'email')" />
                        </td>
                        <td>
                            <TagRow :tags="user.tags" />
                        </td>
                        <td>Active</td>
                        <td>
                            <DateRow :date="user.date" />
                        </td>
                        <td>
                            <button class @click="$emit('deleteUser', user.id)">
                                <CarbonTrashCan class="my-auto -mr-1 h-4 w-4 text-red-700" />
                            </button>
                        </td>
                    </tr>
                    <tr
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                        @keydown.enter="$emit('createUser', newUsers)"
                    >
                        <td>
                            <input
                                type="text"
                                class="bg-gray-300"
                                placeholder="Input Email"
                                v-model="newUsers.name"
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                class="bg-gray-300"
                                placeholder="Input Email"
                                v-model="newUsers.email"
                            />
                        </td>
                        <td colspan="4" />
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>