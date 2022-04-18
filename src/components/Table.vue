<script setup>
import { ref, reactive } from 'vue';

import TextCellBase from './table-rows/TextCellBase.vue';
import TagsCell from './table-rows/TagsCell.vue';
import DateCell from './table-rows/DateCell.vue';
import CarbonTrashCan from './icons/CarbonTrashCan.vue';
import CarbonSortAscending from './icons/CarbonSortAscending.vue';
import CarbonSortDescending from './icons/CarbonSortDescending.vue';
const emits = defineEmits(['createRow', 'deleteRow', 'editRow', 'sortRow', 'addTag', 'deleteTagMem']);
const props = defineProps({
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
    selectTag: {
        type: Number,
        default: '0',
    },
    tagsList: {
        type: Array,
        default: [],
    },
});

//use to send new row obj
const newRow = reactive({ name: '', email: '' });

const alertInput = () => {
    alert(`Please enter at least your name or enter valid email.`);
};

//sort
const sortMouseHover = ref(null);
const sortSelected = ref(null);
const sorting = (sortBy, type, n) => {
    //ถ้ากด sort แบบใด ๆ ครั้งแรก
    if (sortSelected.value === null || sortSelected.value !== n + sortBy.hName) {
        emits('sortRow', sortBy.hName.toLowerCase(), type);
        sortSelected.value = n + sortBy.hName;
    }
    //กดซ้ำจะทำการกลับ default sort คือ id แบบ asc
    else {
        emits('sortRow', 'id', 'asc');
        sortSelected.value = null;
    }
};
//hName = text in each th tag, sort = have sort?
const tableHeader = [
    { hName: 'Name', sort: true, width: 'w-3/12' },
    { hName: 'Email', sort: true, width: 'w-3/12' },
    { hName: 'Tag', sort: false, width: 'w-4/12' },
    { hName: 'Add Date', sort: false, width: 'w-1/12' },
    { hName: '', sort: false, width: 'w-1/12' },
];

</script>

<template>
    <div>

        <table class="w-full ">
            <thead class="bg-gray-300 text-left">
                <tr class="h-6 text-xs text-gray-500 align-center">
                    <th scope="col" :class="th.width" v-for="th in tableHeader" :key="th.hName">
                        <div class="flex justify-between">
                            <span>{{ th.hName }}</span>
                            <div class="flex space-x-2 mr-2" v-if="th.sort">
                                <button
                                    :class="[sortMouseHover === '1' + th.hName || sortSelected === '1' + th.hName ? 'text-blue-700' : '']"
                                    @click="sorting(th, 'asc', '1')" @mouseenter="sortMouseHover = '1' + th.hName"
                                    @mouseleave="sortMouseHover = null">
                                    <CarbonSortAscending class="text-xl" />
                                </button>
                                <button
                                    :class="[sortMouseHover === '2' + th.hName || sortSelected === '2' + th.hName ? 'text-blue-700' : '']"
                                    @click="sorting(th, 'desc', '2')" @mouseenter="sortMouseHover = '2' + th.hName"
                                    @mouseleave="sortMouseHover = null">
                                    <CarbonSortDescending class="text-xl" />
                                </button>
                            </div>
                        </div>
                    </th>

                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-300">
                <tr v-for="(row, index) in rows" :key="index" class=" px-6 py-4 text-sm text-gray-500"
                    v-show="row.tagMembers.some((tag) => tag.tagId == selectTag) || selectTag === null">
                    <TextCellBase :text="row.name" :index="index" :checker="/[\w(ก-ฮ)]+/" alertText="Name not null!"
                        @editText="$emit('editRow', $event, row, 'name')" />
                    <TextCellBase :text="row.email" :index="index" :checker="/.*@.*\..*|^$/"
                        alertText="Please enter a valid email" @editText="$emit('editRow', $event, row, 'email')" />
                    <TagsCell :rowId="row.id" :rowTags="row.tagMembers" :tableId="tableId" :tagsList="tagsList"
                        @addTag="$emit('addTagMem', $event, row.id)" @deleteTagMem="$emit('deleteTagMem', $event)" />
                    <DateCell :date="row.date" />
                    <td>
                        <button class="hover:text-red-700 text-red-500" @click="$emit('deleteRow', row.id)">
                            <CarbonTrashCan class="my-auto -mr-1 h-4 w-4" />
                        </button>
                    </td>
                </tr>
                <tr class="whitespace-nowrap px-6 py-4 text-sm text-gray-500"
                    @keydown.enter="newRow.name.length != 0 ? $emit('createRow', newRow) : alertInput()">
                    <td>
                        <input type="text" class="bg-gray-300" placeholder="Input Name" v-model="newRow.name" />
                    </td>
                    <td>
                        <input type="text" class="bg-gray-300" placeholder="Input Email" v-model="newRow.email" />
                    </td>
                    <td :colspan="3" />
                </tr>
            </tbody>
        </table>
    </div>
</template>
