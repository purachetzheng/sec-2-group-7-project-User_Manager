<script setup>
import { ref, computed, reactive, nextTick, onBeforeMount, onMounted } from 'vue'
defineEmits([])
const prop = defineProps({
  amountRows: {
    type: Number,
    default: 0,
    // require:true
  },
  amountTags: {
    type: Number,
    default: 0,
    // require:true
  },
  tableId: {
    type: String,
    require: true
  }
})
const color = ["bg-orange-400", "bg-lime-400"]
// console.log(tags);

// Get Tags
const tags = ref([])
const getTags = async () => {
  const res = await fetch('http://localhost:5000/tags?tableId=' + prop.tableId)
  if (res.status === 200) {
    tags.value = await res.json()
    console.log(tags.value)
  } else console.log('error, cannot get tags')
}
//Get Rows
const rows = ref([])
const getRows = async () => {
  const res = await fetch('http://localhost:5000/rows?tableId=' + prop.tableId)
  if (res.status === 200) {
    rows.value = await res.json()
    // console.log(tags.value)
  } else console.log('error, cannot get rows')
}
onBeforeMount(async () => {
  await getTags()
  await getRows()
})
// onMounted(() => {
//   console.log(tags.value);
//   console.log(rows.value);
// })



// const table = ref(prop.table.rows)
// console.log(table);
const amountTags = ref(computed(() => prop.amountTags))
const amountRows = ref(computed(() => prop.amountRows))

</script>
 
<template>
  <div class="bg-red-200 p-4 space-y-2">
    <p>Amount of Users : {{ amountRows }}</p>
    <p>Amount of Tags : {{ amountTags }}</p>
    <div class="flex flex-col space-y-2">
      <button :class="[color[1], 'text-xl italic']" v-for="(tag, index) in tags" :key="index">
        {{ tag.name }} : {{ tag.member.length }}
      </button>
    </div>
  </div>
</template>
 
<style>
</style>