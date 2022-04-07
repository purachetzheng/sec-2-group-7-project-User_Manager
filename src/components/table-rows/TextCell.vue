<script setup>
import { reactive, ref } from 'vue';
import CarbonEdit from '../icons/CarbonEdit.vue';
import CarbonCloseOutline from '../icons/CarbonCloseOutline.vue';
defineEmits(['editText'])
const props = defineProps({
    index: {
        type: Number,
        require: true,
    },
    text: {
        type: String,
        default: "undefined"
    },
    checker: {
        type: Object,
        default: /\w+/
    },
    alertText: {
        type: String,
        default: 'error'
    }
})
const newText = ref(props.text)
const hasEdit = reactive([])
const hasMouseEnter = reactive([])
const checking = (event) => {
    const checked = props.checker.test(event.target.value)
    checked ? hasEdit[props.index] = false : alert(props.alertText)
    return checked
}
const cancelEdit = (index) => {
    hasEdit[index] = 0
    newText.value = props.text
}
</script>
 
<template>
    <td class @mouseenter="hasMouseEnter[index] = true" @mouseleave="hasMouseEnter[index] = false">
        <div v-if="!hasEdit[index]">
            <span class="float-left">{{ newText }}</span>
            <button class="float-right" v-show="hasMouseEnter[index]">
                <CarbonEdit class="h-5 w-5" @click="hasEdit[index] = 1" />
            </button>
        </div>
        <div v-else>
            <input
                type="text"
                class="Name bg-gray-300 float-left"
                placeholder="Input Name"
                v-model="newText"
                @keyup.enter="checking($event) ? $emit('editText', $event) : ''"
            />
            <button class="float-right">
                <CarbonCloseOutline class="h-5 w-5" @click="cancelEdit(index)" />
            </button>
        </div>
    </td>
</template>