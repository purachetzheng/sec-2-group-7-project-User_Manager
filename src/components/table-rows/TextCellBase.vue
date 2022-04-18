<script setup>
import { reactive } from 'vue';
import CarbonEdit from '../icons/CarbonEdit.vue';
import CarbonCloseOutline from '../icons/CarbonCloseOutline.vue';
const emits = defineEmits(['editText']);
const props = defineProps({
    index: {
        type: Number,
        require: true,
    },
    text: {
        type: String,
        default: 'undefined',
    },
    checker: {
        type: Object,
        default: /\w+/,
    },
    alertText: {
        type: String,
        default: 'error',
    },
});
const hasEdit = reactive([]);
const hasMouseEnter = reactive([]);
const cancelEdit = (index) => {
    hasEdit[index] = 0;
};
const sendEdit = (event) => {
    const checked = props.checker.test(event.target.value);
    checked ? setTimeout(() => (hasEdit[props.index] = false), 150) : alert(props.alertText);
    if (checked) {
        emits('editText', event);
    }
};
</script>

<template>
    <td class @mouseenter="hasMouseEnter[index] = true" @mouseleave="hasMouseEnter[index] = false">
        <div v-if="!hasEdit[index]" class="flex items-center justify-between">
            <span>{{ text }}</span>
            <button v-show="hasMouseEnter[index]">
                <CarbonEdit class="h-5 w-5" @click="hasEdit[index] = 1" />
            </button>
        </div>
        <div v-else class="flex items-center justify-between">
            <input type="text" class="bg-gray-300" placeholder="Input Name" :value="text"
                @keyup.enter="sendEdit($event)" />
            <button>
                <CarbonCloseOutline class="h-5 w-5" @click="cancelEdit(index)" />
            </button>
        </div>
    </td>
</template>
