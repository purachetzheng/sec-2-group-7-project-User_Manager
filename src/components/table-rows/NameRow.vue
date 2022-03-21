<script setup>
import { ref } from 'vue';
import CarbonEdit from '../icons/CarbonEdit.vue';
import CarbonCloseOutline from '../icons/CarbonCloseOutline.vue';
defineEmits(['editName'])
const props = defineProps({
    index: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        default: "undefined"
    }
})
const hasEditName = ref([])
</script>
 
<template>
    <div class>
        <div v-if="!hasEditName[index]">
            <span class="float-left">{{ name }}</span>
            <button class="float-right">
                <CarbonEdit class="h-5 w-5" @click="hasEditName[index] = 1" />
            </button>
        </div>
        <div v-else>
            <input
                type="text"
                class="bg-gray-300 float-left"
                placeholder="Input Name"
                @keyup.enter="$emit('editName', $event)"
            />
            <button class="float-right">
                <CarbonCloseOutline class="h-5 w-5" @click="hasEditName[index] = 0" />
            </button>
        </div>
    </div>
</template>