<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount,toRefs,toRef, onBeforeUpdate } from 'vue'
const props = defineProps({
    tags: {
        type: Array,
        default: ["all",2]
    },
    rowId: {
        type: Number,
        require: true,
    },
    tableId: {
        type: String,
        require: true
    }
})

//Get
// const rows = ref([])
// const getRows = async () => {
//   const res = await fetch(`http://localhost:5000/tagMembers?rowId=${props.rowId}&_expand=tag`)
//   if (res.status === 200) {
//     rows.value = await res.json()
//     // console.log(rows.value)
//     // console.log(rows.value.length)
//   } else console.log('error, cannot get table')
// }
// onBeforeMount(async () => {
//   await getRows()
// })
// onBeforeUpdate(async () => {
//   await getRows()
// })

// Get
// const tagName = ref([])
// const getRows = async () => {
//   const res = await fetch(`http://localhost:5000/tags?tableId=${props.tableId}`)
//   if (res.status === 200) {
//     tagName.value = await res.json()
//     console.log(tagName.value)
//     // console.log(rows.value.length)
//   } else console.log('error, cannot get table')
// }
// onBeforeMount(async () => {
//   await getRows()
// })
</script>
 
<template>
    <td>
        <!-- <span v-for="(row, index) in rows" :key="index">[{{ row.tag.name }}]</span> -->
        <span v-for="(tag, index) in tags" :key="index">[{{ tag.name }}]</span>
    </td>
</template>