<script setup>
import { reactive } from 'vue';

import TextCell from './table-rows/TextCell.vue';
import TagsCell from './table-rows/TagsCell.vue';
import DateCell from './table-rows/DateCell.vue';
import CarbonTrashCan from './icons/CarbonTrashCan.vue';
<<<<<<< HEAD
defineEmits(['createRow', 'deleteRow', 'editRow', 'testt']);
=======
import CarbonSortAscending from './icons/CarbonSortAscending.vue';
import CarbonSortDescending from './icons/CarbonSortDescending.vue';
defineEmits(['createRow', 'deleteRow', 'editRow', 'sortRow'])
>>>>>>> dev-big
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
<<<<<<< HEAD
        require: true,
    },
});
=======
        require: true
    },
    selectTag:{
        type: String,
        default: '0'
    }
})
>>>>>>> dev-big

const newRow = reactive({ name: '', email: '' });

const alertInput = () => {
    alert(`Please enter at least your name.`);
};
</script>

<template>
<<<<<<< HEAD
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
=======
    
    <div class="container flex justify-center">
        <div class="flex flex-col w-full border-b border-gray-200 shadow">
            <table class="border-b border-gray-200 shadow">
                <thead class="bg-gray-50">
                    <tr class="px-6 py-2 text-xs text-gray-500 text-base">
                        <th>#</th>
                        <th>
                            <div class="flex justify-between">
                                <span>Name</span>
                                <div class="flex space-x-2 mr-2">
                                    <button @click="$emit('sortRow','name','asc')"><CarbonSortAscending/></button>
                                    <button @click="$emit('sortRow','name','desc')"><CarbonSortDescending/></button>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div class="flex justify-between">
                                <span>Email</span>
                                <div class="flex space-x-2">
                                    <button @click="$emit('sortRow','email','asc')"><CarbonSortAscending/></button>
                                    <button @click="$emit('sortRow','email','desc')"><CarbonSortDescending/></button>
                                </div>
                            </div>
                        </th>
                        <!-- <th>Email</th> -->
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
                        v-for="(row, index) in rows"
                        :key="index"
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                        v-show="row.tagMembers.some(tag => tag.tagId == selectTag) || selectTag == 'all'"
                    >
                        <td>{{index}}</td>
                        <TextCell :text="row.name" :index="index" :checker="/[\w(ก-ฮ)]+/" alertText="Name not null!" @editText="$emit('editRow', $event, row, 'name')" />
                        <TextCell :text="row.email" :index="index" :checker="/.*@.*\..*|^$/" alertText="Please enter a valid email" @editText="$emit('editRow', $event, row, 'email')" />
                        <!-- <TagsCell :tags="row.tags" /> -->
                        <TagsCell :rowId="row.id" :tags="row.tagMembers" :tableId="tableId" />
                        <td>Active</td>
                        <DateCell :date="row.date" />
                        <td>
                            <button class @click="$emit('deleteRow', row.id)">
                                <CarbonTrashCan class="my-auto -mr-1 h-4 w-4 text-red-700" />
                            </button>
                        </td>
                        <!-- <template v-for="num in 3">
                            <td>{{num}}{{num}}{{num}}{{num}}{{num}}</td>
                        </template> -->
                    </tr>
                    <tr
                        class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                        @keydown.enter="newRow.name.length != 0? $emit('createRow', newRow): alertInput()"
                    >
                        <td>
                            <input
                                type="text"
                                class="bg-gray-300"
                                placeholder="Input Email"
                                v-model="newRow.name"
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                class="bg-gray-300"
                                placeholder="Input Email"
                                v-model="newRow.email"
                            />
                        </td>
                        <td :colspan="5" />
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
>>>>>>> dev-big
