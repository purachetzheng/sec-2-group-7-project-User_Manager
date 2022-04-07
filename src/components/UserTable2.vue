<script setup>
import { reactive } from 'vue'
import TextCell from './table-rows/TextCell.vue'
import TagsCell from './table-rows/TagsCell.vue';
import DateCell from './table-rows/DateCell.vue';
import CarbonTrashCan from './icons/CarbonTrashCan.vue';
import BaseInputType from './Base/BaseInputType.vue';
defineEmits(['createUser', 'deleteUser', 'editUser', 'testt'])
const prop = defineProps({
    users: {
        type: Array,
        require: true,
    },
})

const testt = ``
const newUsers = reactive({ name: '', email: '' })
const test = () => {
    // this.$emit('testt', 'hello')
    console.log(testt)
}
const alertInput = () => {
    alert(`Please enter at least your name.`)
}              
</script>
 
<template>
    <div class="container flex justify-center">
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
                        <!-- <template v-for="num in 3">
                            <th>{{num}}</th>
                        </template> -->
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-300">
                    <tr
                        v-for="(user, index) in users"
                        :key="index"
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                    >
                        <TextCell :text="user.name" :index="index" :checker="/[\w(ก-ฮ)]+/" alertText="Name not null!" @editText="$emit('editUser', $event, user, 'name')" />
                        <TextCell :text="user.email" :index="index" :checker="/.*@.*\..*|^$/" alertText="Please enter a valid email" @editText="$emit('editUser', $event, user, 'email')" />
                        <TagsCell :tags="user.tags" />
                        <td>Active</td>
                        <DateCell :date="user.date" />
                        <td>
                            <button class @click="$emit('deleteUser', user.id)">
                                <CarbonTrashCan class="my-auto -mr-1 h-4 w-4 text-red-700" />
                            </button>
                        </td>
                        <!-- <template v-for="num in 3">
                            <td>{{num}}{{num}}{{num}}{{num}}{{num}}</td>
                        </template> -->
                    </tr>
                    <tr
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                        @keydown.enter="newUsers.name.length != 0? $emit('createUser', newUsers): alertInput()"
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
                        <td :colspan="4" />
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>