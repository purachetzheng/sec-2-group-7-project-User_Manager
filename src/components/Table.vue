<script setup>
import { reactive } from 'vue';

import TextCell from './table-rows/TextCell.vue';
import TagsCell from './table-rows/TagsCell.vue';
import DateCell from './table-rows/DateCell.vue';
import CarbonTrashCan from './icons/CarbonTrashCan.vue';
defineEmits(['createRow', 'deleteRow', 'editRow', 'testt']);
const prop = defineProps({
    table: {
        type: Object,
        default: {},
    },
    rows: {
        type: Array,
        default: [],
    },
    tableId: {
        type: String,
        require: true,
    },
});

const newRow = reactive({ name: '', email: '' });

const alertInput = () => {
    alert(`Please enter at least your name.`);
};
</script>

<template>
    <table class="w-full">
        <thead class="bg-gray-200 text-left">
            <tr class="h-6 text-xs text-gray-500">
                <th class="pl-2">Name</th>
                <th>Email</th>
                <th>Tag</th>
                <th>Status</th>
                <th>Add Date</th>
                <th></th>
            </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-300">
            <tr v-for="(row, index) in rows" :key="index" class="h-7 text-sm text-gray-500">
                <TextCell
                    class="pl-2"
                    :text="row.name"
                    :index="index"
                    :checker="/[\w(ก-ฮ)]+/"
                    alertText="Name not null!"
                    @editText="$emit('editRow', $event, row, 'name')"
                />
                <TextCell
                    :text="row.email"
                    :index="index"
                    :checker="/.*@.*\..*|^$/"
                    alertText="Please enter a valid email"
                    @editText="$emit('editRow', $event, row, 'email')"
                />
                <!-- <TagsCell :tags="row.tags" /> -->
                <TagsCell :rowId="row.id" :tags="row.tagMembers" :tableId="tableId" />
                <td>Active</td>
                <DateCell :date="row.date" />
                <td>
                    <button class @click="$emit('deleteRow', row.id)">
                        <CarbonTrashCan class="my-auto h-4 w-4 text-red-700" />
                    </button>
                </td>
                <!-- <template v-for="num in 3">
                            <td>{{num}}{{num}}{{num}}{{num}}{{num}}</td>
                        </template> -->
            </tr>
            <tr
                class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                @keydown.enter="newRow.name.length != 0 ? $emit('createRow', newRow) : alertInput()"
            >
                <td>
                    <input type="text" class="bg-gray-300" placeholder="Input Email" v-model="newRow.name" />
                </td>
                <td>
                    <input type="text" class="bg-gray-300" placeholder="Input Email" v-model="newRow.email" />
                </td>
                <td :colspan="4" />
            </tr>
        </tbody>
    </table>
</template>
